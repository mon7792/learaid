import { NextRequest, NextResponse } from "next/server";

import { getUser, isAuthenticated } from "@/utils/auth";
import { getUserBillingTokens } from "@/features/billing/model";
import { UserTokenResponse } from "@/features/auth/types";

export async function GET(request: NextRequest) {
  const isAuth = await isAuthenticated(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const totalTokens = await getUserBillingTokens(user.id);
  return NextResponse.json({
    tokens: totalTokens,
  } as UserTokenResponse);
}
