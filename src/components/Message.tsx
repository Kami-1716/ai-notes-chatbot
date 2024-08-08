import type { Message } from "ai";

const Message = ({
  message: { role, content },
}: {
  message: Pick<Message, "role" | "content">;
}) => {
  return (
    <div>
      {role}
      {content}
    </div>
  );
};

export default Message;
