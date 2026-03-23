"use client";

import { motion } from "framer-motion";
import Scene3D from "@/components/Scene3D";
import { ArrowRight, Bot, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      <Scene3D />
      
      {/* Navbar Overlay */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 px-12">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Bot className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">SmartSupport <span className="text-primary">AI</span></span>
        </div>
        <div className="flex gap-8 items-center text-sm font-medium">
          <a href="#" className="hover:text-primary transition-colors">Platform</a>
          <a href="#" className="hover:text-primary transition-colors">Solutions</a>
          <a href="#" className="hover:text-primary transition-colors">Pricing</a>
          <Link href="/login" className="px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-opacity-90 transition-all shadow-xl">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            NEXT-GEN CUSTOMER SUPPORT
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
            Scale Support with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-indigo-400">
              Intelligence.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto font-medium">
            SmartSupport AI transforms your customer experience with ultra-fast, context-aware AI agents that resolve issues in seconds.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dashboard" className="group px-8 py-4 rounded-2xl bg-primary text-white font-bold text-lg flex items-center gap-2 hover:scale-105 transition-all shadow-2xl shadow-primary/40">
              Start Free Trial
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 rounded-2xl glass font-bold text-lg hover:bg-white/10 transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid Overlay */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-6xl mx-auto relative z-10 px-6">
        {[
          { icon: <Bot size={24}/>, title: "Context-Aware AI", desc: "Our models understand your entire knowledge base instantly." },
          { icon: <Zap size={24}/>, title: "Real-time Sync", desc: "Instant messaging across all channels with zero latency." },
          { icon: <Shield size={24}/>, title: "Enterprise Security", desc: "End-to-end encryption and RBAC for ultimate data protection." }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="p-8 rounded-3xl glass hover:border-primary/50 transition-all cursor-default"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-neutral-500 font-medium leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
