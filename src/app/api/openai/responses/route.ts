// src/app/api/openai/responses/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validierung der erforderlichen Parameter
    if (!body.model || !body.input) {
      return NextResponse.json(
        { error: "Missing required parameters: model and input" },
        { status: 400 }
      );
    }

    // Standard-Tools konfigurieren falls nicht angegeben
    const tools = body.tools || [];
    
    // Erstelle die Responses API Anfrage
    const response = await openai.responses.create({
      model: body.model,
      input: body.input,
      tools: tools,
      max_output_tokens: body.max_output_tokens || null,
      temperature: body.temperature || 1.0,
      top_p: body.top_p || 1.0,
      tool_choice: body.tool_choice || "auto",
      parallel_tool_calls: body.parallel_tool_calls !== false,
      store: body.store !== false,
      metadata: body.metadata || {},
    });

    return NextResponse.json(response);
    
  } catch (error: any) {
    console.error("Error in OpenAI Responses API:", error);
    
    // Spezifische Fehlerbehandlung für OpenAI API Fehler
    if (error.status) {
      return NextResponse.json(
        { 
          error: "OpenAI API Error",
          message: error.message,
          status: error.status
        },
        { status: error.status }
      );
    }
    
    return NextResponse.json(
      { 
        error: "Internal Server Error",
        message: error.message || "Unknown error occurred"
      },
      { status: 500 }
    );
  }
}