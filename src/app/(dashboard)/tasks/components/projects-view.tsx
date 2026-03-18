'use client';

import { AppCard } from '@/components/common/app-card';
import { FilterBar } from '@/components/common/filter-bar';
import { NonFormTextInput } from '@/components/common/non-form-text-input';
import { AppSelect } from '@/components/common/app-select';
import { DataTable, Column } from '@/components/common/data-table';
import { AppButton } from '@/components/common/app-button';
import { ChevronRight, ExternalLink, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProjectsView() {
  const DUMMY_DATA = [
    { projectNo: "P2022-23/00034", siteName: "B-42, Mediair Healthcare", client: "Mediair Products", total: 15, assign: 1, comp: 14 },
    { projectNo: "P00049", siteName: "B-62, Thane Wagle Industrial", client: "Alpha Pharma", total: 15, assign: 0, comp: 14 },
    { projectNo: "P00153", siteName: "Plot No. J-5", client: "Indo Amines", total: 14, assign: 0, comp: 13 },
  ];

  const columns: Column<typeof DUMMY_DATA[0]>[] = [
    {
      key: 'project',
      header: 'Project Details',
      accessor: (r) => (
        <div className="flex flex-col gap-1">
          <span className="font-extrabold text-indigo-900 text-sm hover:underline cursor-pointer flex items-center gap-1 w-max">
            {r.projectNo} <ExternalLink className="w-3 h-3 text-indigo-400" />
          </span>
          <span className="text-slate-600 text-xs font-medium">{r.siteName}</span>
          <span className="text-slate-400 text-[11px]">{r.client}</span>
        </div>
      ),
    },
    {
      key: 'progress',
      header: 'Task Progress',
      accessor: (r) => {
        const percent = Math.round((r.comp / r.total) * 100);
        return (
          <div className="flex flex-col gap-2 w-48">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-emerald-600">{percent}% Complete</span>
              <span className="text-slate-400">{r.comp} / {r.total}</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${percent}%` }} />
            </div>
            {r.assign > 0 && <span className="text-[10px] text-amber-600 font-semibold bg-amber-50 px-1.5 py-0.5 rounded w-max">{r.assign} Unassigned</span>}
          </div>
        )
      },
    },
    {
      key: 'actions',
      header: '',
      accessor: () => (
        <div className="flex justify-end gap-2 pr-4">
          <AppButton size="sm" variant="outline" className="h-8 shadow-sm font-bold text-xs bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50">
            Responsibility Sheet
          </AppButton>
          <AppButton size="sm" className="h-8 shadow-sm font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4">
            View Tasks <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </AppButton>
        </div>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6 w-full">
      <AppCard className="overflow-visible shadow-sm border border-slate-200/60 bg-white/60 backdrop-blur-xl">
        <AppCard.Header className="flex flex-row justify-between items-center pb-2 border-b border-slate-100 bg-white/40">
          <div>
            <AppCard.Title className="text-xl font-extrabold text-slate-800">Project Tasks Overview</AppCard.Title>
            <AppCard.Description className="text-slate-500">High-level task completion statuses across active sites.</AppCard.Description>
          </div>
          <AppButton className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-200 h-10 px-5 rounded-xl transition-all hover:scale-[1.02] active:scale-95">
            <Plus className="w-4 h-4 mr-2" strokeWidth={3} />
            New Project
          </AppButton>
        </AppCard.Header>

        <AppCard.Content className="pt-6">
          <FilterBar>
            <div className="flex gap-3 flex-wrap items-center w-full bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <NonFormTextInput
                placeholder="Search projects..."
                value=""
                onChange={() => {}}
                containerClassName="flex-none w-64"
                className="bg-slate-50 border-none focus-visible:ring-indigo-500"
              />
              <AppSelect value="" onValueChange={() => {}} placeholder="Client" className="w-48 bg-slate-50 border-none">
                <AppSelect.Item value="all">All Clients</AppSelect.Item>
                <AppSelect.Item value="mediair">Mediair Products</AppSelect.Item>
                <AppSelect.Item value="alpha">Alpha Pharma</AppSelect.Item>
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
