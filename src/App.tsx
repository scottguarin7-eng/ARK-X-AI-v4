
import { useState } from "react";
import { Send, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", text },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.text }],
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      setMessages([
        ...nextMessages,
        { role: "assistant", text: data.text || "(No response)" },
      ]);
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          text: error instanceof Error ? error.message : "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#07111f",
      color: "#eaf6ff",
      fontFamily: "system-ui, sans-serif",
      padding: 20,
      boxSizing: "border-box",
    }}>
      <header style={{ maxWidth: 760, margin: "0 auto 24px" }}>
        <h1 style={{ color: "#67e8f9" }}>
          <Sparkles size={24} /> ARK-X AI
        </h1>
        <p>Your AI assistant, powered by Google Gemini.</p>
      </header>

      <section style={{
        maxWidth: 760,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}>
        {messages.length === 0 && (
          <p>Welcome to ARK-X AI. What would you like to ask?</p>
        )}

        {messages.map((m, i) => (
          <article key={i} style={{
            padding: 14,
            borderRadius: 14,
            background: m.role === "user" ? "#123047" : "#101f30",
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
          }}>
            <strong>{m.role === "user" ? "You" : "ARK-X AI"}</strong>
            <p>{m.text}</p>
          </article>
        ))}

        {loading && <p>ARK-X AI is thinking…</p>}

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void sendMessage();
            }}
            placeholder="Ask ARK-X AI..."
            disabled={loading}
            style={{
              flex: 1,
              minWidth: 0,
              padding: 14,
              borderRadius: 12,
              border: "1px solid #29465d",
              background: "#0c1b2b",
              color: "white",
            }}
          />
          <button
            onClick={() => void sendMessage()}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            style={{
              padding: 14,
              borderRadius: 12,
              border: 0,
              background: "#22d3ee",
              color: "#07111f",
            }}
          >
            <Send size={20} />
          </button>
        </div>
      </section>
    </main>
  );
}
