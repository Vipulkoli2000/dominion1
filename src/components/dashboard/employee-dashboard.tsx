'use client';

import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import {
  Briefcase, CheckSquare, Clock, CheckCircle2,
  AlertCircle, ChevronRight, LayoutDashboard,
  Calendar, Layers, TrendingUp
} from 'lucide-react';
import { AppCard } from '../common/app-card';
import { AppButton } from '../common/app-button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// --- Dummy Data for Employee ---
const employeeStats = [
  { title: 'My Total Tasks', value: '48', icon: CheckSquare, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50/50 dark:bg-blue-950/30', glow: 'shadow-blue-500/20' },
  { title: 'Pending Tasks', value: '12', icon: Clock, color: 'text-blue-400 dark:text-blue-300', bg: 'bg-blue-50/50 dark:bg-blue-950/30', glow: 'shadow-blue-400/20' },
  { title: 'Completed Tasks', value: '36', icon: CheckCircle2, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50/50 dark:bg-sky-950/30', glow: 'shadow-sky-500/20' },
  { title: 'My Projects', value: '4', icon: Briefcase, color: 'text-blue-800 dark:text-blue-200', bg: 'bg-blue-50/50 dark:bg-blue-950/30', glow: 'shadow-blue-600/20' },
];

const taskDistribution = [
  { name: 'Completed', value: 36, color: '#2563eb' }, // blue-600
  { name: 'In Progress', value: 8, color: '#38bdf8' }, // sky-400
  { name: 'Pending', value: 4, color: '#93c5fd' }, // blue-300
];

const myProjects = [
  { id: 'P001', name: 'Mediair Products Factory', tasks: 15, completed: 12, status: 'Active' },
  { id: 'P002', name: 'Alpha Pharma HQ', tasks: 12, completed: 8, status: 'Active' },
  { id: 'P003', name: 'Belchem Industrial Unit', tasks: 10, completed: 10, status: 'Completed' },
  { id: 'P004', name: 'Indo Amines Site Expansion', tasks: 11, completed: 6, status: 'Warning' },
];

const myTasks = [
  { id: 'T101', title: 'Submit Weekly Progress Report', project: 'Mediair Products', deadline: 'Today', priority: 'High', status: 'Pending' },
  { id: 'T102', title: 'Verify Electrical Layout', project: 'Alpha Pharma', deadline: 'Tomorrow', priority: 'Medium', status: 'In Progress' },
  { id: 'T103', title: 'Coordinate with Site Engineer', project: 'Indo Amines', deadline: '31 Mar', priority: 'High', status: 'Pending' },
];

// --- Subcomponents ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: any = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
};

const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className={cn(
      "relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 backdrop-blur-xl shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:bg-slate-900/60 dark:border-white/10 dark:shadow-none dark:hover:bg-slate-900/80",
      className
    )}
  >
    {/* Subtle Inner Glow */}
    <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
    <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
    {children}
  </motion.div>
);

const StatCard = ({ title, value, icon: Icon, color, bg, glow }: any) => (
  <GlassCard className="flex items-center gap-4 p-6 group">
    <div className={cn("relative shrink-0 p-3 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110", bg, color)}>
      <Icon className="w-6 h-6 z-10" />
      <div className={cn("absolute inset-0 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity", glow)} />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{title}</p>
      <div className="flex items-baseline gap-2 mt-0.5">
        <h3 className="text-2xl font-black text-slate-950 dark:text-slate-50 tabular-nums">{value}</h3>
        <span className="flex items-center text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 px-1.5 py-0.5 rounded-md">
          <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> +12%
        </span>
      </div>
    </div>
  </GlassCard>
);

