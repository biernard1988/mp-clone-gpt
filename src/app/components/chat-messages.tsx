// Importando o utilitário "cn" do diretório "utils" usando o caminho relativo.
import cn from "@/utils/cn";
// Importando o componente de imagem do pacote "next/image".
import Image from "next/image";
// Importando o componente de Markdown do pacote "react-markdown".
import Markdown from "react-markdown";

// Definindo a interface para a estrutura de uma mensagem.
export interface Message {
  role: "user" | "assistant";
  content: string;
}

// Definindo as propriedades do componente ChatMessages.
interface ChatMessageProps {
  messages: Message[]; // Array de mensagens.
  isLoading: boolean; // Indicador de carregamento.
}

// Definindo o componente funcional ChatMessages.
export default function ChatMessages({
  messages,
  isLoading,
}: ChatMessageProps) {
  return (
    <div className="flex flex-col h-full w-full justify-start items-center overflow-auto">
      {/* Mapeando e renderizando cada mensagem */}
      {messages?.map((message, index) => (
        <MessageBlock key={index} message={message} />
      ))}
      {/* Renderizando um bloco de mensagem de carregamento, se isLoading for verdadeiro */}
      {isLoading && (
        <MessageBlock message={{ role: "assistant", content: "" }} isLoading />
      )}
    </div>
  );
}

// Definindo o componente MessageBlock como uma função anônima.
const MessageBlock = ({
  message,
  isLoading = false,
}: {
  message: Message;
  isLoading?: boolean;
}) => {
  return (
    <div
      // Aplicando classes condicionais com base no papel da mensagem
      className={cn(
        "text-white bg-background-chat px-4 py-8 w-full flex justify-center",
        message.role === "user" && "bg-background-light"
      )}
    >
      <div className="w-full max-w-[833px] flex">
        {/* Renderizando o ícone do usuário/assistente */}
        <Image
          src={`/images/${message.role}-icon.svg`}
          width={36}
          height={36}
          alt={`Avatar picture of ${message.role} `}
          className="mr-4 self-start"
        />
        {/* Renderizando o conteúdo da mensagem */}
        {isLoading ? (
          // Renderizando um ícone de carregamento se isLoading for verdadeiro
          <Image
            src="/images/loading.svg"
            width={36}
            height={36}
            alt="Loading animation"
            className="mr-4"
          />
        ) : (
          // Renderizando o conteúdo da mensagem como Markdown se isLoading for falso
          <Markdown>{message.content}</Markdown>
        )}
      </div>
    </div>
  );
};
