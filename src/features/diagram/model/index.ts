import { db } from "@/config/db";
import { diagram, diagramMessages } from "@/schema/diagram";
import { eq, and, desc, lt } from "drizzle-orm";

const errDiagramCreation = Error("err: db: failed to create new diagram entry");
const errMessageCreation = Error("err: db: failed to create new message entry");
const errDiagramNotFound = Error("err: db: diagram not found");

export const createNewDiagram = async (
  id: string,
  title: string,
  userId: string
): Promise<void> => {
  const result = await db.insert(diagram).values({
    id,
    title,
    userId,
  });

  if (!result.rowCount || result.rowCount !== 1) {
    throw errDiagramCreation;
  }
};

export const addMessageToDiagram = async (
  id: string,
  diagramId: string,
  message: string,
  role: "user" | "ai",
  mermaid: string | null,
  excalidraw: string | null,
  tokenCost: number
): Promise<void> => {
  const result = await db.insert(diagramMessages).values({
    id,
    diagramId,
    message,
    role,
    mermaid,
    excalidraw,
    tokenCost,
  });

  if (!result.rowCount || result.rowCount !== 1) {
    throw errMessageCreation;
  }
};

export const getDiagramWithMessages = async (
  userId: string,
  diagramId: string,
  cursor?: string,
  limit: number = 10
): Promise<{
  diagram: { id: string; title: string | null } | null;
  messages: Array<{
    id: string;
    role: "user" | "ai";
    message: unknown;
    mermaid: string | null;
    excalidraw: unknown;
    tokenCost: number;
    createdAt: Date;
  }>;
  nextCursor?: string;
}> => {
  return await db.transaction(async (tx) => {
    // Get diagram details
    const diagramResult = await tx
      .select({
        id: diagram.id,
        title: diagram.title,
      })
      .from(diagram)
      .where(and(eq(diagram.id, diagramId), eq(diagram.userId, userId)))
      .limit(1);

    if (diagramResult.length === 0) {
      throw errDiagramNotFound;
    }

    // Build where conditions for messages
    const whereConditions = [eq(diagramMessages.diagramId, diagramId)];

    // Apply cursor if provided
    if (cursor) {
      whereConditions.push(lt(diagramMessages.createdAt, new Date(cursor)));
    }

    // Get paginated messages
    const messagesResult = await tx
      .select({
        id: diagramMessages.id,
        role: diagramMessages.role,
        message: diagramMessages.message,
        mermaid: diagramMessages.mermaid,
        excalidraw: diagramMessages.excalidraw,
        tokenCost: diagramMessages.tokenCost,
        createdAt: diagramMessages.createdAt,
      })
      .from(diagramMessages)
      .where(and(...whereConditions))
      .orderBy(desc(diagramMessages.createdAt))
      .limit(limit + 1); // Fetch one extra to determine if there's a next page

    // Determine if there's a next page
    let nextCursor: string | undefined;
    if (messagesResult.length > limit) {
      // Remove the extra item we fetched
      messagesResult.pop();
      // Set the next cursor to the last message's createdAt
      nextCursor =
        messagesResult[messagesResult.length - 1]?.createdAt.toISOString();
    }

    return {
      diagram: diagramResult[0],
      messages: messagesResult,
      nextCursor,
    };
  });
};

// getPaginatedDiagrams returns a paginated list of diagrams
export const getPaginatedDiagrams = async (
  userId: string,
  cursor?: string,
  limit: number = 10
): Promise<{
  diagrams: Array<{ id: string; title: string }>;
  nextCursor?: string;
}> => {
  // Build where conditions
  const whereConditions = [eq(diagram.userId, userId)];

  // Apply cursor if provided
  if (cursor) {
    whereConditions.push(lt(diagram.createdAt, new Date(cursor)));
  }

  const result = await db
    .select({
      id: diagram.id,
      title: diagram.title,
      createdAt: diagram.createdAt,
    })
    .from(diagram)
    .where(and(...whereConditions))
    .orderBy(desc(diagram.createdAt))
    .limit(limit + 1);

  let nextCursor: string | undefined;
  if (result.length > limit) {
    result.pop();
    nextCursor = result[result.length - 1]?.createdAt.toISOString();
  }

  return {
    diagrams: result.map((diagram) => ({
      id: diagram.id,

      // TODO: UPDATE THE DRIZZLE SCHEMA TO HAVE A VALID DEFAULT VALUE FOR TITLE
      title: diagram.title || "",
    })) || [],
    nextCursor,
  };
};
