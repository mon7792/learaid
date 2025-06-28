import { NextRequest, NextResponse } from "next/server";

// rethink the api messages

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // TODO: check if the user is authenticated
  // TODO: check if the user has access to the diagram
  // TODO: get messages from the database

  // TODO: get messages from the database
  return NextResponse.json({ message: `Hello, world! ${id}` });
}