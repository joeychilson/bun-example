import { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { useState, type ChangeEvent } from "react";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";

export default function App() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/chat",
    });

  const [files, setFiles] = useState<FileList | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleChatSubmit = async (
    e: React.FormEvent,
    options?: { experimental_attachments?: FileList },
  ) => {
    handleSubmit(e, options);
    setFiles(undefined);
    const fileInput = document.getElementById(
      "file-upload",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-4 pb-32 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <ChatMessage message={message} />
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg px-4 py-2 text-gray-600">
              Thinking...
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="text-red-500">Error: {error.message}</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-50">
        <div className="max-w-3xl mx-auto p-4">
          <ChatInput
            input={input}
            isLoading={isLoading}
            onChange={handleInputChange}
            onSubmit={handleChatSubmit}
            onFileChange={handleFileChange}
            files={files}
          />
        </div>
      </div>
    </div>
  );
}
