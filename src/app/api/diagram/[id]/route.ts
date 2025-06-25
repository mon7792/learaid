import { NextRequest, NextResponse } from "next/server";

import { getUser, isAuthenticated } from "@/utils/auth";
import { listMessages } from "@/features/diagram/usecase/list-messages";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const cursor = searchParams.get("cursor") || "";

    const isAuth = await isAuthenticated(request);
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const diagram = await listMessages(user.id, id, cursor, 10);

    return NextResponse.json(diagram);
  } catch (error) {
    console.error("Error generating diagram:", error);
    return NextResponse.json(
      { error: "Failed to generate diagram. Please try again." },
      { status: 500 }
    );
  }
}
