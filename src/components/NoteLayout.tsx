import { Note as NoteModel } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";

interface Props {
  note: NoteModel;
}

const NoteLayout = ({ note }: Props) => {
  const wasUpated = note.updatedAt > note.createdAt;

  const createdUpdatedAtTime = wasUpated ? note.updatedAt : note.createdAt;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
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
    </>
  );
};

export default NoteLayout;
