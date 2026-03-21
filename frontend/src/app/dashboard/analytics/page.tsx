"use client";

import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { TrendingUp, Users, Clock, CheckCircle, Brain } from "lucide-react";

const mockData = [
  { name: 'Mon', tickets: 40, response: 24, ai: 30 },
  { name: 'Tue', tickets: 30, response: 18, ai: 25 },
  { name: 'Wed', tickets: 45, response: 32, ai: 35 },
  { name: 'Thu', tickets: 55, response: 38, ai: 48 },
  { name: 'Fri', tickets: 35, response: 25, ai: 28 },
  { name: 'Sat', tickets: 20, response: 12, ai: 18 },
  { name: 'Sun', tickets: 15, response: 10, ai: 12 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-10 pb-12">
      <header>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
          Intelligence Insights
        </h1>
        <p className="text-neutral-400 mt-2">Real-time performance metrics and AI efficiency analytics.</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Tickets", value: "128", icon: TrendingUp, color: "text-blue-400" },
          { label: "AI Resolution Rate", value: "84%", icon: Brain, color: "text-purple-400" },
          { label: "Avg. Response Time", value: "4.2m", icon: Clock, color: "text-emerald-400" },
          { label: "Customer Satisfaction", value: "98%", icon: CheckCircle, color: "text-amber-400" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl p-6 border border-white/5 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
              <stat.icon size={80} />
            </div>
            <p className="text-neutral-400 text-sm font-medium">{stat.label}</p>
            <div className="mt-4 flex items-end justify-between">
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <stat.icon className={stat.color} size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ticket Volume Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-[2rem] p-8 border border-white/5"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Ticket Volume & AI Support</h3>
            <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Total</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500" /> AI Resolved</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="tickets" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTickets)" />
                <Area type="monotone" dataKey="ai" stroke="#a855f7" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Response Time Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-[2rem] p-8 border border-white/5"
        >
          <div className="mb-8">
            <h3 className="text-xl font-bold">Efficiency Performance</h3>
            <p className="text-neutral-500 text-sm mt-1">Average response time per day (minutes)</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
                <Tooltip 
                   cursor={{fill: '#ffffff05'}}
                   contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Bar dataKey="response" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
