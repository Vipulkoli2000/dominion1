'use client';

import { useState } from 'react';
import { FilterBar } from '@/components/common/filter-bar';
import { AppCard } from '@/components/common/app-card';
import { AppButton } from '@/components/common/app-button';
import { DataTable, Column } from '@/components/common/data-table';
import { NonFormTextInput } from '@/components/common/non-form-text-input';
import { AppSelect } from '@/components/common/app-select';
import { BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Types
type ProjectTaskItem = {
  id: string;
  projectNo: string;
  projectDate: string;
  siteName: string;
  client: string;
  task: string;
  daysRequire: string;
  assignedTo: { name: string; date: string }[];
  status: 'Open' | 'In Progress';
};

// Dummy Data
const DUMMY_DATA: ProjectTaskItem[] = [
  {
    id: "1",
    projectNo: "P00176",
    projectDate: "12/03/2026",
    siteName: "Plot No. J-5, Additional Industrial Area, Dhule",
    client: "Indo Amines Limited",
    task: "Site Visit Charges",
    daysRequire: "0",
    assignedTo: [{ name: "Prasad Date", date: "11th Apr 2026" }],
    status: "In Progress"
  },
  {
    id: "2",
    projectNo: "P00177",
    projectDate: "17/03/2026",
    siteName: "Plot No. B-62, Thane Wagle Industrial Area",
    client: "Alpha Pharma Healthcare Pvt. Ltd.",
    task: "Appointment of Contractors",
    daysRequire: "15",
    assignedTo: [{ name: "En. Pankaj Agate", date: "15th Jul 2026" }],
    status: "In Progress"
  },
  {
    id: "3",
    projectNo: "P00177",
    projectDate: "17/03/2026",
    siteName: "Plot No. B-62, Thane Wagle Industrial Area",
    client: "Alpha Pharma Healthcare Pvt. Ltd.",
    task: "Completion Stage",
    daysRequire: "0",
    assignedTo: [],
    status: "Open"
  },
  {
    id: "4",
    projectNo: "P00177",
    projectDate: "17/03/2026",
    siteName: "Plot No. B-62, Thane Wagle Industrial Area",
    client: "Alpha Pharma Healthcare Pvt. Ltd.",
    task: "Construction Stage - Completion of 100 % of work",
    daysRequire: "0",
    assignedTo: [],
    status: "Open"
  },
  {
    id: "5",
    projectNo: "P00177",
    projectDate: "17/03/2026",
    siteName: "Plot No. B-62, Thane Wagle Industrial Area",
    client: "Alpha Pharma Healthcare Pvt. Ltd.",
    task: "Construction Stage - Completion of 80 % of work",
    daysRequire: "0",
    assignedTo: [],
    status: "Open"
  }
];

// Components
const StatCard = ({ title, value, colorClass, iconBgClass }: { title: string; value: number | string; colorClass: string; iconBgClass: string }) => (
  <AppCard className="flex flex-row items-center justify-between p-6 bg-white shadow-sm border-0 border-b-4 hover:shadow-md transition-shadow" style={{ borderBottomColor: 'var(--card-border, #e2e8f0)' }}>
    <div className={cn("p-4 rounded-full flex items-center justify-center shadow-inner", iconBgClass)}>
      <BarChart2 className="w-6 h-6 text-white" />
    </div>
    <div className="flex flex-col items-end">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{title}</span>
      <span className="text-3xl font-bold text-slate-800">{value}</span>
    </div>
  </AppCard>
);

export default function ProjectTasksOverviewsPage() {
  const [search, setSearch] = useState('');
  const [client, setClient] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('');

  const columns: Column<ProjectTaskItem>[] = [
    {
      key: 'projectNo',
      header: 'Project No',
      accessor: (r) => r.projectNo,
      cellClassName: 'font-medium text-slate-700',
    },
    {
      key: 'projectDate',
      header: 'Project Date',
      accessor: (r) => r.projectDate,
      cellClassName: 'text-muted-foreground whitespace-nowrap',
    },
    {
      key: 'siteName',
      header: 'Site Name',
      accessor: (r) => <span className="text-sm">{r.siteName}</span>,
      className: 'w-[250px]',
    },
    {
      key: 'client',
      header: 'Client',
      accessor: (r) => <span className="text-sm">{r.client}</span>,
    },
    {
      key: 'task',
      header: 'Task',
      accessor: (r) => <span className="font-medium text-sm text-slate-800">{r.task}</span>,
    },
    {
      key: 'daysRequire',
      header: 'Days Require',
      accessor: (r) => r.daysRequire,
      cellClassName: 'tabular-nums text-center',
      className: 'text-center',
    },
    {
      key: 'assignedTo',
      header: 'Assigned To',
      accessor: (r) => (
        <div className="flex flex-col gap-1">
          {r.assignedTo.length > 0 ? r.assignedTo.map((person, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-teal-600 font-semibold text-xs px-1.5 py-0.5 bg-teal-50 rounded-sm w-fit border border-teal-100">{person.name}</span>
              <span className="text-[10px] text-muted-foreground ml-1 mt-0.5">{person.date}</span>
            </div>
          )) : <span className="text-muted-foreground text-xs">—</span>}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (r) => (
        <span className={cn(
          "px-2.5 py-1 rounded text-[11px] font-bold text-white tracking-widest shadow-sm uppercase",
          r.status === 'Open' ? "bg-teal-500" :
          "bg-orange-400"
        )}>
          {r.status}
        </span>
      ),
    },
  ];

  function handleSearch() {}
  function handleReset() {
    setSearch('');
    setClient('');
    setAssignedTo('');
    setStatus('');
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in zoom-in-95 duration-200">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Task" 
          value="583" 
          colorClass="border-blue-500" 
          iconBgClass="bg-blue-600" 
        />
        <StatCard 
          title="Open Task" 
          value="166" 
          colorClass="border-teal-400" 
          iconBgClass="bg-teal-400" 
        />
        <StatCard 
          title="In Progress Task" 
          value="134" 
          colorClass="border-red-500" 
          iconBgClass="bg-red-500" 
        />
        <StatCard 
          title="Completed Task" 
          value="283" 
          colorClass="border-green-500" 
          iconBgClass="bg-emerald-500" 
        />
      </div>

      {/* Main Table Card */}
      <AppCard className="border-t-4 border-t-primary shadow-md overflow-hidden bg-white/50 backdrop-blur-sm">
        <AppCard.Header>
          <AppCard.Title className="text-lg font-bold text-slate-800">Projects Tasks</AppCard.Title>
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
                value={client || '__all'}
                onValueChange={(v) => setClient(v === '__all' ? '' : v)}
                placeholder="Please Select Clients"
                className="w-48 bg-white"
              >
                <AppSelect.Item value="__all">Please Select Clients</AppSelect.Item>
                <AppSelect.Item value="Indo Amines">Indo Amines Limited</AppSelect.Item>
                <AppSelect.Item value="Alpha Pharma">Alpha Pharma</AppSelect.Item>
              </AppSelect>
              <AppSelect
                value={assignedTo || '__all'}
                onValueChange={(v) => setAssignedTo(v === '__all' ? '' : v)}
                placeholder="Please Select Assigned To"
                className="w-56 bg-white ml-auto"
              >
                <AppSelect.Item value="__all">Please Select Assigned To</AppSelect.Item>
                <AppSelect.Item value="Prasad Date">Prasad Date</AppSelect.Item>
                <AppSelect.Item value="Pankaj Agate">En. Pankaj Agate</AppSelect.Item>
              </AppSelect>
              <AppSelect
                value={status || '__all'}
                onValueChange={(v) => setStatus(v === '__all' ? '' : v)}
                placeholder="Search By Status"
                className="w-40 bg-white"
              >
                <AppSelect.Item value="__all">Search By Status</AppSelect.Item>
                <AppSelect.Item value="In Progress">In Progress</AppSelect.Item>
                <AppSelect.Item value="Open">Open</AppSelect.Item>
              </AppSelect>
              <div className="flex gap-2 ml-2">
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
            <h3 className="text-sm font-bold bg-slate-50 border-b p-3 text-slate-700">Projects Tasks</h3>
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
