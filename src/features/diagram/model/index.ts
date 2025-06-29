import { eq, and, desc, lt, sql } from "drizzle-orm";

import { db } from "@/config/db";
import { diagram, diagramMessages } from "@/schema/diagram";
import { Transaction } from "@/types/db";
import { updateUserBillingTokenTx } from "@/features/auth/model";

const errDiagramCreation = Error("err: db: failed to create new diagram entry");
const errMessageCreation = Error("err: db: failed to create new message entry");
const errDiagramNotFound = Error("err: db: diagram not found");
const errDiagramUpdate = Error("err: db: failed to update diagram tokens");

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
    diagrams:
      result.map((diagram) => ({
        id: diagram.id,

        // TODO: UPDATE THE DRIZZLE SCHEMA TO HAVE A VALID DEFAULT VALUE FOR TITLE
        title: diagram.title || "",
      })) || [],
    nextCursor,
  };
};

// addMessagesToDiagram adds multiple messages to a diagram
export const addMessagesToDiagramDB = async (
  userId: string,
  diagramId: string,
  tokenCost: number,
  messages: Array<typeof diagramMessages.$inferInsert>
): Promise<void> => {
  await db.transaction(async (tx) => {
    try {
      await addMessagesToDiagramTx(tx, messages);
      await updateDiagramTokenTx(tx, diagramId, tokenCost);
      await updateUserBillingTokenTx(tx, userId, tokenCost);
    } catch (error: unknown) {
      // better 
      console.error(error);
      tx.rollback();
    }
  });
};


export const addMessagesToDiagramTx = async (
  tx: Transaction,
  messages: Array<typeof diagramMessages.$inferInsert>
): Promise<void> => {
  const result = await tx.insert(diagramMessages).values(messages);
  if (!result.rowCount || result.rowCount !== messages.length) {
    throw errMessageCreation;
  }
};

export const updateDiagramTokenTx = async (
  tx: Transaction,
  diagramId: string,
  tokenCost: number
): Promise<void> => {
  // First, lock the row with SELECT FOR UPDATE to prevent race conditions
  const lockedDiagram = await tx
    .select({
      id: diagram.id,
      tokensUsed: diagram.tokensUsed,
    })
    .from(diagram)
    .where(eq(diagram.id, diagramId))
    .for("update")
    .limit(1);

  if (lockedDiagram.length === 0) {
    throw errDiagramNotFound;
  }

  // Update the tokens with the new value
  const result = await tx
    .update(diagram)
    .set({
      tokensUsed: sql`${diagram.tokensUsed} + ${tokenCost}`,
    })
    .where(eq(diagram.id, diagramId));

  if (!result.rowCount || result.rowCount !== 1) {
    throw errDiagramUpdate;
  }
};

export const getPaginatedMessages = async (
  userId: string,
  diagramId: string,
  cursor?: string,
  limit: number = 10
): Promise<{messages: Array<{
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
    // Check if user has access to the diagram
    const userDiagram = await tx
      .select({
        id: diagram.id,
      })
      .from(diagram)
      .where(and(
        eq(diagram.id, diagramId),
        eq(diagram.userId, userId)
      ))
      .limit(1);

    if (userDiagram.length === 0) {
      throw errDiagramNotFound;
    }

    // Build where conditions for messages
    const whereConditions = [
      eq(diagramMessages.diagramId, diagramId)
    ];

    // Apply cursor if provided - for reverse pagination, we want messages older than the cursor
    if (cursor) {
      whereConditions.push(lt(diagramMessages.createdAt, new Date(cursor)));
    }

    // Get paginated messages - order by oldest first for reverse pagination
    const messages = await tx
      .select({
        id: diagramMessages.id,
        role: diagramMessages.role,
        message: diagramMessages.message,
        mermaid: diagramMessages.mermaid,
        excalidraw: diagramMessages.excalidraw,
        tokenCost: diagramMessages.tokenCost,
        createdAt: diagramMessages.createdAt
      })
      .from(diagramMessages)
      .where(and(...whereConditions))
      .orderBy(desc(diagramMessages.createdAt)) // Keep desc for now, we'll handle the logic in the component
      .limit(limit + 1);

    let nextCursor: string | undefined;
    if (messages.length > limit) {
      messages.pop();
      // For reverse pagination, the next cursor should be the oldest message's timestamp
      nextCursor = messages[messages.length - 1]?.createdAt.toISOString();
    }

    return {
      messages,
      nextCursor,
    };
  });
};
