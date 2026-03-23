"use client";

import { motion } from "framer-motion";
import { Bot, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/40 text-white">
            <Bot size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-neutral-500 mt-2">Sign in to your SmartSupport account</p>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400 px-1">Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com"
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400 px-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all"
            />
          </div>

          <Link 
            href="/dashboard"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-white font-bold hover:scale-[1.02] transition-all shadow-xl shadow-primary/20"
          >
            <LogIn size={20} />
            Sign In
          </Link>

          <div className="pt-4 text-center">
            <p className="text-sm text-neutral-500 italic">
              Note: This is a preview version. Click "Sign In" to continue to the dashboard.
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-neutral-500">
          Don't have an account? <Link href="/" className="text-primary font-bold hover:underline">Start free trial</Link>
        </p>
      </div>
    </div>
  );
}
