'use client';

import React from 'react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  IndianRupee, Briefcase, FileText, CheckSquare,
  ArrowUpRight, ArrowDownRight, Clock, Plus, ChevronRight, Check, Zap, Play, CheckCircle2
} from 'lucide-react';
import { AppCard } from '../common/app-card';
import { AppButton } from '../common/app-button';
import Link from 'next/link';

// --- Dummy Data ---
// Overlapping Area Data (Quotations vs Invoices Counts)
const performanceData = [
  { name: 'Sep', quotations: 1, invoices: 16 },
  { name: 'Oct', quotations: 4, invoices: 12 },
  { name: 'Nov', quotations: 5, invoices: 21 },
  { name: 'Dec', quotations: 10, invoices: 11 },
  { name: 'Jan', quotations: 5, invoices: 10 },
  { name: 'Feb', quotations: 6, invoices: 17 },
  { name: 'Mar', quotations: 2, invoices: 16 },
];

// Valuation Bar Data
const valuationData = [
  { name: 'Sep', amount: 6300000 },
  { name: 'Oct', amount: 3800000 },
  { name: 'Nov', amount: 3600000 },
  { name: 'Dec', amount: 11700000 },
  { name: 'Jan', amount: 2200000 },
  { name: 'Feb', amount: 16400000 },
  { name: 'Mar', amount: 3450000 },
];

// Task Distribution (Donut Data)
const taskData = [
  { name: 'Completed', value: 3832, color: '#10b981' }, // Emerald
  { name: 'Open', value: 127, color: '#3b82f6' },      // Blue
  { name: 'In Progress', value: 77, color: '#f59e0b' },   // Amber
];

// Recent Projects
const recentProjects = [
  { id: '1', no: 'P2022-23/00034', client: 'Mediair Products', progress: 93, status: 'Active' },
  { id: '2', no: 'P00049', client: 'Alpha Pharma', progress: 85, status: 'Active' },
  { id: '3', no: 'P00153', client: 'Indo Amines', progress: 50, status: 'Warning' },
  { id: '4', no: 'P00076', client: 'Belchem Ind.', progress: 100, status: 'Completed' },
];

// Daily Tasks
const dailyTasks = [
  { id: '1', title: 'Bank Reconciliation', time: '10:00 AM', overdue: true },
  { id: '2', title: 'Site Visit - Plot No. J-5', time: '02:30 PM', overdue: false },
  { id: '3', title: 'Compile Quotations', time: '04:00 PM', overdue: false },
];

// Recent Activity
const recentActivity = [
  { id: '1', user: 'JD', action: 'Created Quotation', target: '#Q-4021', time: '2 mins ago' },
  { id: '2', user: 'AS', action: 'Paid Invoice', target: '#INV-882', time: '1 hour ago' },
  { id: '3', user: 'RK', action: 'Updated Project', target: 'Mediair Prod.', time: '3 hours ago' },
];

// Expiring Soon
const expiringSoon = [
  { id: '1', title: 'Quotation #Q-3990', date: 'Tomorrow', urgency: 'high' },
  { id: '2', title: 'Service Invoice #44', date: 'In 2 days', urgency: 'medium' },
];

// --- Subcomponents ---

