'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AppCard } from '@/components/common/app-card';
import {
  LayoutDashboard,
  CheckSquare,
  Briefcase,
  Layers,
  BarChart2,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle
} from 'lucide-react';
import { DailyTasksView } from './components/daily-tasks-view';
import { ProjectsView } from './components/projects-view';
import { StagesView } from './components/stages-view';

type TabId = 'overview' | 'daily' | 'projects' | 'stages';

export default function TasksHubPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'daily', label: 'My Daily Tasks', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'stages', label: 'Stages', icon: <Layers className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto min-h-[calc(100vh-8rem)]">
      {/* Header Section */}
      <div className="flex flex-col gap-2 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
          Task Hub
          <span className="flex h-6 items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 shadow-sm border border-emerald-200">
            Live
          </span>
        </h1>
        <p className="text-muted-foreground text-sm max-w-xl">
          Your centralized command center for monitoring daily activities, project progression, and stage milestones.
        </p>
      </div>

      {/* Advanced Navigation Tabs */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md pt-3 pb-3 px-1 w-full border-b border-slate-200 mb-6">
        <div className="flex p-1 w-fit bg-slate-100 rounded-lg border border-slate-200/50 shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-6 py-2 text-[13px] font-bold rounded-md transition-all duration-300 ease-in-out select-none",
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-white rounded-md shadow-sm border border-slate-200/60"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative mt-2 flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full h-full"
          >
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'daily' && <DailyTasksView />}
            {activeTab === 'projects' && <ProjectsView />}
            {activeTab === 'stages' && <StagesView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Overview Tab Implementation
// ----------------------------------------------------------------------

function OverviewTab() {
  const stats = [
    { title: 'Total Tasks', value: '4,062', trend: '+12%', color: 'border-blue-500', bg: 'bg-blue-600', icon: BarChart2 },
    { title: 'Open', value: '127', trend: '-2%', color: 'border-teal-400', bg: 'bg-teal-400', icon: Circle },
    { title: 'In Progress', value: '77', trend: '+5%', color: 'border-amber-500', bg: 'bg-amber-500', icon: Clock },
    { title: 'Completed', value: '3,832', trend: '+18%', color: 'border-emerald-500', bg: 'bg-emerald-500', icon: CheckCircle2 },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <AppCard className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow group relative">
                {/* Subtle border accent */}
                <div className={cn("absolute left-0 top-0 bottom-0 w-1", s.bg)} />
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className={cn("p-2.5 rounded-lg text-white shadow-inner flex items-center justify-center", s.bg)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={cn(
                      "text-xs font-bold px-2 py-1 rounded-full",
                      s.trend.startsWith('+') ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                    )}>
                      {s.trend}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">{s.title}</p>
                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{s.value}</h3>
                  </div>
                </div>
              </AppCard>
            </motion.div>
          );
        })}
      </div>

      {/* Info Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AppCard className="lg:col-span-2 shadow-sm border-slate-200">
          <AppCard.Header className="border-b bg-slate-50/50 block">
            <AppCard.Title className="text-lg">Recent Priorities</AppCard.Title>
            <AppCard.Description>Tasks needing immediate attention.</AppCard.Description>
          </AppCard.Header>
          <div className="p-0">
            <ul className="divide-y divide-slate-100">
              {[1, 2, 3].map((_, i) => (
                <li key={i} className="flex items-start gap-4 p-5 hover:bg-slate-50/80 transition-colors">
                  <div className="mt-0.5 p-2 rounded-full bg-amber-100 text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-semibold text-slate-800 line-clamp-1">Bank Reconciliation - DNSB & ICICI</p>
                      <span className="text-xs font-bold px-2 py-0.5 bg-rose-100 text-rose-700 rounded whitespace-nowrap">Due Today</span>
                    </div>
                    <p className="text-sm text-slate-500">Project: --- | Assigned to: Gaurav Bhatle</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </AppCard>

        <AppCard className="shadow-sm border-slate-200">
          <AppCard.Header className="border-b bg-slate-50/50 block">
             <AppCard.Title className="text-lg">Upcoming Dates</AppCard.Title>
             <AppCard.Description>Milestones for this week.</AppCard.Description>
          </AppCard.Header>
          <div className="p-5 flex flex-col gap-5">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center justify-center bg-slate-100 rounded-lg w-12 h-12 border border-slate-200 shrink-0">
                  <span className="text-xs font-bold text-slate-500 uppercase">MAR</span>
                  <span className="text-lg font-extrabold text-slate-800 leading-none">1{i + 1}</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-semibold text-sm text-slate-800">Site Visit - Plot No. J-5</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Calendar className="w-3 h-3"/> Indo Amines Limited</p>
                </div>
              </div>
            ))}
          </div>
        </AppCard>
      </div>
    </div>
  );
}
