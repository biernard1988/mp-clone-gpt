// Importando "ClassValue" e "clsx" do pacote "clsx".
import { type ClassValue, clsx } from "clsx";
// Importando "twMerge" do pacote "tailwind-merge".
import { twMerge } from "tailwind-merge";

// Definindo a função "cn" com um parâmetro "inputs" que é um array de valores de classe.
export default function cn(...inputs: ClassValue[]) {
  // Chamando a função "clsx" para mesclar os valores de classe passados como argumentos.
  // A função "clsx" é uma utilidade que simplifica a geração de classes de estilo condicionalmente.
  // Ela aceita uma variedade de tipos de entrada, incluindo strings, arrays e objetos.
  const mergedClasses = clsx(inputs);

  // Em seguida, a função "twMerge" é chamada para mesclar as classes geradas pela "clsx"
  // com as classes do Tailwind CSS.
  // "twMerge" é uma função que mescla as classes do Tailwind CSS de forma inteligente,
  // garantindo que as classes não sejam duplicadas e que os prefixos dos nomes das classes estejam corretos.
  const mergedWithTailwind = twMerge(mergedClasses);

  // Por fim, a função retorna as classes mescladas.
  return mergedWithTailwind;
}
