export default function KeyInstructions() {
  return (
    <div className="p-4 lg:p-10 w-full flex justify-center">
      <div className="bg-background-dark rounded-lg px-20 py-16 w-full max-w-[833px]">
        <h2 className="text-center text-lg text-gray font-semibold">
          Installation guide to get an API key from OpenAI
        </h2>
        <ol className="space-y-3 mt-10 text-white list-decimal">
          <li>
            Register: Go to the <a href="https://openai.com">OpenAI</a> website
          </li>
          <li>
            Access the API Panel: In the panel go to your avatar and click on{" "}
            <b>View API keys</b>
          </li>
          <li>
            Create a new key: By clicking the <b>+ Create new secret key</b>
            button, add a nickname for the key and a new code will be generated
          </li>
          <li>Copy the generated key and paste it below 👇</li>
        </ol>
      </div>
    </div>
  );
}
