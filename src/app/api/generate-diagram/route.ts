import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const { text } = await generateText({
      model: openai('gpt-4-turbo'),
      system: SYSTEM_PROMPT,
      prompt: `Generate a Mermaid diagram for: ${prompt}`,
      temperature: 0.3,
      maxTokens: 1000,
    });

    return NextResponse.json({ 
      mermaidCode: text.trim(),
      success: true 
    });

  } catch (error) {
    console.error('Error generating diagram:', error);
    return NextResponse.json(
      { error: 'Failed to generate diagram. Please try again.' },
      { status: 500 }
    );
  }
}</parameter>