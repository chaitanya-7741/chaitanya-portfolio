import { useEffect, useRef, useState, type FormEvent } from "react";
import { LoaderCircle, MessageCircle, Send, Sparkles, X } from "lucide-react";

import { askResumeAssistant } from "@/lib/api/resume-chat.functions";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const greeting: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm Sirii. Ask me about Chaitanya's background, skills, project contributions, career goals, or achievements. I'll answer using only the information he has shared.",
};

const suggestions = [
  "What has Chaitanya contributed to GeoVision AI?",
  "Which roles is Chaitanya interested in?",
];

export function ResumeChat({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [isOpen, messages, isSending]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question || isSending) return;

    const userMessage: ChatMessage = { role: "user", content: question };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const result = await askResumeAssistant({
        data: { messages: conversation.slice(-8), question },
      });
      if ("error" in result) {
        const errorMessages: Record<typeof result.error, string> = {
          not_configured:
            "The assistant isn't configured yet. Please use the contact links on this page.",
          unavailable:
            "The assistant is temporarily unavailable. Please try again shortly.",
          rate_limited:
            "The assistant is busy right now. Please try again in a moment.",
          empty_response:
            "The assistant couldn't form a reply. Please try asking another way.",
        };
        setMessages((current) => [
          ...current,
          { role: "assistant", content: errorMessages[result.error] },
        ]);
        return;
      }
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: result.answer,
      };
      setMessages((current) => [...current, assistantMessage]);
      setConversation((current) => [...current, userMessage, assistantMessage]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "The assistant is temporarily unavailable. Please try again shortly.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="resume-chat">
      {isOpen && (
        <section
          className="resume-chat-panel"
          aria-label="Sirii chatbot"
          aria-describedby="resume-chat-privacy"
        >
          <header className="resume-chat-header">
            <span className="resume-chat-avatar" aria-hidden="true">
              <Sparkles size={18} />
            </span>
            <div>
              <h2>Chat with Sirii</h2>
              <p>Chaitanya's portfolio assistant</p>
            </div>
            <button
              className="resume-chat-close"
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close Sirii chatbot"
            >
              <X size={19} />
            </button>
          </header>

          <div className="resume-chat-messages" aria-live="polite">
            {messages.map((message, index) => (
              <p
                className={`resume-chat-message resume-chat-message--${message.role}`}
                key={`${index}-${message.role}`}
              >
                {message.content}
              </p>
            ))}
            {messages.length === 1 && (
              <div className="resume-chat-suggestions">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setInput(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {isSending && (
              <p className="resume-chat-typing" role="status">
                <LoaderCircle size={15} className="resume-chat-spinner" />
                Thinking…
              </p>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="resume-chat-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="resume-chat-input">
              Ask Sirii a question about Chaitanya
            </label>
            <input
              id="resume-chat-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question…"
              maxLength={1000}
              autoComplete="off"
              disabled={isSending}
            />
            <button
              type="submit"
              aria-label="Send question"
              disabled={isSending || input.trim().length < 2}
            >
              <Send size={17} />
            </button>
          </form>
          <p className="resume-chat-privacy" id="resume-chat-privacy">
            Questions Sirii can't answer locally may be sent to Google Gemini. Please don't share private information.
          </p>
        </section>
      )}

      <button
        className={`resume-chat-toggle${isOpen ? " is-open" : ""}`}
        type="button"
        onClick={() => onOpenChange(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close Sirii chatbot" : "Chat with Sirii"}
      >
        {isOpen ? <X size={21} /> : <MessageCircle size={21} />}
        {!isOpen && <span>Ask about me</span>}
      </button>
    </div>
  );
}
