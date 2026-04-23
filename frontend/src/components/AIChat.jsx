import { useState } from "react";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hi 👋 I’m your trading assistant. Ask me anything." }
  ]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    // 🔥 FAKE AI (safe for now)
    const aiReply = generateFakeAIResponse(input);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: aiReply }
      ]);
    }, 600);
  }

  function generateFakeAIResponse(text) {
    if (text.toLowerCase().includes("buy")) {
      return "This stock shows volatility. Consider risk before buying.";
    }
    if (text.toLowerCase().includes("sell")) {
      return "You may want to review your entry price and trend direction.";
    }
    if (text.toLowerCase().includes("portfolio")) {
      return "Your portfolio is diversified. Keep an eye on top performers.";
    }
    return "Interesting question. This looks like a simulated market — watch trends and volume.";
  }

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-cyan-500 text-white shadow-lg hover:scale-110 transition"
      >
        AI
      </button>

      {/* CHAT PANEL */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 glass-card flex flex-col">

          {/* HEADER */}
          <div className="p-3 border-b border-white/10 font-bold">
            Trading Assistant
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-cyan-500/20 text-cyan-300 self-end"
                    : "bg-white/5 text-gray-300"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-2 border-t border-white/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 rounded bg-black/30"
              placeholder="Ask about stocks..."
            />
            <button
              onClick={sendMessage}
              className="px-3 bg-cyan-500/20 rounded"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
}