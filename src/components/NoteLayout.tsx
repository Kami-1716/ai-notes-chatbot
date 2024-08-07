"use client";

import { Note as NoteModel } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { useState } from "react";
import AddUpdateNoteDialog from "./AddUpdateNoteDialog";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";

interface Props {
  note: NoteModel;
}

const NoteLayout = ({ note }: Props) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const wasUpated = note.updatedAt > note.createdAt;

  const createdUpdatedAtTime = wasUpated ? note.updatedAt : note.createdAt;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{note.title}</CardTitle>
            <Button size={"sm"} onClick={() => setShowEditDialog(true)}>
              <Pencil size={16} className="mr-1" />
            </Button>
          </div>
          <CardDescription>
            {createdUpdatedAtTime.toDateString()}
            {wasUpated && " (Updated)"}
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{note.content}</p>
        </CardContent>
      </Card>
      <AddUpdateNoteDialog
        noteToUpdate={note}
        open={showEditDialog}
        setOpen={setShowEditDialog}
        submitText="Update Note"
        headerTitle="Update Note"
      />
    </>
  );
};

export default NoteLayout;
