import { NextRequest, NextResponse } from "next/server";
import { countTokens } from "gpt-tokenizer";

import { getUser, isAuthenticated } from "@/utils/auth";
import { UserTokenResponse } from "@/features/auth/types";
import { chatSchema } from "@/features/diagram/schema";

export async function POST(request: NextRequest) {
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

  return NextResponse.json({
    tokens: countTokens(message.trim()),
  } as UserTokenResponse);
}
