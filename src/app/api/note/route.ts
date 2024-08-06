import prisma from "@/lib/db/prisma";
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from "@/lib/validation/note";
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

// to update a note

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    console.log(body);
    const parseNote = updateNoteSchema.safeParse(body);
    if (!parseNote.success) {
      console.error(parseNote.error);
      return Response.json({ message: "Invalid note" }, { status: 400 });
    }

    const { id, title, content } = parseNote.data;

    const note = await prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (!note) {
      return Response.json({ message: "Note not found" }, { status: 404 });
    }

    const { userId } = auth();

    if (!userId || note.userId !== userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const updatedNote = await prisma.note.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
      },
    });

    return Response.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};

// to delete a note
export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const parseNote = deleteNoteSchema.safeParse(body);
    if (!parseNote.success) {
      console.error(parseNote.error);
      return Response.json({ message: "Invalid note" }, { status: 400 });
    }

    const { id } = parseNote.data;

    const { userId } = auth();

    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    await prisma.note.delete({
      where: {
        id,
      },
    });

    return Response.json({ message: "Note deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
