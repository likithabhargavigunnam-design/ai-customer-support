"use client";

import { useSocket } from "@/hooks/useSocket";
import { Send, User, Bot, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EncryptionService } from "@/lib/encryption";

export default function TicketChatPage({ params }: { params: { id: string } }) {
  const socket = useSocket(params.id);
  const [messages, setMessages] = useState<{ id: string, content: string, isBot: boolean, createdAt: string, isEncrypted?: boolean, iv?: string }[]>([]);
  const [input, setInput] = useState("");
  const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupKey = async () => {
      const key = await EncryptionService.generateKey();
      setCryptoKey(key);
    };
    setupKey();
  }, []);

  useEffect(() => {
    if (!socket || !cryptoKey) return;

    socket.on("new_message", async (message: any) => {
      let decryptedContent = message.content;
      
      if (message.isEncrypted && message.iv) {
        try {
          const ciphertext = Uint8Array.from(atob(message.content), c => c.charCodeAt(0)).buffer;
          const iv = Uint8Array.from(atob(message.iv), c => c.charCodeAt(0));
          decryptedContent = await EncryptionService.decrypt(ciphertext, cryptoKey, iv);
        } catch (e) {
          console.error("Decryption failed", e);
          decryptedContent = "[Encrypted Content - Decryption Failed]";
        }
      }

      setMessages((prev: any) => [...prev, { ...message, content: decryptedContent }]);
    });

    return () => {
      socket.off("new_message");
    };
  }, [socket, cryptoKey]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !socket || !cryptoKey) return;

    const { ciphertext, iv } = await EncryptionService.encrypt(input, cryptoKey);
    const encryptedContent = btoa(String.fromCharCode(...new Uint8Array(ciphertext)));
    const ivStr = btoa(String.fromCharCode(...iv));

    const data = {
      ticketId: params.id,
      content: encryptedContent,
      senderId: "test-user",
      isBot: false,
      isEncrypted: true,
      iv: ivStr
    };

    socket.emit("send_message", data);
    setInput("");
  };

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/tickets" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight px-1">Ticket #{params.id}</h1>
          <p className="text-xs font-bold text-primary tracking-widest uppercase mt-1 px-1">Payment failure on checkout</p>
        </div>
      </header>

      <div className="flex-1 glass rounded-3xl overflow-hidden flex flex-col border border-white/5 relative">
        <div 
          ref={scrollRef}
          className="flex-1 p-8 overflow-y-auto space-y-6 scrollbar-hide"
        >
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div
                key={m.id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${m.isBot ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg ${m.isBot ? "bg-primary text-white" : "bg-neutral-800 text-neutral-400"}`}>
                  {m.isBot ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div className={`max-w-[70%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${m.isBot ? "glass-morphism" : "bg-white/5 border border-white/5"}`}>
                  {m.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-6 bg-white/5 border-t border-white/5">
          <div className="relative flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all pr-16"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button 
              onClick={sendMessage}
              className="absolute right-2 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-primary/20"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="flex gap-4 mt-4">
             <button className="text-[10px] font-bold text-neutral-500 hover:text-primary transition-colors uppercase tracking-widest">
               Suggest AI Reply
             </button>
             <button className="text-[10px] font-bold text-neutral-500 hover:text-primary transition-colors uppercase tracking-widest">
               Insert Knowledge Base
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
