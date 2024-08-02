import { Button } from "@/components/ui/button";
import prisma from "@/lib/db/prisma";
import { UserButton } from "@clerk/nextjs";
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

  return <div>{JSON.stringify(notes)}</div>;
}
