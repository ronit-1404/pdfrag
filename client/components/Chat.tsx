"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const ChatComponent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch(`/chat?message=${encodeURIComponent(userMessage)}`);
            const data = await response.json();

            if (data.message) {
                setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
            } else if (data.error) {
                setMessages((prev) => [...prev, { role: "assistant", content: "Error: " + data.error }]);
            }
        } catch (error: any) {
            console.error(error);
            setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong fetching the response." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">

            {/* ── Chat Sub-Header ── */}
            <div className="h-14 px-6 flex items-center justify-between border-b border-[#3b2060]/30 glass-panel shrink-0 z-10">
                <h2
                    className="text-base font-semibold text-[#f1e8ff] tracking-tight"
                    style={{ fontFamily: "var(--font-jetbrains, 'JetBrains Mono'), monospace" }}
                >
                    Chat with your Documents
                </h2>
                <span className="px-2 py-1 rounded-md text-[10px] font-mono bg-[#7c3aed]/15 text-[#c084fc] border border-[#7c3aed]/25 select-none">
                    AI Ready
                </span>
            </div>

            {/* ── Messages Area ── */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">

                {/* Empty state */}
                {messages.length === 0 && !loading && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center select-none py-20">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center mb-5 glow-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                                <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <p className="text-[#f1e8ff] font-semibold text-lg mb-1">Ask anything</p>
                        <p className="text-[#9d8ab0] text-sm">Upload a PDF then start chatting below.</p>
                    </div>
                )}

                {/* Message bubbles */}
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {/* AI avatar */}
                        {msg.role === "assistant" && (
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center shrink-0 shadow-lg shadow-[#7c3aed]/20 mt-1">
                                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                                    <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2M7.5 13A2.5 2.5 0 005 15.5 2.5 2.5 0 007.5 18a2.5 2.5 0 002.5-2.5A2.5 2.5 0 007.5 13m9 0a2.5 2.5 0 00-2.5 2.5A2.5 2.5 0 0016.5 18a2.5 2.5 0 002.5-2.5A2.5 2.5 0 0016.5 13z" />
                                </svg>
                            </div>
                        )}

                        {/* Bubble */}
                        <div
                            className={`max-w-[76%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user"
                                    ? "bg-gradient-to-br from-[#7c3aed] to-[#a855f7] text-white shadow-[0_4px_18px_rgba(124,58,237,0.3)] rounded-tr-sm"
                                    : "glass-card text-[#f1e8ff] rounded-tl-sm"
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                    <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center shrink-0 shadow-lg shadow-[#7c3aed]/20 mt-1">
                            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                                <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2M7.5 13A2.5 2.5 0 005 15.5 2.5 2.5 0 007.5 18a2.5 2.5 0 002.5-2.5A2.5 2.5 0 007.5 13m9 0a2.5 2.5 0 00-2.5 2.5A2.5 2.5 0 0016.5 18a2.5 2.5 0 002.5-2.5A2.5 2.5 0 0016.5 13z" />
                            </svg>
                        </div>
                        <div className="glass-card rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-[#7c3aed]/70 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-2 h-2 bg-[#7c3aed]/70 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-2 h-2 bg-[#7c3aed]/70 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </div>
                )}

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
            </div>

            {/* ── Input Bar — pinned to bottom ── */}
            <div className="shrink-0 px-6 pb-5 pt-3 bg-gradient-to-t from-[#0f0a1e] via-[#0f0a1e]/95 to-transparent">
                <div className="relative group">
                    {/* Ambient glow behind input */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-xl blur opacity-0 group-hover:opacity-25 group-focus-within:opacity-35 transition-opacity duration-500 pointer-events-none" />

                    {/* Input wrapper */}
                    <div className="relative flex items-center glass-panel input-glow-group rounded-xl border border-[#3b2060]/70 focus-within:border-[#7c3aed]/55 transition-all duration-300 overflow-hidden bg-[#1a1025]">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Ask a question about your documents..."
                            className="flex-1 bg-transparent border-none outline-none ring-0 text-[#f1e8ff] placeholder:text-[#9d8ab0]/55 text-sm py-4 px-4 w-full"
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            className="m-2 p-2.5 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white shadow-lg hover:shadow-[#7c3aed]/40 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center shrink-0"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <p className="text-center mt-2 text-[10px] text-[#9d8ab0]/40 font-mono tracking-wide select-none">
                    PDFrag AI · powered by Gemini
                </p>
            </div>
        </div>
    );
};

export default ChatComponent;