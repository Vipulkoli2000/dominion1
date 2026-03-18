'use client';

import { useState } from 'react';
import { FilterBar } from '@/components/common/filter-bar';
import { AppCard } from '@/components/common/app-card';
import { AppButton } from '@/components/common/app-button';
import { DataTable, Column } from '@/components/common/data-table';
import { NonFormTextInput } from '@/components/common/non-form-text-input';
import { AppSelect } from '@/components/common/app-select';
import { Edit2 } from 'lucide-react';
import Link from 'next/link';

// Types
type ProjectItem = {
  id: string;
  projectNo: string;
  projectDate: string;
  siteName: string;
  client: string;
  totalTasks: number;
  assignedTasks: number;
  completedTasks: number;
};

// Dummy Data
const DUMMY_DATA: ProjectItem[] = [
  {
    id: "1",
    projectNo: "P2022-23/00034",
    projectDate: "04/12/2021",
    siteName: "B-42,",
    client: "Mediair Healthcare Products Pvt Ltd",
    totalTasks: 15,
    assignedTasks: 1,
    completedTasks: 14,
  },
  {
    id: "2",
    projectNo: "P00049",
    projectDate: "23/08/2022",
    siteName: "B-62, Thane Wagle Industrial Area,",
    client: "Alpha Pharma Healthcare Pvt. Ltd.",
    totalTasks: 15,
    assignedTasks: 0,
    completedTasks: 14,
  },
  {
    id: "3",
    projectNo: "P00153",
    projectDate: "13/08/2025",
    siteName: "B-62, Thane Wagle Industrial Area,",
    client: "Alpha Pharma Healthcare Pvt. Ltd.",
    totalTasks: 14,
    assignedTasks: 0,
    completedTasks: 13,
  },
  {
    id: "4",
    projectNo: "P00076",
    projectDate: "17/04/2023",
    siteName: "Plot No.: 205 W.U.B.",
    client: "Belchem Industries (India) Pvt. Ltd.",
    totalTasks: 14,
    assignedTasks: 0,
    completedTasks: 9,
  },
  {
    id: "5",
    projectNo: "P00057",
    projectDate: "15/11/2022",
    siteName: "Plot No. A-34/1, Badlapur Industrial Area",
    client: "Ambernath Organics Pvt Ltd",
    totalTasks: 14,
    assignedTasks: 1,
    completedTasks: 13,
  },
  {
    id: "6",
    projectNo: "P00079",
    projectDate: "22/05/2023",
    siteName: "D-124, TTC Industrial Area, Nerul",
    client: "Sandu Brothers Pvt Ltd",
    totalTasks: 18,
    assignedTasks: 0,
    completedTasks: 9,
  }
];

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [client, setClient] = useState('');

  const columns: Column<ProjectItem>[] = [
    {
      key: 'projectNo',
      header: 'Project No',
      accessor: (r) => <span className="font-semibold text-slate-700">{r.projectNo}</span>,
    },
    {
      key: 'projectDate',
      header: 'Project Date',
      accessor: (r) => <span className="text-blue-600 font-semibold text-sm whitespace-nowrap">{r.projectDate}</span>,
    },
    {
      key: 'siteName',
      header: 'Site Name',
      accessor: (r) => <span className="text-sm text-slate-600">{r.siteName}</span>,
    },
    {
      key: 'client',
      header: 'Client',
      accessor: (r) => <span className="text-sm font-medium text-slate-800">{r.client}</span>,
    },
    {
      key: 'totalTasks',
      header: 'Total Tasks',
      accessor: (r) => r.totalTasks,
      className: 'text-center',
      cellClassName: 'text-center font-bold text-slate-700',
    },
    {
      key: 'assignedTasks',
      header: 'Assigned Tasks',
      accessor: (r) => r.assignedTasks,
      className: 'text-center',
      cellClassName: 'text-center font-bold text-slate-700',
    },
    {
      key: 'completedTasks',
      header: 'Completed Tasks',
      accessor: (r) => r.completedTasks,
      className: 'text-center',
      cellClassName: 'text-center font-bold text-slate-700',
    },
    {
      key: 'actions',
      header: 'Actions',
      accessor: (r) => (
        <div className="flex flex-col gap-1.5 min-w-[130px]">
          <div className="flex">
            <AppButton size="sm" className="h-7 px-3 text-[11px] bg-emerald-500 hover:bg-emerald-600 text-white font-bold tracking-wide rounded-r-none border-r border-emerald-600 shadow-sm w-full">
              Tasks
            </AppButton>
            <button className="h-7 w-8 bg-emerald-500 hover:bg-emerald-600 rounded-r flex items-center justify-center text-white transition-colors shadow-sm shrink-0">
              <Edit2 className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
          </div>
          <AppButton size="sm" className="h-7 px-3 text-[11px] bg-emerald-500 hover:bg-emerald-600 text-white font-bold tracking-wide shadow-sm w-full">
            Responsibility Sheet
          </AppButton>
        </div>
      ),
    },
  ];

  function handleSearch() {}
  function handleReset() {
    setSearch('');
    setClient('');
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in zoom-in-95 duration-200">
      <AppCard className="border-t-4 border-t-primary shadow-md overflow-hidden bg-white/50 backdrop-blur-sm">
        <AppCard.Header>
          <AppCard.Title className="text-lg font-bold text-slate-800">Projects</AppCard.Title>
        </AppCard.Header>
        <AppCard.Content>
          <FilterBar title="Filters" hideTitle>
            <div className="flex gap-2 flex-wrap items-center w-full bg-slate-50 p-2 rounded-md border border-slate-100">
              <NonFormTextInput
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                containerClassName="flex-none w-64 bg-white"
              />
              <AppSelect
                value={client || '__all'}
                onValueChange={(v) => setClient(v === '__all' ? '' : v)}
                placeholder="Please Select Clients"
                className="w-72 bg-white"
              >
                <AppSelect.Item value="__all">Please Select Clients</AppSelect.Item>
                <AppSelect.Item value="Mediair">Mediair Healthcare Products</AppSelect.Item>
                <AppSelect.Item value="Alpha">Alpha Pharma</AppSelect.Item>
              </AppSelect>
              <div className="flex gap-2 ml-4">
                <AppButton onClick={handleSearch} className="px-6 bg-blue-600 hover:bg-blue-700 shadow-sm transition-all duration-200">
                  Search
                </AppButton>
                <AppButton onClick={handleReset} variant="outline" className="px-6 bg-teal-400 text-white hover:bg-teal-500 border-0 shadow-sm transition-all duration-200">
                  Reset
                </AppButton>
              </div>
            </div>
          </FilterBar>
          
          <div className="mt-4 border rounded-md shadow-sm overflow-hidden border-slate-200">
            <DataTable
              columns={columns}
              data={DUMMY_DATA}
              className="bg-white"
            />
          </div>
        </AppCard.Content>
      </AppCard>
    </div>
  );
}
