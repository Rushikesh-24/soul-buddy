'use client'
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ChatBot = () => {
  interface Message {
    text: string;
    sender: 'user' | 'ai';
  }
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchData = async (userInput: string) => {
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: userInput, name: localStorage.getItem('astrouser') })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.outputs[0].outputs[0].results.message.text;
    } catch (error) {
      console.error('Error in fetchData:', error);
      return "I apologize, but I'm having trouble processing the response. Please try again later.";
    }
  };

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage: Message = { text: input, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);
      setInput('');

      const response = await fetchData(input);
      
      const aiMessage: Message = { 
        text: response,
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }
  };

  const scrollToTop = () => {
    chatContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    if (messages.length > 0) {
      const newMessage = chatContainerRef.current?.lastElementChild;
      if (newMessage) {
        gsap.fromTo(newMessage,
          { 
            opacity: 0, 
            y: 20 
          },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5,
            ease: "power2.out"
          }
        );
      }
      scrollToBottom();
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4 bg-gray-50 ">
      <div className="text-2xl font-bold text-center mb-4 text-purple-600 flex justify-between items-center">
        <span>AstroChat</span>
        <button 
          onClick={scrollToTop}
          className="text-sm px-3 py-1 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
        >
          Scroll to Top
        </button>
      </div>
      
      <div 
      onWheel={(e) => e.stopPropagation()} 
        className="flex-1 overflow-y-scroll mb-4 p-4 bg-white rounded-lg shadow-md scroll-smooth h-[500px]"
        ref={chatContainerRef}
        style={{ overflowY: 'scroll' }}
      >
        <div className="flex flex-col min-h-full">
          {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 ${
            message.sender === 'user' 
          ? 'ml-auto bg-purple-500 text-white' 
          : 'mr-auto bg-gray-200 text-gray-800'
          } p-3 rounded-lg max-w-[80%] font-mono`}
        >
          {message.text}
        </div>
          ))}
          {isLoading && (
        <div className="mr-auto bg-gray-200 text-gray-800 p-3 rounded-lg">
          Thinking...
        </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about your career, relationships, or daily horoscope..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          className={`px-6 py-3 bg-purple-500 text-white rounded-lg transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-600'
          }`}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;