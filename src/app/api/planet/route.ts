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
    const response = await axios.post(
      "https://2e62-34-106-82-159.ngrok-free.app/get_planetary_data",
      { dob, tob, place }
    );
    const data = response.data;

    console.log(data);

    const input_value = `{
      ${name} , ${dob} , ${tob} , ${address} , ${gender} ,
      "data": ${JSON.stringify(data)}
    }`;
    console.log(input_value);

    const response2 = await fetch(
      "https://api.langflow.astra.datastax.com/lf/629526ed-a9a5-4287-adc8-4f105621aaa2/api/v1/run/e368f11b-3377-4ede-9495-eca9d20ffe14?stream=false",
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
            "ChatInput-8O38n": {},
            "Prompt-X6mux": {},
            "ChatOutput-IOKzh": {},
            "Google Generative AI Embeddings-k7fn4": {},
            "GoogleGenerativeAIModel-CytJY": {},
            "Prompt-8NmIe": {},
            "AstraDB-rkWCw": {},
            "ParseData-mqwyy": {},
            "File-K7XBi": {},
            "SplitText-G3PcG": {},
            "NVIDIAEmbeddingsComponent-wW3gw": {},
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
