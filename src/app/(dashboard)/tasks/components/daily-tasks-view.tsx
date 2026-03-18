'use client';

import { useState } from 'react';
import { AppCard } from '@/components/common/app-card';
import { FilterBar } from '@/components/common/filter-bar';
import { NonFormTextInput } from '@/components/common/non-form-text-input';
import { AppSelect } from '@/components/common/app-select';
import { AppButton } from '@/components/common/app-button';
import { DataTable, Column } from '@/components/common/data-table';
import { Plus, Check, Play, Edit3, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function DailyTasksView() {
  const [search, setSearch] = useState('');

  // Dummy Data
  const DUMMY_DATA = Array.from({ length: 5 }).map((_, i) => ({
    id: `dt-${i}`,
    projectNo: '---',
    activity: 'Tally Entries',
    description: 'BANK STATEMENT 1. KDPL - ICICI 2. KMK - BOB 3. KMK - DNSB 4. MRK - DNSB 5. KMK - IDFC 6. MRK - ICICI',
    assigned: { to: 'Gaurav Bhatle', toDate: '18/02/2026 15:28', by: 'Neha U.' },
    dueDate: `05/${String(i + 8).padStart(2, '0')}/2026`,
    status: 'Open' as 'Open' | 'In Progress' | 'Done',
  }));

  const columns: Column<typeof DUMMY_DATA[0]>[] = [
    {
      key: 'activity',
      header: 'Activity',
      accessor: (r) => (
        <div className="flex flex-col gap-1 min-w-[250px]">
          <span className="font-bold text-slate-800 text-sm">{r.activity}</span>
          <span className="text-xs text-slate-500 leading-snug">{r.description}</span>
        </div>
      ),
    },
    {
      key: 'assignment',
      header: 'Assignment',
      accessor: (r) => (
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-1.5 p-1 rounded-md bg-slate-50 w-max border border-slate-100">
            <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-[10px]">GB</div>
            <span className="font-semibold text-slate-700">{r.assigned.to}</span>
          </div>
          <span className="text-muted-foreground ml-1">By: {r.assigned.by}</span>
        </div>
      ),
    },
    {
      key: 'dates',
      header: 'Timeline',
      accessor: (r) => (
        <div className="flex flex-col gap-0.5 text-xs">
          <span className="text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded w-max">Due: {r.dueDate}</span>
          <span className="text-slate-500 font-medium px-2 py-0.5">Assigned: {r.assigned.toDate.split(' ')[0]}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (r) => (
        <span className={cn(
          "px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm flex w-max items-center gap-1.5",
          r.status === 'Open' ? "bg-indigo-500" :
          r.status === 'Done' ? "bg-emerald-500" : "bg-amber-500"
        )}>
          {r.status === 'Open' && <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />}
          {r.status === 'In Progress' && <Play className="w-3 h-3 fill-white" />}
          {r.status === 'Done' && <Check className="w-3 h-3 stroke-[3]" />}
          {r.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      accessor: () => (
        <div className="flex gap-2 items-center opacity-80 hover:opacity-100 transition-opacity">
          <AppButton size="sm" variant="outline" className="h-8 px-3 text-xs font-bold shrink-0 border-indigo-200 text-indigo-700 hover:bg-indigo-50">
            Progress
          </AppButton>
          <button className="h-8 w-8 rounded-md bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 flex items-center justify-center text-slate-600 shadow-sm transition-colors">
            <Edit3 className="w-4 h-4" />
          </button>
          <button className="h-8 w-8 rounded-md bg-white border border-slate-200 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center text-slate-600 shadow-sm transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6 w-full">
      <AppCard className="overflow-visible shadow-sm border border-slate-200/60 bg-white/60 backdrop-blur-xl">
        <AppCard.Header className="flex flex-row justify-between items-center pb-2 border-b border-slate-100 bg-white/40">
          <div>
            <AppCard.Title className="text-xl font-extrabold text-slate-800">My Daily Tasks</AppCard.Title>
            <AppCard.Description className="text-slate-500">Manage and update your daily operational checklist.</AppCard.Description>
          </div>
          <AppButton className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-200 h-10 px-5 rounded-xl transition-all hover:scale-[1.02] active:scale-95">
            <Plus className="w-4 h-4 mr-2" strokeWidth={3} />
            New Task
          </AppButton>
        </AppCard.Header>
        
        <AppCard.Content className="pt-6">
          <FilterBar>
            <div className="flex gap-3 flex-wrap items-center w-full bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <NonFormTextInput
                placeholder="Search activities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                containerClassName="flex-none w-64"
                className="bg-slate-50 border-none focus-visible:ring-indigo-500"
              />
              <AppSelect value="" onValueChange={() => {}} placeholder="Status" className="w-40 bg-slate-50 border-none">
                <AppSelect.Item value="Open">Open</AppSelect.Item>
                <AppSelect.Item value="In Progress">In Progress</AppSelect.Item>
                <AppSelect.Item value="Done">Done</AppSelect.Item>
              </AppSelect>
            </div>
          </FilterBar>

          <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
            <DataTable
              columns={columns}
              data={DUMMY_DATA}
              className="bg-white"
            />
          </div>
        </AppCard.Content>
      </AppCard>
    </motion.div>
  );
}
