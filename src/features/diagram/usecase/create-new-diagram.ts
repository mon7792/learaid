import { ulid } from "ulidx";

import { generateRandomName } from "@/utils/random";

import { createNewDiagram as createNewDiagramModel } from "@/features/diagram/model";


export const createNewDiagram = async (userId: string): Promise<string> => {
  const id = ulid();
  await createNewDiagramModel(id, generateRandomName(), userId);
  return id;
};
