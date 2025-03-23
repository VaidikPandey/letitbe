"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Home, User, Bell, Trophy, Menu, X } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";

type Message = {
  role: "user" | "assistant";
  content: string;
  type?: "chat" | "api_fetch";
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isSending) return;

    setIsSending(true);

    // Add user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: input }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.message, type: data.type },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-[#F9FAFB] pt-16 text-gray-800">


      <Navbar />

      <div className="container relative z-10 flex max-w-2xl flex-col items-center px-4 py-12">
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-4xl font-bold text-[#3B82F6]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Health Assistant
          </h1>
          <p
            className="text-gray-600"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Ask any questions about your medications or health
          </p>
        </motion.div>

        <motion.div
          className="mb-4 w-full flex-1 overflow-y-auto rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ minHeight: "400px", borderRadius: "12px" }}
        >
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-400">
              <p style={{ fontFamily: "Roboto, sans-serif" }}>
                No messages yet. Start a conversation!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === "user"
                          ? "bg-[#3B82F6] text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                      style={{
                        borderRadius: "12px",
                        fontFamily: "Roboto, sans-serif",
                      }}
                    >
                      {msg.role === "assistant" ? (
                        <div className="markdown-content prose prose-sm max-w-none">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p>{msg.content}</p>
                      )}
                      {msg.type === "api_fetch" && (
                        <span className="mt-1 block text-xs font-medium text-red-500">
                          (Generated Information)
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        <motion.div
          className="w-full rounded-lg border border-gray-100 bg-white p-2 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ borderRadius: "12px" }}
        >
          <div className="flex">
            <textarea
              className="max-h-24 flex-1 resize-none border-0 p-2 focus:ring-0"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              style={{ fontFamily: "Roboto, sans-serif" }}
            />
            <motion.button
              className={`self-end rounded-lg bg-[#3B82F6] p-2 text-white ${isSending ? "opacity-70" : ""}`}
              onClick={sendMessage}
              disabled={isSending}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ borderRadius: "8px" }}
            >
              <Send className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
