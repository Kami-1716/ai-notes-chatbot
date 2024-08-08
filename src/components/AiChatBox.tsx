"use client";

import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { Loader2, XCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Message from "./Message";

type Props = {
  open: boolean;
  onClose: () => void;
};

const AiChatBox = ({ open, onClose }: Props) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    error,
  } = useChat();

  return (
    <div
      className={cn(
        "bottom-0 right-0 z-20 w-full max-w-[500px] p-1 xl:right-36",
        open ? "fixed" : "hidden"
      )}
    >
      <button onClick={onClose} className="mb-1 ms-auto block">
        <XCircle className="w-6 h-6" />
      </button>

      <div className="flex h-[500px] flex-col rounded border bg-background shadow-xl">
        <div className="h-full">
          {messages?.map((message) => (
            <Message message={message} />
          ))}
        </div>
        <form className="m-3 flex gap-1" onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask Something..."
          />
          <Button>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Sending...
              </>
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AiChatBox;
