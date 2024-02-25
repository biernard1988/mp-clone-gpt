import cn from "@/utils/cn";
import Image from "next/image";
import Markdown from "react-markdown";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatMessageProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatMessages({
  messages,
  isLoading,
}: ChatMessageProps) {
  return (
    <div className="flex flex-col h-full w-full justify-start items-center overflow-auto">
      {messages?.map((message, index) => (
        <MessageBlock key={index} message={message} />
      ))}
      {isLoading && (
        <MessageBlock message={{ role: "assistant", content: "" }} isLoading />
      )}
    </div>
  );
}

const MessageBlock = ({
  message,
  isLoading = false,
}: {
  message: Message;
  isLoading?: boolean;
}) => {
  return (
    <div
      className={cn(
        "text-white bg-background-chat px-4 py-8 w-full flex justify-center",
        message.role === "user" && "bg-background-light"
      )}
    >
      <div className="w-full max-w-[833px] flex">
        <Image
          src={`/images/${message.role}-icon.svg`}
          width={36}
          height={36}
          alt={`Avatar picture of ${message.role} `}
          className="mr-4 self-start"
        />
        {isLoading ? (
          <Image
            src="/images/loading.svg"
            width={36}
            height={36}
            alt="Loading animation"
            className="mr-4"
          />
        ) : (
          <Markdown>{message.content}</Markdown>
        )}
      </div>
    </div>
  );
};
