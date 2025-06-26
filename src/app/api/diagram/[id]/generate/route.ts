import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";

import { chatSchema } from "@/features/diagram/schema";
import {
  addAiMessage,
  addUserMessage,
} from "@/features/diagram/usecase/add-diagram-message";
import { getUser, isAuthenticated } from "@/utils/auth";
import { validateMermaidSyntax } from "@/utils/mermaid";
import { ChatMessage } from "@/features/diagram/types";

const SYSTEM_PROMPT = `You are an expert diagram generator. Convert user requests into valid Mermaid diagram syntax.

Rules:
1. Always respond with ONLY the Mermaid code, no explanations or markdown formatting
2. Use appropriate diagram types: flowchart, sequence, class, state, etc.
3. Keep diagrams clean and readable
4. Use meaningful node IDs and labels
5. For flowcharts, use TD (top-down) direction by default

Examples:

User: "Create a user login process"
Response:
flowchart TD
    A[User enters credentials] --> B{Valid credentials?}
    B -->|Yes| C[Grant access]
    B -->|No| D[Show error message]
    D --> A

User: "Database schema for blog"
Response:
erDiagram
    USER {
        int id PK
        string email
        string password
        datetime created_at
    }
    POST {
        int id PK
        string title
        text content
        int user_id FK
        datetime created_at
    }
    USER ||--o{ POST : creates`;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const isAuth = await isAuthenticated(request);
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message } = await request.json();
    const parsed = chatSchema.safeParse({ message: message });
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.message },
        { status: 400 }
      );
    }

    // TODO: validation of diagram id

    // add user message
    await addUserMessage(id, message);

    // generate mermaid code
    const { object } = await generateObject({
      model: openai("gpt-4-turbo"),
      system: SYSTEM_PROMPT,
      prompt: `Generate a Mermaid diagram for: ${message}`,
      temperature: 0.6,
      maxTokens: 1000,
      schema: z.object({
        mermaid: z.string().describe("The Mermaid code for the diagram"),
        message: z.string().describe("The message to the user"),
      }),
    });

    // add ai message
    const aiMessageId = await addAiMessage(
      id,
      object.message,
      object.mermaid,
      null,
      0
    );

    // TODO: how to ensure mermaid code is valid?
    const validation = await validateMermaidSyntax(object.mermaid.trim());
    if (!validation.valid) {
      console.error("Invalid Mermaid code:", validation.error);
    }

    return NextResponse.json({
      id: aiMessageId,
      role: "ai",
      message: object.message,
      mermaid: object.mermaid,
      excalidraw: undefined,
      timestamp: new Date(),
    } as ChatMessage);
  } catch (error) {
    console.error("Error generating diagram:", error);
    return NextResponse.json(
      { error: "Failed to generate diagram. Please try again." },
      { status: 500 }
    );
  }
}
