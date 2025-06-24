"use client";

import { z } from "zod";

export const chatSchema = z.object({
  message: z
    .string()
    .min(1, { message: "kindly enter a message" })
    .max(5000, { message: "message must be less than 5000 characters" }),
});
