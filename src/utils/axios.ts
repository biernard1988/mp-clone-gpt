// Importando o Axios e AxiosInstance do pacote "axios".
import axios, { AxiosInstance } from "axios";

// Criando uma instância do Axios com uma URL base.
const axiosInstance: AxiosInstance = axios.create({
  // A URL base é definida usando uma variável de ambiente NEXT_PUBLIC_URL, se disponível.
  // Se NEXT_PUBLIC_URL não estiver definido, a URL base padrão será "http://localhost:3000".
  baseURL: process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000",
});

// Exportando a instância do Axios para que possa ser usada em outros arquivos.
export default axiosInstance;
