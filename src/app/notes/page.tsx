import NoteLayout from "@/components/NoteLayout";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function NotesPage() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const notes = await prisma.note.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteLayout key={note.id} note={note} />
      ))}
      {notes.length === 0 && (
        <div className="text-center col-span-full">
          {"Create a new note by clicking the button 'Add Note'"}
        </div>
      )}
    </div>
  );
}