const ProjectCard = ({ project }: { project: typeof myProjects[0] }) => {
  const progress = Math.round((project.completed / project.tasks) * 100);
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900/60 transition-all cursor-pointer shadow-sm active:scale-95"
    >
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="min-w-0">
          <h4 className="font-bold text-blue-500 dark:text-blue-400 truncate group-hover:text-blue-600 transition-colors uppercase tracking-tight text-[10px]">{project.id}</h4>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate mt-0.5">{project.name}</p>
        </div>
        <span className={cn("text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-sm",
          project.status === 'Completed' ? 'bg-blue-600 text-white' :
            project.status === 'Warning' ? 'bg-sky-500 text-white' : 'bg-blue-500 text-white'
        )}>
          {project.status}
        </span>
      </div>
      <div className="space-y-2.5 relative z-10">
        <div className="flex justify-between text-[10px] font-black text-slate-400 dark:text-slate-500">
          <span className="uppercase tracking-widest">Progress Metrics</span>
          <span className="text-blue-600 dark:text-blue-400">{progress}%</span>
        </div>
        <div className="h-2 w-full bg-slate-100/50 dark:bg-slate-800/50 rounded-full overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
            className={cn("h-full rounded-full relative",
              progress === 100 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-r from-sky-400 to-blue-500'
            )}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </motion.div>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-tight">
            <span className="text-slate-800 dark:text-slate-200">{project.completed}</span> / {project.tasks} TASKS COMPLETED
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const EmployeeDashboard = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 md:p-6 lg:p-10 flex flex-col gap-10 max-w-[1600px] mx-auto"
    >

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black text-blue-600 dark:text-blue-300 uppercase tracking-[0.2em] bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">Workspace Overview</span>
          </div>
          <h1 className="text-4xl font-black text-slate-950 dark:text-slate-50 tracking-tightest">Employee Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-base mt-2 max-w-lg leading-relaxed">
            Welcome back! Here's an analytical breakdown of your active projects and task commitments.
          </p>
        </motion.div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {employeeStats.map((stat, i) => ( stat &&
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">

            {/* Donut Chart: Productivity Analytics (Admin Format) */}
            <GlassCard className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-50 text-lg uppercase tracking-tight">Focus Score</h3>
                  <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Personal productivity distribution</p>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-100/50 dark:border-blue-900/50 shadow-sm">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>

              <div className="h-[280px] w-full relative flex items-center justify-center mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={105}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={4}
                    >
                      {taskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Inner Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-black text-slate-950 dark:text-slate-50 tracking-tighter">48</span>
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Impact</span>
                </div>
              </div>

              <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mt-8">
                {taskDistribution.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-tight">{item.name}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Bar Chart: Resource Utilization */}
            <GlassCard className="p-8">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">Task Density</h3>
                  <p className="text-xs font-bold text-slate-400">Load across active projects</p>
                </div>
                <div className="p-2 rounded-lg bg-violet-50 text-violet-600">
                  <Layers className="w-4 h-4" />
                </div>
              </div>

              <div className="h-[280px] w-full mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={myProjects.map(p => ({ name: p.id, tasks: p.tasks }))}>
                    <defs>
                      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 10, fontWeight: 900, fill: 'currentColor' }}
                      className="text-slate-400 dark:text-slate-600"
                      axisLine={false}
                      tickLine={false}
                      tickMargin={12}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fontWeight: 900, fill: 'currentColor' }}
                      className="text-slate-400 dark:text-slate-600"
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(59, 130, 246, 0.03)' }}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '12px', backgroundColor: 'var(--card)' }}
                    />
                    <Bar dataKey="tasks" fill="url(#barGrad)" radius={[8, 8, 0, 0]} barSize={26} style={{ filter: 'drop-shadow(0 4px 6px rgba(37, 99, 235, 0.2))' }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>

          {/* Active Work Deck */}
          <GlassCard className="p-0 overflow-hidden">
            <AppCard.Header className="p-8 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/60">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-slate-50 text-xl tracking-tight">Active Work Deck</h3>
                <p className="text-sm font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-widest">Personal Queue Management</p>
              </div>
              <AppButton
                variant="ghost"
                size="sm"
                className="text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 border border-blue-50 dark:border-blue-900/50 hover:bg-slate-50 dark:hover:bg-slate-700 font-black px-6 rounded-xl transition-all shadow-sm h-11"
              >
                Expand Deck
              </AppButton>
            </AppCard.Header>
            <div className="p-8 flex flex-col gap-5">
              {myTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-6 p-5 bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl hover:bg-slate-50/50 dark:hover:bg-slate-800/40 hover:border-blue-100 dark:hover:border-blue-900/50 transition-all group relative">
                  <div className={cn("shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm",
                    task.status === 'Pending' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 ring-4 ring-blue-50 dark:ring-blue-950/20' : 'bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 ring-4 ring-sky-50 dark:ring-sky-950/20'
                  )}>
                    {task.status === 'Pending' ? <AlertCircle className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-3">
                      <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-base truncate tracking-tight">{task.title}</h4>
                      <span className={cn("text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-[0.1em] shadow-sm",
                        task.priority === 'High' ? 'bg-blue-800 text-white' : 'bg-blue-500 text-white'
                      )}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-2">
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-md">
                        <Briefcase className="w-3 h-3 text-slate-400" /> <span className="text-slate-600 dark:text-slate-400">{task.project}</span>
                      </span>
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-md">
                        <Calendar className="w-3 h-3 text-slate-400" /> <span className="text-slate-600 dark:text-slate-400">Target: {task.deadline}</span>
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                    <AppButton
                      size="sm"
                      variant="outline"
                      className="h-10 px-8 border-blue-100 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-500 hover:text-white dark:hover:text-white hover:border-blue-500 font-black rounded-xl transition-all shadow-sm"
                    >
                      Complete Task
                    </AppButton>
                    <ChevronRight className="w-6 h-6 text-slate-300 dark:text-slate-700 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-10">
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-black text-slate-950 dark:text-slate-50 tracking-tightest uppercase">My Portfolio</h3>
              <span className="text-[10px] font-black text-blue-600 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-900/40 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-blue-100 dark:border-blue-900/50 shadow-sm">2 RECENT</span>
            </div>
            <div className="flex flex-col gap-6">
              {myProjects.slice(0, 2).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}

              <div className="flex justify-end mt-1">
                <Link href="/pipeline-projects" className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50/50 dark:bg-blue-900/40 hover:bg-blue-100/50 dark:hover:bg-blue-800/40 border border-blue-100/50 dark:border-blue-800/50 transition-all duration-300">
                  <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.15em]">View All Projects</span>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Next Milestone */}
            <GlassCard className="p-6 mt-6 border-blue-100/50 dark:border-blue-900/50 shadow-blue-500/5 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.2em]">Next Milestone</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50 shadow-sm transition-all group-hover:scale-105">
                  <Clock className="w-3 h-3" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Upcoming</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-sky-600 rounded-2xl shadow-lg shrink-0 transition-transform group-hover:scale-110">
                  <span className="text-[9px] font-black text-white/80 uppercase tracking-tighter leading-none mb-0.5">Apr</span>
                  <span className="text-xl font-black text-white leading-none">02</span>
                </div>
                <div className="min-w-0">
                  <h5 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm truncate uppercase tracking-tight group-hover:text-blue-600 transition-colors">Alpha Quality Audit</h5>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1 truncate uppercase tracking-wide">Project Review Phase 04</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Achievement Card */}
          <GlassCard className="bg-gradient-to-br from-blue-700 via-blue-600 to-sky-800 border-none p-0 relative group dark:border dark:border-white/5">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
            <div className="p-8 relative">
              <LayoutDashboard className="absolute -right-10 -bottom-10 w-44 h-44 opacity-10 rotate-12 text-white pointer-events-none group-hover:rotate-45 transition-transform duration-700" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-lg flex items-center justify-center mb-6 border border-white/20 shadow-xl">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-black text-white text-2xl tracking-tight mb-3">Excellent Work!</h4>
              <p className="text-blue-100 dark:text-blue-200 text-sm font-bold leading-relaxed mb-8 opacity-90">
                You've been doing a great job lately! You are <span className="text-white">15.4%</span> ahead of your project targets. See the full details of your progress below.
              </p>
              <AppButton
                variant="secondary"
                className="bg-white dark:bg-slate-50 text-blue-700 hover:bg-slate-50 border-none w-full font-black shadow-2xl hover:shadow-blue-500/40 transform transition-all active:scale-[0.98] h-14 rounded-2xl group-hover:scale-[1.02]"
              >
                View My Progress
              </AppButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
};
