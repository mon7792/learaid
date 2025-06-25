import { NextRequest, NextResponse } from 'next/server';

import { getUser, isAuthenticated } from '@/utils/auth';
import { chatSchema } from '@/features/diagram/schema';
import { createNewDiagram } from '@/features/diagram/usecase/create-new-diagram';

export async function POST(request: NextRequest) {
  try {
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

    // create a new diagram
    const newDiagramId = await createNewDiagram(user.id);

    return NextResponse.json({ id: newDiagramId });

  } catch (error) {
    console.error('Error generating diagram:', error);
    return NextResponse.json(
      { error: 'Failed to generate diagram. Please try again.' },
      { status: 500 }
    );
  }
}