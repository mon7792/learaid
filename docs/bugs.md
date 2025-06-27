1. BUG-1: The issue when the LLM does not generate the proper response.
```
Error generating diagram: Error [AI_NoObjectGeneratedError]: No object generated: response did not match schema.
    at async POST (src/app/api/diagram/[id]/generate/route.ts:88:44)
  86 |
  87 |     // generate mermaid code
> 88 |     const { object, finishReason, usage } = await generateObject({
     |                                            ^
  89 |       model: openai("gpt-4-turbo"),
  90 |       system: SYSTEM_PROMPT,
  91 |       prompt: `Generate a Mermaid diagram for: ${message}`, {
  text: '{"mermaid":"flowchart TD\\n    Start[Start] --> Fetch[Fetch Instruction]\\n    Fetch --> Decode[Decode Instruction]\\n    Decode --> Execute[Execute Instruction]\\n    Execute --> Store[Store Result]\\n    Store --> End[End]"}',
  response: [Object],
  usage: [Object],
  finishReason: 'stop',
  [cause]: Error [AI_TypeValidationError]: Type validation failed: Value: {"mermaid":"flowchart TD\n    Start[Start] --> Fetch[Fetch Instruction]\n    Fetch --> Decode[Decode Instruction]\n    Decode --> Execute[Execute Instruction]\n    Execute --> Store[Store Result]\n    Store --> End[End]"}.
  Error message: [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": [
        "message"
      ],
      "message": "Required"
    }
  ]
      at async POST (src/app/api/diagram/[id]/generate/route.ts:88:44)
    86 |
    87 |     // generate mermaid code
  > 88 |     const { object, finishReason, usage } = await generateObject({
       |                                            ^
    89 |       model: openai("gpt-4-turbo"),
    90 |       system: SYSTEM_PROMPT,
    91 |       prompt: `Generate a Mermaid diagram for: ${message}`, {
    value: {
      mermaid: 'flowchart TD\n' +
        '    Start[Start] --> Fetch[Fetch Instruction]\n' +
        '    Fetch --> Decode[Decode Instruction]\n' +
        '    Decode --> Execute[Execute Instruction]\n' +
        '    Execute --> Store[Store Result]\n' +
        '    Store --> End[End]'
    },
    [cause]: Error [ZodError]: [
      {
        "code": "invalid_type",
        "expected": "string",
        "received": "undefined",
        "path": [
          "message"
        ],
        "message": "Required"
      }
    ]
        at async POST (src/app/api/diagram/[id]/generate/route.ts:88:44)
      86 |
      87 |     // generate mermaid code
    > 88 |     const { object, finishReason, usage } = await generateObject({
         |                                            ^
      89 |       model: openai("gpt-4-turbo"),
      90 |       system: SYSTEM_PROMPT,
      91 |       prompt: `Generate a Mermaid diagram for: ${message}`, {
      issues: [ [Object] ],
      addIssue: [Function (anonymous)],
      addIssues: [Function (anonymous)]
    }
  }
}

```