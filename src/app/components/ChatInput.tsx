import type { FormEvent, ChangeEvent } from "react";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (
    e: FormEvent,
    options?: { experimental_attachments?: FileList },
  ) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  files?: FileList;
}

export function ChatInput({
  input,
  isLoading,
  onChange,
  onSubmit,
  onFileChange,
  files,
}: ChatInputProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(e, { experimental_attachments: files });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 pt-4">
      <div className="flex gap-2">
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-white text-gray-700 rounded-lg px-4 py-2
            hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label="Upload icon"
            role="img"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          {files?.length ? `${files.length} file(s) selected` : "Upload Files"}
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*,.txt,.pdf"
          onChange={onFileChange}
          className="hidden"
        />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={onChange}
          placeholder="Ask about weather or anything else..."
          className="flex-1 rounded-lg border border-gray-200 px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || (!input.trim() && !files?.length)}
          className="bg-slate-800 text-white rounded-lg px-4 py-2
            hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors font-medium"
        >
          Send
        </button>
      </div>
    </form>
  );
}
