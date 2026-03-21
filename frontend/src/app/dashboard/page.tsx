"use client";

import { motion } from "framer-motion";
import { MessageSquare, Users, Clock, CheckCircle } from "lucide-react";

const stats = [
  { label: "Active Tickets", value: "128", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Total Customers", value: "2,420", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Avg. Response Time", value: "1.2m", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Resolved Today", value: "45", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
];

export default function DashboardPage() {
  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-neutral-400 mt-1">Welcome back. Here's what's happening today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl glass border border-white/5"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} mb-4`}>
              <stat.icon size={24} />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-neutral-400 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 rounded-3xl glass border border-white/5 min-h-[400px]">
          <h3 className="text-xl font-bold mb-6">Inbound Ticket Volume</h3>
          <div className="flex items-center justify-center h-64 text-neutral-500">
            {/* Chart Placeholder */}
            <p>Chart visualization will be rendered here.</p>
          </div>
        </div>
        <div className="p-8 rounded-3xl glass border border-white/5">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex gap-4 items-start pb-6 border-b border-white/5 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold">New ticket from Sarah Connor</div>
                  <div className="text-xs text-neutral-500 mt-1">"Having issues with my subscription..."</div>
                  <div className="text-[10px] text-neutral-600 mt-2 uppercase font-bold tracking-wider">2 mins ago</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
