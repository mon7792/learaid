import { getPaginatedDiagrams } from "@/features/diagram/model";
import { DiagramResponse } from "@/features/diagram/types";
import { Paginated } from "@/types";

export const listDiagrams = async (
  userId: string,
  cursor: string,
  limit: number = 10
): Promise<Paginated<DiagramResponse> | null> => {
  const { diagrams, nextCursor } = await getPaginatedDiagrams(
    userId,
    cursor,
    limit
  );

  return {
    items: diagrams,
    nextCursor,
  } as Paginated<DiagramResponse>;
};
