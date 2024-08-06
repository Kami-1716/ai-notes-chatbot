import prisma from "@/lib/db/prisma";
import { createNoteSchema } from "@/lib/validation/note";
import { auth } from "@clerk/nextjs/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    console.log(body);
    const parseNote = createNoteSchema.safeParse(body);
    if (!parseNote.success) {
      console.error(parseNote.error);
      return Response.json({ message: "Invalid note" }, { status: 400 });
    }

    const { title, content } = parseNote.data;

    const { userId } = auth();

    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    });

    return Response.json(note, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
