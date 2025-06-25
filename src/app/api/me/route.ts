import { NextRequest, NextResponse } from "next/server";

import { getUser, isAuthenticated } from "@/utils/auth";
import { getUserBilling } from "@/features/auth/usecase/get-user-billing";
import { UserResponse } from "@/features/auth/types";

export async function GET(request: NextRequest) {
  const isAuth = await isAuthenticated(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const billing = await getUserBilling(user.id);
  return NextResponse.json({
    email: user.email,
    name: user.name,
    image: user.image,
    token: billing?.token,
    plan: billing?.plan,
  } as UserResponse);
}
