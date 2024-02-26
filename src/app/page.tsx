"use client";
import { ReactElement, useEffect, useState } from "react";

import KeyInstructions from "./components/key-instructions";
import ChatInput from "./components/chat-input";
import Sidebar from "./components/sidebar";
import ChatMessages from "./components/chat-messages";
import useChat from "@/hooks/use-chat";

function Home(): ReactElement {
  const [openAiKey, setOpenAiKey] = useState<string>("");
  const {
    chats,
    isLoading,
    selectedChat,
    addUserMessage,
    selectChat,
    deleteChat,
  } = useChat(openAiKey);

  const placeholder = !!openAiKey
    ? "😁 Type “#Hello”"
    : "🔑 Enter your API key";

  const handleSubmitMessage = (message: string) => {
    addUserMessage(selectedChat, message);
  };

  const handleChatSubmit = !!openAiKey ? handleSubmitMessage : setOpenAiKey;

  return (
    <div className="flex">
      <Sidebar
        isVisible={!!openAiKey}
        selectedChat={selectedChat}
        selectChat={selectChat}
        deleteChat={deleteChat}
        chats={chats}
      />
      <main className="w-full h-screen flex flex-col justify-between">
        <h1 className="text-3xl pb-5 lg:text-[45px] font-bold text-gray text-center mt-10">
          CloneGPT
        </h1>

        {!!openAiKey ? (
          <ChatMessages
            messages={chats[selectedChat].messages}
            isLoading={isLoading}
          />
        ) : (
          <KeyInstructions />
        )}

        <ChatInput
          onSubmitMessage={handleChatSubmit}
          placeholder={placeholder}
        />
      </main>
    </div>
  );
}

export default Home;
