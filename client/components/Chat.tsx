"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const ChatComponent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8000/chat?message=${encodeURIComponent(userMessage)}`);
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
        <div className="flex-1 flex flex-col h-full max-h-full">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Chat with your Documents</h2>

            {/* Chat History Area */}
            <div className="flex-1 border border-gray-200 rounded-xl p-4 bg-gray-50 flex flex-col overflow-y-auto shadow-inner space-y-4">
                {messages.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        <p className="text-center">Your chat messages will appear here.</p>
                    </div>
                ) : (
                    messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))
                )}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 text-gray-500 rounded-2xl rounded-bl-none px-5 py-3 shadow-sm flex space-x-2 items-center">
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="mt-4 flex gap-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask a question about your documents..."
                    className="flex-1 border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all shadow-sm"
                />
                <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <span>Send</span>
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default ChatComponent;