"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, FileText, Trash2, Globe, Lock } from "lucide-react";

export default function KBPage() {
  const [items, setItems] = useState([
    { id: 1, title: "Shipping Policy", content: "We ship worldwide...", type: "PUBLIC" },
    { id: 2, title: "Internal Troubleshooting", content: "Step 1: Check logs...", type: "PRIVATE" },
  ]);

  return (
    <div className="space-y-10 pb-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
            Knowledge Engine
          </h1>
          <p className="text-neutral-400 mt-2">Manage the data used by your AI for Retrieval-Augmented Generation.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20">
          <Plus size={20} /> Add Item
        </button>
      </header>

      {/* Global Search */}
      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
        <input 
          type="text" 
          placeholder="Search knowledge base..." 
          className="w-full h-16 bg-white/5 border border-white/10 rounded-3xl pl-16 pr-8 outline-none focus:border-primary transition-all text-lg font-medium"
        />
      </div>

      {/* KB List */}
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-3xl p-6 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/10">
                <FileText size={24} />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 ${item.type === 'PUBLIC' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {item.type === 'PUBLIC' ? <Globe size={10} /> : <Lock size={10} />}
                    {item.type}
                  </span>
                </div>
                <p className="text-neutral-500 text-sm mt-1 line-clamp-1">{item.content}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-neutral-400 hover:text-white">
                Edit
              </button>
              <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-red-400 hover:bg-red-400/20">
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bulk Upload Section */}
      <div className="mt-12 p-8 rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center py-20 bg-white/[0.02] hover:bg-white/5 hover:border-primary/50 transition-all group">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
          <Plus size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">Bulk Train Your AI</h3>
        <p className="text-neutral-500 text-center max-w-md">
          Drag and drop PDF, JSON, or CSV files to index your entire documentation for context-aware support.
        </p>
        <button className="mt-8 px-8 py-3 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all">
          Browse Files
        </button>
      </div>
    </div>
  );
}
