// Importando o módulo "client" do pacote "use".
"use client";
// Importando elementos React necessários do pacote "react".
import { ReactElement, useEffect, useState } from "react";

// Importando componentes personalizados.
import KeyInstructions from "./components/key-instructions";
import ChatInput from "./components/chat-input";
import Sidebar from "./components/sidebar";
import ChatMessages from "./components/chat-messages";

// Importando hook personalizado "useChat" de "@/hooks/use-chat".
import useChat from "@/hooks/use-chat";

// Definindo componente funcional "Home".
function Home(): ReactElement {
  // Definindo estado local para armazenar a chave da API.
  const [openAiKey, setOpenAiKey] = useState<string>("");

  // Usando hook personalizado "useChat" e obtendo seus estados e funções.
  const {
    chats,
    isLoading,
    selectedChat,
    addUserMessage,
    selectChat,
    deleteChat,
  } = useChat(openAiKey);

  // Definindo placeholder baseado na presença da chave da API.
  const placeholder = !!openAiKey
    ? "😁 Type “#Hello”"
    : "🔑 Enter your API key";

  // Função para lidar com envio de mensagem.
  const handleSubmitMessage = (message: string) => {
    addUserMessage(selectedChat, message);
  };

  // Determinando a função de envio com base na presença da chave da API.
  const handleChatSubmit = !!openAiKey ? handleSubmitMessage : setOpenAiKey;

  // Retornando a estrutura do componente.
  return (
    <div className="flex">
      {/* Componente da barra lateral */}
      <Sidebar
        isVisible={!!openAiKey}
        selectedChat={selectedChat}
        selectChat={selectChat}
        deleteChat={deleteChat}
        chats={chats}
      />
      {/* Componente principal */}
      <main className="w-full h-screen flex flex-col justify-between">
        {/* Título da aplicação */}
        <h1 className="text-3xl pb-5 lg:text-[45px] font-bold text-gray text-center mt-10">
          CloneGPT
        </h1>

        {/* Renderização das mensagens de chat ou instruções para inserir chave da API */}
        {!!openAiKey ? (
          <ChatMessages
            messages={chats[selectedChat].messages}
            isLoading={isLoading}
          />
        ) : (
          <KeyInstructions />
        )}

        {/* Componente de entrada de chat */}
        <ChatInput
          onSubmitMessage={handleChatSubmit}
          placeholder={placeholder}
        />
      </main>
    </div>
  );
}

// Exportando o componente "Home" como padrão.
export default Home;
