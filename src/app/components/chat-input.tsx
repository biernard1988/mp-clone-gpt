// Importando o módulo "client" do pacote "use".
"use client";
// Importando o componente de imagem do pacote "next/image".
import Image from "next/image";
// Importando React e useState do pacote "react".
import React, { useState } from "react";

// Definindo interface para as props do componente ChatInput.
interface ChatInputProps {
  placeholder: string;
  onSubmitMessage: (key: string) => void;
}

// Definindo o componente ChatInput.
export default function ChatInput({
  placeholder,
  onSubmitMessage,
}: ChatInputProps) {
  // Definindo estado local para o valor do input.
  const [inputValue, setInputValue] = useState("");

  // Função para lidar com a mudança no valor do input.
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Função para lidar com a tecla pressionada no input.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmitMessage(inputValue);
      setInputValue("");
    }
  };

  // Função para lidar com o clique no botão de envio.
  const handleClick = () => {
    onSubmitMessage(inputValue);
    setInputValue("");
  };

  // Retornando a estrutura do componente.
  return (
    <div className="p-4 lg:p-10 w-full flex justify-center">
      <div className="relative max-w-[833px] w-full mb-4 lg:mb-10">
        <input
          className="flex h-10 w-full rounded-md border border-b bg-background-light text-sm ring-offset-background-chat placeholder:text-gray focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 p-6 text-gray"
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {/* Botão de envio de mensagem */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer flex items-center">
          <button onClick={handleClick}>
            {/* Ícone de envio */}
            <Image
              src="/images/send-icon.svg"
              width={20}
              height={20}
              alt="Send icon to sent messages"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
