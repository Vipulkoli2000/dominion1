'use client';

import { AppCard } from '@/components/common/app-card';
import { FilterBar } from '@/components/common/filter-bar';
import { NonFormTextInput } from '@/components/common/non-form-text-input';
import { AppSelect } from '@/components/common/app-select';
import { DataTable, Column } from '@/components/common/data-table';
import { motion } from 'framer-motion';
import { CheckCircle2, CircleDashed } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StagesView() {
  const DUMMY_DATA = [
    { project: "P2022-23/00034", task: "Construction Stage - Completion of 20 % of work", assignedTo: "En. Pankaj", targetDate: "01/08/2024", status: "Completed" },
    { project: "P00176", task: "Site Visit Charges", assignedTo: "Prasad Date", targetDate: "11/04/2026", status: "In Progress" },
  ];

  const columns: Column<typeof DUMMY_DATA[0]>[] = [
    {
      key: 'project',
      header: 'Project / Stage',
      accessor: (r) => (
        <div className="flex flex-col gap-1">
          <span className="font-bold text-slate-800 text-sm">{r.project}</span>
          <span className="text-xs text-slate-500 max-w-[250px] leading-snug">{r.task}</span>
        </div>
      ),
    },
    {
      key: 'assignment',
      header: 'Responsibility',
      accessor: (r) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-slate-600">
            {r.assignedTo.substring(0,2).toUpperCase()}
          </div>
          <span className="font-semibold text-slate-700 text-xs">{r.assignedTo}</span>
        </div>
      ),
    },
    {
      key: 'target',
      header: 'Target Date',
      accessor: (r) => <span className="text-slate-700 font-semibold text-xs whitespace-nowrap bg-slate-100 px-2 py-1 rounded">{r.targetDate}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (r) => (
        <span className={cn(
          "px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm flex w-max items-center gap-1.5",
          r.status === 'Completed' ? "bg-emerald-100 text-emerald-700 border border-emerald-200" :
          "bg-amber-100 text-amber-700 border border-amber-200"
        )}>
          {r.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <CircleDashed className="w-3.5 h-3.5" />}
          {r.status}
        </span>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6 w-full">
      <AppCard className="overflow-visible shadow-sm border border-slate-200/60 bg-white/60 backdrop-blur-xl">
        <AppCard.Header className="flex flex-row justify-between items-center pb-2 border-b border-slate-100 bg-white/40">
          <div>
            <AppCard.Title className="text-xl font-extrabold text-slate-800">Project Stages Tracking</AppCard.Title>
            <AppCard.Description className="text-slate-500">Track granular milestones and responsibilities.</AppCard.Description>
          </div>
        </AppCard.Header>
        
        <AppCard.Content className="pt-6">
          <FilterBar>
            <div className="flex gap-3 flex-wrap items-center w-full bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <NonFormTextInput
                placeholder="Search stages..."
                value=""
                onChange={() => {}}
                containerClassName="flex-none w-64"
                className="bg-slate-50 border-none focus-visible:ring-indigo-500"
              />
              <AppSelect value="" onValueChange={() => {}} placeholder="Status" className="w-48 bg-slate-50 border-none">
                <AppSelect.Item value="all">All Statuses</AppSelect.Item>
                <AppSelect.Item value="completed">Completed</AppSelect.Item>
                <AppSelect.Item value="progress">In Progress</AppSelect.Item>
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
