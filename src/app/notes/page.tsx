import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function NotesPage() {
  return (
    <div>
      <Button>Click Me</Button>
      <div>This is notes page</div>
      <UserButton afterSwitchSessionUrl="/" />
    </div>
  );
}