const KPIStatCard = ({ title, value, trend, trendValue, icon: Icon, colorClass }: any) => (
  <AppCard className="overflow-hidden border-none shadow-xl dark:shadow-2xl/40 transition-all hover:-translate-y-2 hover:shadow-2xl duration-300 !bg-white/70 dark:!bg-slate-900/70 backdrop-blur-xl dark:backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/5 dark:border dark:border-white/10">
    <div className="p-5 flex justify-between items-start">
      <div>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{title}</p>
        <h3 className="text-3xl font-black text-slate-800 dark:text-slate-50 tracking-tight mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-2xl shadow-lg ring-4 ring-white/10 dark:ring-black/10 ${colorClass}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
    <div className="px-5 py-3 bg-slate-50/50 dark:bg-black/20 border-t border-slate-100/10 dark:border-white/5 flex items-center gap-2">
      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 ${trend === 'up' ? 'text-emerald-700 bg-emerald-100/80 dark:bg-emerald-500/20 dark:text-emerald-400' : 'text-rose-700 bg-rose-100/80 dark:bg-rose-500/20 dark:text-rose-400'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {trendValue}
      </span>
      <span className="text-[10px] text-slate-500 dark:text-slate-500 font-bold uppercase tracking-tight">vs last month</span>
    </div>
  </AppCard>
);

const SectionHeading = ({ title, description }: { title: string, description?: string }) => (
  <div className="mb-4">
    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">{title}</h2>
    {description && <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{description}</p>}
  </div>
);

// --- Main Layout ---

export const DashboardCharts = () => {
  return (
    <div className="min-h-screen bg-transparent dark:bg-transparent w-full p-6 pb-10 flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-700">

      {/* 1. KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPIStatCard
          title="Total Quotation Value"
          value="₹47.4m"
          trend="up"
          trendValue="12.5%"
          icon={IndianRupee}
          colorClass="bg-gradient-to-br from-indigo-500 to-indigo-700"
        />
        <KPIStatCard
          title="Active Projects"
          value="24"
          trend="up"
          trendValue="8.2%"
          icon={Briefcase}
          colorClass="bg-gradient-to-br from-emerald-500 to-emerald-700"
        />
        <KPIStatCard
          title="Open Invoices"
          value="95"
          trend="down"
          trendValue="3.1%"
          icon={FileText}
          colorClass="bg-gradient-to-br from-amber-500 to-amber-700"
        />
        <KPIStatCard
          title="Pending Tasks"
          value="204"
          trend="up"
          trendValue="5.4%"
          icon={CheckSquare}
          colorClass="bg-gradient-to-br from-rose-500 to-rose-700"
        />
      </div>      {/* 2. Middle Row: Tasks & Statuses (50/50 Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Daily Tasks Widget */}
        <AppCard className="shadow-2xl dark:shadow-2xl/40 border-none !bg-white/80 dark:!bg-slate-900/80 backdrop-blur-3xl transition-all hover:shadow-indigo-500/10 duration-500 ring-1 ring-black/[0.03] dark:ring-white/[0.05] flex flex-col group/card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[80px] -mr-16 -mt-16 pointer-events-none" />
          <AppCard.Content className="p-7 flex-grow flex flex-col relative z-10">
            <div className="flex justify-between items-start mb-8">
              <SectionHeading title="Daily Focus" description="Core priorities for today" />
              <AppButton size="sm" className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-xl shadow-indigo-500/20 text-white px-4 h-10 rounded-2xl transition-all active:scale-95 group/btn">
                <Plus className="w-4.5 h-4.5 mr-2 group-hover/btn:rotate-90 transition-transform" strokeWidth={3} /> <span className="font-black tracking-tight">New Action</span>
              </AppButton>
            </div>
            <div className="flex flex-col gap-3.5 flex-grow">
              {dailyTasks.map((task, idx) => (
                <motion.div 
                  key={task.id} 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4.5 bg-slate-100/50 dark:bg-white/[0.03] border border-white/20 dark:border-white/[0.05] rounded-[22px] hover:bg-white dark:hover:bg-white/[0.08] transition-all group relative cursor-pointer shadow-sm hover:shadow-lg"
                >
                  <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${idx === 0 ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-500/10' : 'bg-slate-200/50 dark:bg-white/5 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'}`}>
                    {idx === 0 ? <Play className="w-5 h-5 fill-current" /> : <Zap className="w-4.5 h-4.5" />}
                  </div>
                  <div className="flex flex-col gap-0.5 flex-grow overflow-hidden">
                    <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 truncate tracking-tight">{task.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black flex items-center gap-1.5 px-2 py-0.5 rounded-lg ${task.overdue ? 'text-rose-600 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400' : 'text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-white/5'}`}>
                        <Clock className="w-3.5 h-3.5" /> {task.time}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 transition-opacity opacity-0 group-hover:opacity-100 pr-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 drop-shadow-sm" strokeWidth={2.5} />
                  </div>
                </motion.div>
              ))}
            </div>
            <Link href="/tasks" className="w-full mt-10">
              <AppButton variant="outline" className="w-full font-black text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/5 rounded-[22px] h-12 transition-all shadow-sm uppercase tracking-widest text-[10px]">
                Explore Strategic Tasks <ChevronRight className="w-4 h-4 ml-1" />
              </AppButton>
            </Link>
          </AppCard.Content>
        </AppCard>

        {/* Task Distribution Donut */}
        <AppCard className="shadow-2xl dark:shadow-2xl/40 border-none !bg-white/80 dark:!bg-slate-900/80 backdrop-blur-3xl transition-all hover:shadow-indigo-500/10 duration-500 ring-1 ring-black/[0.03] dark:ring-white/[0.05] flex flex-col group/card relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 blur-[80px] -ml-16 -mb-16 pointer-events-none" />
          <AppCard.Content className="p-7 flex-grow flex flex-col relative z-10">
            <SectionHeading title="Live Distribution" description="System-wide health status" />
            <div className="flex-grow flex items-center justify-center relative min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={95}
                    outerRadius={125}
                    paddingAngle={10}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={8}
                  >
                    {taskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(16px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)', color: '#f8fafc' }}
                    itemStyle={{ fontWeight: 'black', color: '#f8fafc', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Inner Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-5xl font-black text-slate-800 dark:text-slate-50 tracking-tighter drop-shadow-sm">4.0k</span>
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-1.5 opacity-60">Operations</span>
              </div>
            </div>
            {/* Custom Premium Legend */}
            <div className="grid grid-cols-3 gap-3 text-[9px] font-black text-slate-600 dark:text-slate-400 mt-6 overflow-hidden">
              {taskData.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 p-2.5 bg-slate-50/50 dark:bg-white/[0.03] rounded-2xl border border-white/5 shadow-sm transition-all hover:translate-y-[-2px]">
                  <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: item.color, color: item.color }} />
                  <span className="uppercase tracking-widest text-center opacity-80">{item.name}</span>
                </div>
              ))}
            </div>
          </AppCard.Content>
        </AppCard>

      </div>

      {/* 3. Lower Row: Projects & Performance (1:2 Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Active Projects Widget */}
        <AppCard className="shadow-xl dark:shadow-2xl/20 border-none !bg-white/70 dark:!bg-slate-900/70 backdrop-blur-xl dark:backdrop-blur-xl transition-all hover:shadow-2xl duration-300 ring-1 ring-black/5 dark:ring-white/5 lg:col-span-1 flex flex-col">
          <AppCard.Content className="p-6 flex-grow">
            <div className="flex justify-between items-start mb-6">
              <SectionHeading title="Active Projects" description="High priority sites" />
              <AppButton size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 h-9 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all">
                View All
              </AppButton>
            </div>
            <div className="flex flex-col gap-4">
              {recentProjects.map((proj) => (
                <div key={proj.id} className="flex flex-col gap-3 p-4 bg-slate-100/40 dark:bg-black/20 rounded-2xl border border-white/10 dark:hover:bg-white/5 transition-all cursor-pointer group shadow-sm">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <h4 className="font-black text-sm text-slate-800 dark:text-slate-50 group-hover:text-blue-500 transition-colors uppercase tracking-tight">{proj.no}</h4>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{proj.client}</p>
                    </div>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${proj.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                      proj.status === 'Warning' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
                      }`}>
                      {proj.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-grow h-2 bg-slate-200 dark:bg-black/40 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(59,130,246,0.5)] ${proj.progress === 100 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-blue-500'}`} style={{ width: `${proj.progress}%` }} />
                    </div>
                    <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 w-8 text-right">{proj.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </AppCard.Content>
        </AppCard>

        {/* Performance Area Chart */}
        <AppCard className="lg:col-span-2 shadow-xl dark:shadow-2xl/20 border-none !bg-white/70 dark:!bg-slate-900/70 backdrop-blur-xl dark:backdrop-blur-xl transition-all hover:shadow-2xl duration-300 ring-1 ring-black/5 dark:ring-white/5">
          <AppCard.Content className="p-6">
            <SectionHeading title="Performance Metrics" description="Quotations vs Invoices trends" />
            <div className="h-[360px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorQuots" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorInvs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.1} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(12px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold', color: '#f8fafc' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '30px', fontSize: '13px', fontWeight: 700, color: '#64748b' }} />
                  <Area type="monotone" dataKey="quotations" name="Quotations Issued" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorQuots)" />
                  <Area type="monotone" dataKey="invoices" name="Invoices Paid" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorInvs)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AppCard.Content>
        </AppCard>

      </div>

      {/* 4. Bottom Row: Valuations & Activity (3 Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Valuation Bar Chart (Spans 2/4) */}
        <AppCard className="lg:col-span-2 shadow-xl dark:shadow-2xl/20 border-none !bg-white/70 dark:!bg-slate-900/70 backdrop-blur-xl transition-all hover:shadow-2xl duration-300 ring-1 ring-black/5 dark:ring-white/10">
          <AppCard.Content className="p-6">
            <SectionHeading title="Monthly Valuation" description="Global revenue (₹)" />
            <div className="h-[280px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={valuationData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.1} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 800 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b', fontWeight: 800 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(val: number) => `₹ ${(val / 100000).toFixed(1)}L`}
                    cursor={{ fill: 'rgba(241, 245, 249, 0.1)', radius: 8 }}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(12px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc' }}
                  />
                  <Bar dataKey="amount" fill="#3b82f6" radius={6} barSize={32}>
                    {valuationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 5 ? '#3b82f6' : '#94a3b8'} fillOpacity={index === 5 ? 1 : 0.3} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AppCard.Content>
        </AppCard>

        {/* Recent Activity Widget (Spans 1/4) */}
        <AppCard className="lg:col-span-1 shadow-xl dark:shadow-2xl/20 border-none !bg-white/70 dark:!bg-slate-900/70 backdrop-blur-xl transition-all hover:shadow-2xl duration-300 ring-1 ring-black/5 dark:ring-white/10">
          <AppCard.Content className="p-6">
            <SectionHeading title="Activity" description="Latest events" />
            <div className="flex flex-col gap-4 mt-2">
              {recentActivity.map((act) => (
                <div key={act.id} className="flex gap-3 items-center group cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                    <span className="text-[10px] font-black">{act.user}</span>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate leading-tight">
                      <span className="text-slate-400 font-medium">{act.action}</span> {act.target}
                    </p>
                    <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </AppCard.Content>
        </AppCard>

        {/* Expiring Soon Widget (Spans 1/4) */}
        <AppCard className="lg:col-span-1 shadow-xl dark:shadow-2xl/20 border-none !bg-white/70 dark:!bg-slate-900/70 backdrop-blur-xl transition-all hover:shadow-2xl duration-300 ring-1 ring-black/5 dark:ring-white/10">
          <AppCard.Content className="p-6">
            <SectionHeading title="Expiring" description="Priority action" />
            <div className="flex flex-col gap-3 mt-2">
              {expiringSoon.map((exp) => (
                <div key={exp.id} className={`p-3 rounded-xl border flex flex-col gap-1 transition-all hover:scale-[1.02] cursor-pointer shadow-sm ${
                  exp.urgency === 'high' ? 'bg-rose-50/50 dark:bg-rose-500/10 border-rose-200/50 dark:border-rose-500/20' : 'bg-amber-50/50 dark:bg-amber-500/10 border-amber-200/50 dark:border-amber-500/20'
                }`}>
                  <h4 className="text-[11px] font-black text-slate-800 dark:text-slate-100 truncate">{exp.title}</h4>
                  <div className="flex items-center gap-1.5">
                    <Clock className={`w-3 h-3 ${exp.urgency === 'high' ? 'text-rose-500' : 'text-amber-500'}`} />
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{exp.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </AppCard.Content>
        </AppCard>

      </div>
    </div>
  );
};
