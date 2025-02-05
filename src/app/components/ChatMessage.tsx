import type { Message } from "ai";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  message: Message;
}

function FilePreview({
  url,
  name,
  type,
}: {
  url: string;
  name: string;
  type: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);

  if (type.startsWith("image/")) {
    return (
      <img
        src={url}
        alt={`Uploaded image: ${name}`}
        width={300}
        height={300}
        className="rounded-lg"
      />
    );
  }

  if (type === "application/pdf") {
    return (
      <div className="mt-2">
        <div className="flex items-center gap-2 p-2 bg-slate-700 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-300"
            aria-hidden="true"
          >
            <title>PDF Document Icon</title>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
          </svg>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-100"
            title={`Open ${name} in new tab`}
          >
            {name}
          </a>
        </div>
      </div>
    );
  }

  if (type === "text/plain") {
    return (
      <div className="mt-2">
        <button
          type="button"
          onClick={handleToggle}
          className="w-full p-2 bg-slate-700 rounded-lg text-left hover:bg-slate-600
            transition-colors text-gray-300"
          aria-expanded={isExpanded}
          aria-label={`Toggle ${name} preview`}
        >
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <title>Text Document Icon</title>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>{name}</span>
          </div>
          {isExpanded && (
            <iframe
              src={url}
              className="w-full h-40 mt-2 border rounded bg-slate-800 border-slate-600"
              title={`Content preview for ${name}`}
            />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-gray-100"
        title={`Open ${name} in new tab`}
      >
        {name}
      </a>
    </div>
  );
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"
        }`}
    >
      <div
        className={`rounded-2xl px-4 py-2 max-w-[80%] ${message.role === "assistant"
            ? "bg-white text-gray-700"
            : "bg-slate-800 text-gray-300"
          }`}
      >
        <div
          className={`prose max-w-none ${message.role === "user" ? "prose-invert" : ""}`}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </div>
        {message.experimental_attachments?.map((attachment, index) => (
          <div key={`${message.id}-${index}`} className="mt-2">
            <FilePreview
              url={attachment.url}
              name={attachment.name || `File ${index + 1}`}
              type={attachment.contentType || "application/octet-stream"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
