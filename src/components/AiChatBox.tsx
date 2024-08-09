"use client";

import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { Loader2, Trash, XCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Message from "./Message";
import { useEffect, useRef } from "react";

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

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

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
        <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
          {messages?.map((message) => (
            <Message message={message} key={message.id} />
          ))}
          {error && (
            <Message
              message={{
                role: "system",
                content: "Something went wrong. Please try again.",
              }}
              key="error"
            />
          )}
          {isLoading && lastMessageIsUser && (
            <Message
              message={{
                role: "assistant",
                content: "Thinking...",
              }}
            />
          )}
        </div>
        <form className="m-3 flex space-x-2" onSubmit={handleSubmit}>
          <Button
            title="Clear Chat"
            onClick={() => setMessages([])}
            className="shrink-0"
            variant={"outline"}
            size={"icon"}
            type="button"
          >
            <Trash />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask Something..."
            ref={inputRef}
          />
          <Button>
            {isLoading ? <Loader2 className="animate-spin" /> : "Send"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AiChatBox;
