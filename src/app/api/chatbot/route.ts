import { NextRequest, NextResponse } from "next/server";
export const maxDuration = 20;
export async function POST(req: NextRequest) {
    try {
        const {text,name}  = await req.json();
        const input_value = `${name} , {question}: ${text}`;
        const response = await fetch(
            "https://api.langflow.astra.datastax.com/lf/629526ed-a9a5-4287-adc8-4f105621aaa2/api/v1/run/1fa9cb17-a8ba-4cf3-bb89-003b604a7630?stream=false",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP2}`, // Replace with your token
              },
            
              body: JSON.stringify({
                input_value,
                output_type: "chat",
                input_type: "chat",
                tweaks: {
                    "ChatOutput-YVmFs": {},
                    "Prompt-j5QM5": {},
                    "ChatInput-JqNF9": {},
                    "TextInput-BXH2Q": {},
                    "GroqModel-KNww5": {},
                    "AstraDB-iR8XE": {},
                    "Google Generative AI Embeddings-mY6ly": {},
                    "ParseData-DOUCn": {}
                  
                },
              }),
            }
          );
          if (!response.ok) {
            throw new Error(
              `API responded with status ${response.status}: ${response.statusText}`
            );
          }
          const data = await response.json();
          return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}