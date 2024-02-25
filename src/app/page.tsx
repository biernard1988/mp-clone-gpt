"use client";
import { ReactElement, useEffect, useState } from "react";

import KeyInstructions from "./components/key-instructions";
import ChatInput from "./components/chat-input";
import Sidebar from "./components/sidebar";
import ChatMessages from "./components/chat-messages";
import axios from "@/utils/axios";

function Home(): ReactElement {
  const [openAiKey, setOpenAiKey] = useState<string>("");

  const placeholder = !!openAiKey
    ? "😁 Type “#Hello”"
    : "🔑 Enter your API key";

  const getOpenAiResponse = async () => {
    const response = await axios.post("/api/bot", {
      key: openAiKey,
      messages: [
        {
          role: "user",
          content: "How much is 5 + 5?",
        },
      ],
    });
    console.log(response);
  };

  useEffect(() => {
    if (!!openAiKey) getOpenAiResponse();
  }, [openAiKey]);

  return (
    <div className="flex">
      <Sidebar isVisible={!!openAiKey} />
      <main className="w-full h-screen flex flex-col justify-between">
        <h1 className="text-3xl pb-5 lg:text-[45px] font-bold text-gray text-center mt-10">
          CloneGPT
        </h1>

        {!!openAiKey ? (
          <ChatMessages messages={[]} isLoading={false} />
        ) : (
          <KeyInstructions />
        )}

        <ChatInput onSubmitMessage={setOpenAiKey} placeholder={placeholder} />
      </main>
    </div>
  );
}

export default Home;
