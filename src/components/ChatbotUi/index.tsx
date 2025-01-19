'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Send, X,Bot } from 'lucide-react';
import gsap from 'gsap';

const ChatbotUI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const chatWindowRef = useRef(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Animation for opening/closing chat window
  useEffect(() => {
    if (chatWindowRef.current) {
      if (isOpen) {
        gsap.to(chatWindowRef.current, {
          duration: 0.5,
          y: 0,
          opacity: 1,
          ease: "power3.out"
        });
      } else {
        gsap.to(chatWindowRef.current, {
          duration: 0.5,
          y: 20,
          opacity: 0,
          ease: "power3.in"
        });
      }
    }
  }, [isOpen]);

  // Parse and format the Langflow response
interface LangflowResponse {
    outputs: {
        outputs: {
            results: {
                message: {
                    text: string;
                };
            };
        }[];
    }[];
}

interface ParsedMessage {
    type: 'bot';
    content: any;
    timestamp: string;
}

const parseLangflowResponse = (data: LangflowResponse): ParsedMessage => {
    try {
        // Extract the actual message content
        const messageText = data.outputs[0].outputs[0].results.message.text;
        // Parse the JSON content from the message
        const jsonContent = JSON.parse(messageText.replace(/```json\n|\n```/g, ''));
        return {
            type: 'bot',
            content: jsonContent,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error parsing Langflow response:', error);
        return {
            type: 'bot',
            content: { error: 'Failed to parse response' },
            timestamp: new Date().toISOString()
        };
    }
};

  // Render message content based on type and structure
  interface Message {
    type: 'user' | 'bot';
    content: any;
    timestamp: string;
  }
  interface InsightItem {
    description: string;
    "do's"?: string[];
    "dont's"?: string[];
    suggested_practices?: string[];
  }
  interface Insights {
    [key: string]: InsightItem;
  }
  interface AstroContent {
    name: string;
    insights: Insights;
    [key: string]: any;  // For other properties we might not need to render
  }
  
  interface MessageContentProps {
    content: AstroContent;
  }
  const MessageContent: React.FC<MessageContentProps> = ({ content }) => {
    return (
      <div className="space-y-2 text-sm">
        <div className="font-semibold">AI's Reading</div>
        {content.insights && (
          <div className="space-y-4">
            {Object.entries(content.insights).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="font-medium capitalize">
                  {key.replace(/_/g, ' ')}
                </div>
                <div className="text-xs">{value.description}</div>
                
                {value["do's"] && value["do's"].length > 0 && (
                  <div className="text-green-600">
                    <div className="font-medium">Do's:</div>
                    <ul className="list-disc pl-4">
                      {value["do's"].map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {value["dont's"] && value["dont's"].length > 0 && (
                  <div className="text-red-600">
                    <div className="font-medium">Don'ts:</div>
                    <ul className="list-disc pl-4">
                      {value["dont's"].map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
  
                {value.suggested_practices && value.suggested_practices.length > 0 && (
                  <div className="text-blue-600">
                    <div className="font-medium">Suggested Practices:</div>
                    <ul className="list-disc pl-4">
                      {value.suggested_practices.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
        type: 'user',
        content: input,
        timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const response: Response = await fetch('/api/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: input,
               name:"rushikesh"
            }),
        });

        const data: LangflowResponse = await response.json();
        const parsedMessage: ParsedMessage = parseLangflowResponse(data);
        setMessages(prev => [...prev, parsedMessage]);
    } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, {
            type: 'bot',
            content: { error: 'Sorry, I encountered an error. Please try again.' },
            timestamp: new Date().toISOString()
        }]);
    } finally {
        setIsLoading(false);
    }
};

return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse items-end">
      {/* Chat window */}
      <div
        ref={chatWindowRef}
        className="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col opacity-0 translate-y-20 mb-2"
        style={{
          transformOrigin: 'bottom right',
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold">Astrology Assistant</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <MessageContent content={message.content} />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your astrological insights..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>

      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg"
      >
        {/* {isOpen ? <Minimize2 size={24} /> : <Maximize2 size={24} />} */}
        <Bot size={24} />
      </button>
    </div>
  );
};

export default ChatbotUI;