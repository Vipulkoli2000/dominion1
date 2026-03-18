'use client';

import React from 'react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  IndianRupee, Briefcase, FileText, CheckSquare,
  ArrowUpRight, ArrowDownRight, Clock, Plus, ChevronRight, CheckCircle2
} from 'lucide-react';
import { AppCard } from '../common/app-card';
import { AppButton } from '../common/app-button';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
  { name: 'Completed', value: 3832, color: 'var(--chart-1)' },
  { name: 'Open', value: 127, color: 'var(--chart-2)' },
  { name: 'In Progress', value: 77, color: 'var(--chart-3)' },
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

const KPIStatCard = ({ title, value, trend, trendValue, icon: Icon }: any) => (
  <AppCard>
    <div className="p-6 flex flex-col justify-between h-full gap-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        </div>
        <div className="p-2.5 rounded-md bg-primary/10 text-primary">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-medium flex items-center gap-0.5 ${trend === 'up' ? 'text-emerald-600' : 'text-destructive'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trendValue}
        </span>
        <span className="text-xs text-muted-foreground font-medium">vs last month</span>
      </div>
    </div>
  </AppCard>
);

const SectionHeading = ({ title, description }: { title: string, description?: string }) => (
  <div className="mb-6 space-y-1">
    <h2 className="text-lg font-semibold text-foreground tracking-tight">{title}</h2>
    {description && <p className="text-sm tracking-tight text-muted-foreground">{description}</p>}
  </div>
);

// --- Main Layout ---

