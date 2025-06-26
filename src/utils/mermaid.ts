import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
});

export const validateMermaidSyntax = async (
  code: string
): Promise<{
  valid: boolean;
  error?: string;
}> => {
  if (!code || code.trim() === "" || typeof code !== "string")
    return { valid: false };

  try {
    await mermaid.parse(code.trim());
    return { valid: true };
  } catch (error: unknown) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Invalid Mermaid syntax",
    };
  }
};