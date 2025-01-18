export const maxDuration = 20;
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function POST(req: NextRequest) {
  try {
    const { dob, tob, place, name, gender, address } = await req.json();
    if (!dob || !tob || !place) {
      return NextResponse.json(
        { error: "Please provide all the required fields" },
        { status: 400 }
      );
    }
    console.log(dob, tob, place, name, gender, address)
    const response = await fetch(
      "https://2e62-34-106-82-159.ngrok-free.app/get_planetary_data",
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dob, tob, place }),
      }
    );

    if (!response.ok) {
      throw new Error(
      `API responded with status ${response.status}: ${response.statusText}`
      );
    }
    
    const data = await response.json();

    console.log(data);

    const input_value = `{
      ${name}, ${dob}, ${tob}, ${data?.timezone}, ${gender}, ${address}
      "data":${JSON.stringify(data)}
    }`;
    console.log(input_value);

    const response2 = await fetch(
      "https://api.langflow.astra.datastax.com/lf/629526ed-a9a5-4287-adc8-4f105621aaa2/api/v1/run/4c827d85-ad37-4ffa-9a8a-9e101fcf3519?stream=false",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP1}`, // Replace with your token
        },
        body: JSON.stringify({
          input_value,
          output_type: "chat",
          input_type: "chat",
          tweaks: {
            "ChatOutput-CS2VM": {},
  "TextInput-Rtz7X": {},
  "GroqModel-cpiZO": {},
  "AstraDB-Sh6n8": {},
  "MessagetoData-kmpvm": {},
  "Google Generative AI Embeddings-P9DzO": {},
  "ChatInput-63T57": {},
  "JSONCleaner-s1YGU": {},
  "Prompt-LnzjY": {}


          },
        }),
      }
    );
    if (!response2.ok) {
      throw new Error(
        `API responded with status ${response.status}: ${response.statusText}`
      );
    }
    const data2 = await response2.json();

    return NextResponse.json({ data2 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" + error },
      { status: 500 }
    );
  }
}