export const DashboardCharts = () => {
  return (
    <div className="min-h-screen w-full p-4 md:p-6 lg:p-8 flex flex-col gap-6 lg:gap-8 mx-auto xl:max-w-[1700px] animate-in fade-in duration-500">

      {/* 1. KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <KPIStatCard
          title="Total Quotation Value"
          value="₹47.4m"
          trend="up"
          trendValue="12.5%"
          icon={IndianRupee}
        />
        <KPIStatCard
          title="Active Projects"
          value="24"
          trend="up"
          trendValue="8.2%"
          icon={Briefcase}
        />
        <KPIStatCard
          title="Open Invoices"
          value="95"
          trend="down"
          trendValue="3.1%"
          icon={FileText}
        />
        <KPIStatCard
          title="Pending Tasks"
          value="204"
          trend="up"
          trendValue="5.4%"
          icon={CheckSquare}
        />
      </div>

      {/* 2. Middle Row: Tasks & Statuses (50/50 Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">

        {/* Daily Tasks Widget */}
        <AppCard className="flex flex-col">
          <AppCard.Content className="p-6 flex-grow flex flex-col">
            <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 mb-4">
              <SectionHeading title="Daily Focus" description="Core priorities for today" />
              <AppButton size="sm" iconName="Plus" className="w-full md:w-auto">
                New Action
              </AppButton>
            </div>
            <div className="flex flex-col gap-3 flex-grow mt-2">
              {dailyTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-center gap-4 p-3.5 bg-muted/30 border border-border/50 rounded-lg transition-colors hover:bg-muted/70 cursor-pointer group"
                >
                  <div className="flex flex-col gap-1 flex-grow overflow-hidden">
                    <h4 className="font-semibold text-sm text-foreground truncate">{task.title}</h4>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className={`text-xs font-medium ${task.overdue ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {task.time}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
            <AppButton asChild variant="outline" className="w-full h-10 text-sm font-medium text-foreground mt-6">
              <Link href="/tasks">
                Explore All Tasks <ChevronRight className="w-4 h-4 ml-1.5 opacity-70" />
              </Link>
            </AppButton>
          </AppCard.Content>
        </AppCard>

        {/* Task Distribution Donut */}
        <AppCard className="flex flex-col">
          <AppCard.Content className="p-6 flex-grow flex flex-col">
            <SectionHeading title="Live Distribution" description="System-wide health status" />
            <div className="flex-grow flex items-center justify-center relative min-h-[300px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={105}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={4}
                  >
                    {taskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '13px' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Inner Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-foreground">4.0k</span>
                <span className="text-xs font-medium text-muted-foreground tracking-wide mt-1">Operations</span>
              </div>
            </div>
            {/* Custom Legend */}
            <div className="flex justify-center gap-6 mt-6">
              {taskData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </AppCard.Content>
        </AppCard>

      </div>

      {/* 3. Lower Row: Projects & Performance (1:2 Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

        {/* Active Projects Widget */}
        <AppCard className="lg:col-span-1 flex flex-col">
          <AppCard.Content className="p-6 flex-grow">
            <div className="flex justify-between items-center mb-6">
              <SectionHeading title="Active Projects" description="High priority sites" />
              <AppButton variant="ghost" size="sm" className="h-8 px-2 text-xs -mt-5">
                View All
              </AppButton>
            </div>
            <div className="flex flex-col gap-4">
              {recentProjects.map((proj) => (
                <div key={proj.id} className="flex flex-col gap-3 p-3.5 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/70 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center gap-2">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm text-foreground truncate">{proj.no}</h4>
                      <p className="text-xs text-muted-foreground truncate">{proj.client}</p>
                    </div>
                    <span className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-md ${
                      proj.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                      proj.status === 'Warning' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-primary/10 text-primary'
                      }`}>
                      {proj.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-grow h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${proj.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`} style={{ width: `${proj.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground w-8 text-right">{proj.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </AppCard.Content>
        </AppCard>

        {/* Performance Area Chart */}
        <AppCard className="lg:col-span-2">
          <AppCard.Content className="p-6">
            <SectionHeading title="Performance Metrics" description="Quotations vs Invoices trends" />
            <div className="h-[340px] w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorQuots" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorInvs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickMargin={10} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '13px' }}
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="quotations" name="Quotations Issued" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorQuots)" />
                  <Area type="monotone" dataKey="invoices" name="Invoices Paid" stroke="var(--chart-1)" strokeWidth={2} fillOpacity={1} fill="url(#colorInvs)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AppCard.Content>
        </AppCard>

      </div>

      {/* 4. Bottom Row: Valuations & Activity (3 Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">

        {/* Valuation Bar Chart (Spans 2/4) */}
        <AppCard className="lg:col-span-2">
          <AppCard.Content className="p-6">
            <SectionHeading title="Monthly Valuation" description="Global revenue (₹)" />
            <div className="h-[280px] w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={valuationData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={0} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickMargin={10} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(val: number) => `₹ ${(val / 100000).toFixed(1)}L`}
                    cursor={{ fill: 'var(--muted)' }}
                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '13px' }}
                  />
                  <Bar dataKey="amount" fill="var(--primary)" radius={[4, 4, 0, 0]}>
                    {valuationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fillOpacity={index === 5 ? 1 : 0.4} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AppCard.Content>
        </AppCard>

        {/* Recent Activity Widget (Spans 1/4) */}
        <AppCard className="lg:col-span-1">
          <AppCard.Content className="p-6">
            <SectionHeading title="Activity" description="Latest events" />
            <div className="flex flex-col gap-4 mt-4">
              {recentActivity.map((act) => (
                <div key={act.id} className="flex gap-3 items-start group">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                    <span className="text-[10px] font-semibold">{act.user}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      <span className="text-muted-foreground font-normal">{act.action}</span> {act.target}
                    </p>
                    <span className="text-[10px] text-muted-foreground">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </AppCard.Content>
        </AppCard>

        {/* Expiring Soon Widget (Spans 1/4) */}
        <AppCard className="lg:col-span-1">
          <AppCard.Content className="p-6">
            <SectionHeading title="Expiring Soon" description="Priority action items" />
            <div className="flex flex-col gap-3 mt-4">
              {expiringSoon.map((exp) => (
                <div key={exp.id} className="p-3.5 rounded-lg border bg-muted/30 hover:bg-muted/70 flex justify-between items-start gap-2 transition-colors">
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <h4 className="text-xs font-semibold text-foreground truncate">{exp.title}</h4>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] font-medium text-muted-foreground">{exp.date}</span>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full shrink-0 mt-1 ${exp.urgency === 'high' ? 'bg-destructive' : 'bg-amber-500'}`} />
                </div>
              ))}
            </div>
          </AppCard.Content>
        </AppCard>

      </div>
    </div>
  );
};
