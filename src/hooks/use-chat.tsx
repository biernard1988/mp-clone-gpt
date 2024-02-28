import axiosInstance from "@/utils/axios"; // Importa uma instância do Axios
import { useEffect, useReducer } from "react"; // Importa useEffect e useReducer do React
import { v4 as uuid } from "uuid"; // Importa a função uuid para gerar IDs únicos

// Define a interface Message para representar mensagens no chat
export interface Message {
  role: "user" | "assistant"; // Papel da mensagem: usuário ou assistente
  content: string; // Conteúdo da mensagem
}

// Define a interface Chat para representar um chat
export interface Chat {
  messages: Message[]; // Array de mensagens no chat
  title: string; // Título do chat
}

// Define o tipo Chats como um objeto onde as chaves são IDs de chat e os valores são instâncias de Chat
export type Chats = Record<string, Chat>;

// Define a interface State para representar o estado do chat
interface State {
  chats: Chats; // Chats disponíveis
  isLoading: boolean; // Indica se o chat está carregando
  selectedChat: string; // ID do chat selecionado
}

// Define o tipo Action para representar as ações possíveis que podem ser despachadas no reducer
type Action =
  | {
      type: "add-user-message";
      payload: {
        chatId: string;
        message: string;
      };
    }
  | {
      type: "update-assistant-response";
      payload: {
        chatId: string;
        chatToUpdate: Chat;
      };
    }
  | {
      type: "update-assistant-response-error";
      payload: {
        chatId: string;
      };
    }
  | {
      type: "select-chat";
      payload: {
        chatId: string;
      };
    }
  | {
      type: "delete-chat";
      payload: {
        chatId: string;
      };
    };

// Define a função reducer para gerenciar as mudanças de estado do chat
function chatReducer(state: State, action: Action): State {
  switch (action.type) {
    // Adiciona uma mensagem do usuário ao chat
    case "add-user-message":
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.chatId]: {
            ...state.chats[action.payload.chatId],
            messages: [
              ...(state.chats[action.payload.chatId]?.messages || []),
              {
                role: "user",
                content: action.payload.message,
              },
            ],
          },
        },
        isLoading: true,
      };

    // Atualiza a resposta do assistente no chat
    case "update-assistant-response":
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.chatId]: action.payload.chatToUpdate,
        },
        isLoading: false,
      };

    // Trata erro na resposta do assistente
    case "update-assistant-response-error":
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.chatId]: {
            ...state.chats[action.payload.chatId],
            messages: [
              ...(state.chats[action.payload.chatId]?.messages || []),
              {
                role: "assistant",
                content:
                  "Communication with the server failed, check your key and try again",
              },
            ],
          },
        },
        isLoading: true,
      };

    // Seleciona um chat
    case "select-chat":
      return {
        ...state,
        selectedChat: action.payload.chatId,
      };

    // Deleta um chat
    case "delete-chat":
      const newChats = structuredClone(state.chats); // Clona o estado atual dos chats
      delete newChats[action.payload.chatId]; // Remove o chat especificado

      // Define o novo chat selecionado
      const newSelectedChat =
        state.selectedChat === action.payload.chatId
          ? Object.keys(newChats)[0] // Se o chat deletado era o selecionado, seleciona o próximo chat disponível
          : state.selectedChat;

      // Retorna o novo estado
      return {
        ...state,
        chats: newChats,
        selectedChat: newSelectedChat,
      };
  }
}

// Função para gerar o estado inicial do chat
function generateInitialState(): State {
  const chatsFromLocalStorage = JSON.parse(
    localStorage.getItem("chats") || "{}"
  );

  const id = uuid(); // Gera um novo ID único para o chat
  return {
    chats: {
      [id]: { title: "New chat", messages: [] }, // Cria um novo chat com título padrão "New chat"
      ...chatsFromLocalStorage, // Restaura os chats salvos no armazenamento local
    },
    isLoading: false, // Define isLoading como false
    selectedChat: id, // Define o chat selecionado como o novo chat criado
  };
}

// Hook personalizado para gerenciar o chat
export default function useChat(openAiKey: string) {
  // Usa useReducer para gerenciar o estado do chat com a função reducer e o estado inicial gerado
  const [state, dispatch] = useReducer(chatReducer, {}, generateInitialState);

  // Função para adicionar mensagem do usuário ao chat
  const addUserMessage = (chatId: string, message: string) => {
    dispatch({ type: "add-user-message", payload: { chatId, message } });
  };

  // Função para selecionar um chat
  const selectChat = (chatId: string) => {
    dispatch({
      type: "select-chat",
      payload: {
        chatId,
      },
    });
  };

  // Função para deletar um chat
  const deleteChat = (chatId: string) => {
    dispatch({
      type: "delete-chat",
      payload: {
        chatId,
      },
    });
  };

  // Calcula o número de mensagens no chat selecionado
  const selectedChatMessageCount =
    state.chats[state.selectedChat].messages.length;

  // Determina o remetente da última mensagem no chat selecionado
  const lastMessageSender =
    state.chats[state.selectedChat].messages[selectedChatMessageCount - 1]
      ?.role;

  // Efeito para chamar a API do OpenAI e obter a resposta do assistente
  useEffect(() => {
    const getOpenAiResponse = async () => {
      try {
        const { data: chat } = await axiosInstance.post("/api/bot", {
          key: openAiKey,
          chat: state.chats[state.selectedChat], // Passa o chat selecionado para a API do assistente
        });

        // Atualiza o estado com a resposta do assistente
        dispatch({
          type: "update-assistant-response",
          payload: {
            chatId: state.selectedChat,
            chatToUpdate: chat,
          },
        });
      } catch (error) {
        // Trata erros na resposta do assistente
        dispatch({
          type: "update-assistant-response-error",
          payload: { chatId: state.selectedChat },
        });
      }
    };

    // Chama a API do OpenAI se a chave estiver definida, houver mensagens no chat e a última mensagem for do usuário
    if (
      !!openAiKey &&
      selectedChatMessageCount > 0 &&
      lastMessageSender === "user"
    ) {
      getOpenAiResponse();
    }
  }, [
    openAiKey,
    selectedChatMessageCount,
    lastMessageSender,
    state.chats,
    state.selectedChat,
  ]);

  // Efeito para salvar o estado dos chats no armazenamento local
  useEffect(() => {
    const chatsToIgnore = Object.keys(state.chats).filter(
      (chatIndex) =>
        state.chats[chatIndex].messages.length < 2 &&
        state.chats[chatIndex].title === "New Chat"
    );

    const chatsToSave = structuredClone(state.chats);

    chatsToIgnore.forEach((chatIndex) => {
      delete chatsToSave[chatIndex];
    });

    localStorage.setItem("chats", JSON.stringify(chatsToSave));
  }, [state.chats]);

  // Retorna as propriedades e funções necessárias para o chat
  return {
    chats: state.chats,
    isLoading: state.isLoading,
    selectedChat: state.selectedChat,
    addUserMessage,
    selectChat,
    deleteChat,
  };
}
