'use client';

import { useState } from 'react';
import { FilterBar } from '@/components/common/filter-bar';
import { AppCard } from '@/components/common/app-card';
import { AppButton } from '@/components/common/app-button';
import { DataTable, Column } from '@/components/common/data-table';
import { NonFormTextInput } from '@/components/common/non-form-text-input';
import { AppSelect } from '@/components/common/app-select';
import { EditButton, DeleteButton } from '@/components/common/icon-button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Types
type DailyTaskItem = {
  id: string;
  projectNo: string;
  activity: string;
  description: string;
  assigned: { to: string; toDate: string; by: string; byDate: string };
  dueDate: string;
  duration: string;
  doneDate: string;
  status: 'Open' | 'In Progress' | 'Done';
  remarks: string;
};

// Dummy Data
const DUMMY_DATA: DailyTaskItem[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `dt-${i}`,
  projectNo: '---',
  activity: 'Tally Entries',
  description: 'BANK STATEMENT 1. KDPL - ICICI 2. KMK - BOB 3. KMK - DNSB 4. MRK - DNSB 5. KMK - IDFC 6. MRK - ICICI',
  assigned: {
    to: 'Gaurav Bhatle',
    toDate: '18/02/2026 15:28',
    by: 'Gaurav Bhatle',
    byDate: '',
  },
  dueDate: `05/${String(i + 8).padStart(2, '0')}/2026`,
  duration: '0',
  doneDate: '',
  status: 'Open',
  remarks: '',
}));

export default function DailyTasksPage() {
  const [search, setSearch] = useState('');
  const [activity, setActivity] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [assignedBy, setAssignedBy] = useState('');
  const [status, setStatus] = useState('');

  const columns: Column<DailyTaskItem>[] = [
    {
      key: 'projectNo',
      header: 'Project No',
      accessor: (r) => <span className="text-muted-foreground font-medium">{r.projectNo}</span>,
    },
    {
      key: 'activity',
      header: 'Activity',
      accessor: (r) => <span className="font-medium text-slate-800">{r.activity}</span>,
    },
    {
      key: 'description',
      header: 'Description',
      accessor: (r) => <span className="text-xs text-slate-600 block w-[280px] leading-relaxed">{r.description}</span>,
    },
    {
      key: 'assigned',
      header: 'Assigned',
      accessor: (r) => (
        <div className="flex flex-col gap-1.5 text-xs">
          <div>
            <span className="text-muted-foreground">To: </span>
            <span className="font-semibold text-slate-700">{r.assigned.to}</span>
          </div>
          <div>
            <span className="text-muted-foreground">By: </span>
            <span className="font-semibold text-slate-700">{r.assigned.by}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'assignedDate',
      header: 'Assigned Date',
      accessor: (r) => (
        <div className="flex flex-col text-xs font-medium text-slate-600">
          <span>{r.assigned.toDate.split(' ')[0]}</span>
          <span>{r.assigned.toDate.split(' ')[1]}</span>
        </div>
      ),
      className: 'whitespace-nowrap',
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      accessor: (r) => <span className="text-blue-600 font-semibold text-xs">{r.dueDate}</span>,
    },
    {
      key: 'duration',
      header: 'Duration',
      accessor: (r) => r.duration,
      className: 'text-center',
      cellClassName: 'text-center text-muted-foreground font-medium',
    },
    {
      key: 'doneDate',
      header: 'Done Date',
      accessor: (r) => r.doneDate || '',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (r) => (
        <span className={cn(
          "px-2.5 py-1 rounded text-[11px] font-bold text-white tracking-widest shadow-sm uppercase",
          r.status === 'Open' ? "bg-teal-500" :
          r.status === 'Done' ? "bg-emerald-500" :
          "bg-orange-400"
        )}>
          {r.status}
        </span>
      ),
    },
    {
      key: 'remarks',
      header: 'Remarks',
      accessor: (r) => r.remarks,
    },
    {
      key: 'actions',
      header: 'Actions',
      accessor: (r) => (
        <div className="flex gap-1.5 items-center">
          <AppButton size="sm" className="h-7 px-3 text-[11px] bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            Progress
          </AppButton>
          <button className="h-7 w-7 bg-teal-500 hover:bg-teal-600 rounded flex items-center justify-center text-white transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
          </button>
          <button className="h-7 w-7 bg-red-500 hover:bg-red-600 rounded flex items-center justify-center text-white transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
          </button>
        </div>
      ),
    },
  ];

  function handleSearch() {}
  function handleReset() {
    setSearch('');
    setActivity('');
    setAssignedTo('');
    setAssignedBy('');
    setStatus('');
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in zoom-in-95 duration-200">
      <AppCard className="border-t-4 border-t-primary shadow-md overflow-hidden bg-white/50 backdrop-blur-sm">
        <AppCard.Header className="pb-4">
          <div className="flex justify-between items-center w-full">
            <AppCard.Title className="text-xl font-bold text-slate-800">Daily Tasks</AppCard.Title>
            <AppButton className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-semibold shadow-sm transition-all h-9 px-4">
              <Plus className="w-4 h-4 mr-1.5" strokeWidth={2.5} />
              Add
            </AppButton>
          </div>
        </AppCard.Header>
        <AppCard.Content>
          <FilterBar title="Filters" hideTitle>
            <div className="flex gap-2 flex-wrap items-center w-full bg-slate-50 p-2 rounded-md border border-slate-100">
              <NonFormTextInput
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                containerClassName="flex-none w-48 bg-white"
              />
              <AppSelect
                value={activity || '__all'}
                onValueChange={(v) => setActivity(v === '__all' ? '' : v)}
                placeholder="Search By Activities"
                className="w-48 bg-white"
              >
                <AppSelect.Item value="__all">Search By Activities</AppSelect.Item>
                <AppSelect.Item value="Tally Entries">Tally Entries</AppSelect.Item>
                <AppSelect.Item value="Phone Calls">Phone Calls</AppSelect.Item>
              </AppSelect>
              <AppSelect
                value={assignedTo || '__all'}
                onValueChange={(v) => setAssignedTo(v === '__all' ? '' : v)}
                placeholder="Search By Assigned To"
                className="w-48 bg-white"
              >
                <AppSelect.Item value="__all">Search By Assigned To</AppSelect.Item>
                <AppSelect.Item value="Gaurav">Gaurav Bhatle</AppSelect.Item>
                <AppSelect.Item value="Neha">Neha U. Gharat</AppSelect.Item>
              </AppSelect>
              <AppSelect
                value={assignedBy || '__all'}
                onValueChange={(v) => setAssignedBy(v === '__all' ? '' : v)}
                placeholder="Search By Assigned By"
                className="w-48 bg-white"
              >
                <AppSelect.Item value="__all">Search By Assigned By</AppSelect.Item>
                <AppSelect.Item value="Gaurav">Gaurav Bhatle</AppSelect.Item>
                <AppSelect.Item value="Neha">Neha U. Gharat</AppSelect.Item>
              </AppSelect>
              <AppSelect
                value={status || '__all'}
                onValueChange={(v) => setStatus(v === '__all' ? '' : v)}
                placeholder="Search By Status"
                className="w-36 bg-white"
              >
                <AppSelect.Item value="__all">Search By Status</AppSelect.Item>
                <AppSelect.Item value="Open">Open</AppSelect.Item>
                <AppSelect.Item value="Done">Done</AppSelect.Item>
                <AppSelect.Item value="In Progress">In Progress</AppSelect.Item>
              </AppSelect>
              <div className="flex gap-2 ml-auto">
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
