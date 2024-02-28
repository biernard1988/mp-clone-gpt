// Importando a biblioteca OpenAI.
import OpenAI from "openai";

// Definindo uma função chamada openai que recebe uma chave de API como argumento.
// Essa função retorna uma instância do cliente OpenAI configurada com a chave de API fornecida.
const openai = (key: string): OpenAI =>
  new OpenAI({
    apiKey: key, // Configura a chave de API para a instância do cliente OpenAI.
  });

// Exportando a função openai para que possa ser utilizada em outros arquivos.
export default openai;
