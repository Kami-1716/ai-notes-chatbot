import { Note } from "@prisma/client";

interface Props {
  note: Note;
}

const NoteLayout = ({ note }: Props) => {
  return <div>NoteLayout</div>;
};

export default NoteLayout;
