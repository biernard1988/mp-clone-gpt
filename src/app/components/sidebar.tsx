// Importando o módulo "client".
"use client";
// Importando o componente de imagem do pacote "next/image".
import Image from "next/image";
// Importando o hook useState do pacote "react".
import { useState } from "react";
// Importando o utilitário "cn".
import cn from "clsx";
// Importando o tipo Chats do hook use-chat.
import { Chats } from "@/hooks/use-chat";

// Definindo as propriedades do componente Sidebar.
interface SidebarProps {
  isVisible: boolean; // Indica se a barra lateral está visível.
  chats: Chats; // Lista de chats disponíveis.
  selectedChat: string | null; // Chat selecionado.
  selectChat: (chatId: string) => void; // Função para selecionar um chat.
  deleteChat: (chatId: string) => void; // Função para deletar um chat.
}

// Definindo o componente funcional Sidebar.
export default function Sidebar({
  isVisible,
  chats,
  selectChat,
  selectedChat,
  deleteChat,
}: SidebarProps) {
  // Estado local para controlar se a barra lateral está aberta.
  const [isOpen, setIsOpen] = useState<boolean>(window.innerWidth > 768);

  // Função para lidar com o clique no botão de abrir/fechar a barra lateral.
  const handleCLick = () => {
    setIsOpen((prev) => !prev);
  };

  // Função para lidar com o clique em um chat da lista.
  const handleChatClick = (chatIndex: string) => {
    selectChat(chatIndex);
  };

  // Função para lidar com o clique no botão de deletar um chat.
  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    chatIndex: string
  ) => {
    e.stopPropagation(); // Prevenir propagação do evento para evitar misturar eventos quando há diferentes botões
    deleteChat(chatIndex);
  };

  // Retornando a estrutura do componente.
  return (
    <>
      {isVisible && (
        <>
          {/* Botão para abrir/fechar a barra lateral */}
          <button
            onClick={handleCLick}
            className="z-10 absolute bg-background-dark border border-border p-2 rounded-md flex items-center justify-center left-4 top-4"
          >
            <Image
              src="/images/open-menu.svg"
              width={25}
              height={16}
              alt="Open/close menu"
            />
          </button>
          {/* Overlay para escurecer o fundo quando a barra lateral está aberta */}
          <div
            className={cn(
              "bg-black/60 w-screen h-screen fixed visible md:hidden transition-all duration-300 opacity-0",
              isOpen && "opacity-100"
            )}
          ></div>
          {/* Barra lateral */}
          <nav
            className={cn(
              "fixed z-10 w-0 md:relative h-screen bg-background-dark p-0 transition-all duration-300 flex-col flex overflow-hidden opacity-0",
              isOpen && "visible w-[288px] md:w[377px] p-4 opacity-100"
            )}
          >
            {/* Cabeçalho da barra lateral */}
            <div className="flex justify-between gap-4">
              <h3 className="border border-border p-2 rounded-md text-base text-gray basis-4/5 text-center font-semibold ">
                Chat List
              </h3>
              {/* Botão para abrir/fechar a barra lateral em telas maiores */}
              <button
                onClick={handleCLick}
                className="bg-background-dark border border-border p-2 rounded-md basis-1/5 flex items-center justify-center "
              >
                <Image
                  src="/images/open-menu.svg"
                  width={25}
                  height={16}
                  alt="Open/close menu"
                />
              </button>
            </div>
            {/* Lista de chats */}
            <div className="mt-6 flex flex-col gap-3">
              {Object.keys(chats).map((chatIndex) => (
                <div
                  key={chatIndex}
                  onClick={() => handleChatClick(chatIndex)}
                  className={cn(
                    "flex justify-between items-center py-2 px-3 bg-background-light rounded-lg cursor-pointer",
                    selectedChat === chatIndex && "border-border border-2"
                  )}
                >
                  <div className="flex items-center gap-3 mr-2">
                    {/* Ícone do chat */}
                    <Image
                      src="/images/balloon.svg"
                      width={17}
                      height={18}
                      alt="Chat Icon"
                    />
                    {/* Nome do chat */}
                    <span className="text-white truncate text-ellipsis max-w-[180px]">
                      {chats[chatIndex].title}
                    </span>
                  </div>
                  {/* Botão para deletar o chat */}
                  <button
                    disabled={Object.keys(chats).length === 1}
                    onClick={(e) => handleDeleteClick(e, chatIndex)}
                    className="disabled:invisible"
                  >
                    <Image
                      src="/images/trash.svg"
                      width={13}
                      height={18}
                      alt="Trash Icon"
                    />
                  </button>
                </div>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
