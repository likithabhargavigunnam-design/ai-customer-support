"use client";

import { motion } from "framer-motion";
import { Settings, Shield, Bell, Globe, User } from "lucide-react";

const sections = [
  { icon: User, title: "Profile Info", desc: "Update your personal details and avatar." },
  { icon: Shield, title: "Security", desc: "Manage passwords and two-factor authentication." },
  { icon: Bell, title: "Notifications", desc: "Configure how you receive alerts." },
  { icon: Globe, title: "Integrations", desc: "Connect with third-party services." },
];

export default function SettingsPage() {
  return (
    <div className="h-full flex flex-col">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-neutral-400 mt-1">Configure your workspace and account preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-3xl glass border border-white/5 hover:border-primary/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <section.icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">{section.title}</h3>
            <p className="text-neutral-500 font-medium leading-relaxed">{section.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
