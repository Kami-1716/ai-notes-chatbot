import { createNoteSchema, CreateNoteSchema } from "@/lib/validation/note";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import LoadingButton from "./LoadingButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteToUpdate?: Note;
  submitText?: string;
  headerTitle?: string;
}

const AddUpdateNoteDialog = ({
  open,
  setOpen,
  noteToUpdate,
  submitText,
  headerTitle,
}: Props) => {
  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: noteToUpdate?.title || "",
      content: noteToUpdate?.content || "",
    },
  });

  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: CreateNoteSchema) => {
    try {
      if (noteToUpdate) {
        const noteToUpdated = { ...data, id: noteToUpdate.id };
        const response = await fetch(`/api/note`, {
          method: "PUT",
          body: JSON.stringify(noteToUpdated),
        });
        if (!response.ok) {
          throw new Error("Failed to update note.");
        }
      } else {
        const response = await fetch("/api/note", {
          method: "POST",
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Failed to add note.");
        }
      }

      form.reset();
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add note. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!noteToUpdate) {
      toast.error("Note not found.");
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/note`, {
        method: "DELETE",
        body: JSON.stringify({ id: noteToUpdate?.id }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete note.");
      }

      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{headerTitle || "Add New Note"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Create New Note..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add Content to Your Note..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-1">
              {noteToUpdate && (
                <Button
                  type="button"
                  variant={"destructive"}
                  className="w-full"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin text-white" />{" "}
                      Deleting Note
                    </>
                  ) : (
                    "Delete Note"
                  )}
                </Button>
              )}
              {form.formState.isSubmitting ? (
                <LoadingButton
                  text={submitText ? "Updating Note" : "Adding Note"}
                  disabled={true}
                />
              ) : (
                <Button type="submit" className="w-full">
                  {submitText || "Add Note"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUpdateNoteDialog;
