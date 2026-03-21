"use client";

import { motion } from "framer-motion";
import { MessageSquare, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const mockTickets = [
  { id: "1", subject: "Payment failure on checkout", status: "OPEN", priority: "HIGH", user: "Alice Freeman", date: "10m ago" },
  { id: "2", subject: "Cannot reset password", status: "IN_PROGRESS", priority: "MEDIUM", user: "Bob Marley", date: "25m ago" },
  { id: "3", subject: "API documentation error", status: "OPEN", priority: "LOW", user: "Charlie Sheen", date: "1h ago" },
  { id: "4", subject: "Feature request: Dark mode", status: "RESOLVED", priority: "LOW", user: "David Bowie", date: "2h ago" },
];

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH": return "text-red-500 bg-red-500/10";
      case "MEDIUM": return "text-amber-500 bg-amber-500/10";
      case "LOW": return "text-blue-500 bg-blue-500/10";
      default: return "text-neutral-500 bg-neutral-500/10";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-neutral-400 mt-1">Manage and resolve customer inquiries.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20">
          <Plus size={20} />
          Create Ticket
        </button>
      </header>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
          <input
            type="text"
            placeholder="Search tickets..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all font-medium">
          <option>All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
      </div>

      <div className="flex-1 rounded-3xl overflow-hidden glass border border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-8 py-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">Subject</th>
              <th className="px-8 py-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">User</th>
              <th className="px-8 py-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">Status</th>
              <th className="px-8 py-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">Priority</th>
              <th className="px-8 py-4 text-xs font-bold text-neutral-500 uppercase tracking-widest text-right">Last Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockTickets.map((ticket, i) => (
              <motion.tr
                key={ticket.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <td className="px-8 py-5">
                  <Link href={`/dashboard/tickets/${ticket.id}`} className="font-bold group-hover:text-primary transition-colors">
                    {ticket.subject}
                  </Link>
                </td>
                <td className="px-8 py-5 font-medium text-neutral-400">{ticket.user}</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${ticket.status === 'OPEN' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-8 py-5 text-right font-medium text-neutral-500">{ticket.date}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
