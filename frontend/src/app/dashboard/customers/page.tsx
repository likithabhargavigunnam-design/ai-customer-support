"use client";

import { motion } from "framer-motion";
import { Users, Search, UserPlus } from "lucide-react";
import { useState } from "react";

const mockCustomers = [
  { id: "1", name: "Alice Freeman", email: "alice@example.com", tickets: 12, status: "ACTIVE" },
  { id: "2", name: "Bob Marley", email: "bob@example.com", tickets: 5, status: "INACTIVE" },
  { id: "3", name: "Charlie Sheen", email: "charlie@example.com", tickets: 24, status: "ACTIVE" },
  { id: "4", name: "David Bowie", email: "david@example.com", tickets: 8, status: "ACTIVE" },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="h-full flex flex-col">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-neutral-400 mt-1">Manage your customer relationships.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-secondary text-white font-bold hover:scale-105 transition-all shadow-lg shadow-secondary/20">
          <UserPlus size={20} />
          Add Customer
        </button>
      </header>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-secondary outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 rounded-3xl overflow-hidden glass border border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-8 py-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">Name</th>
              <th className="px-8 py-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">Email</th>
              <th className="px-8 py-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">Tickets</th>
              <th className="px-8 py-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockCustomers.map((customer, i) => (
              <motion.tr
                key={customer.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <td className="px-8 py-5 font-bold group-hover:text-secondary transition-colors">{customer.name}</td>
                <td className="px-8 py-5 font-medium text-neutral-400">{customer.email}</td>
                <td className="px-8 py-5 font-medium text-neutral-400">{customer.tickets}</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${customer.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {customer.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
