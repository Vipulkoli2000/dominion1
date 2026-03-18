'use client';

import { useState } from 'react';
import { FilterBar } from '@/components/common/filter-bar';
import { AppCard } from '@/components/common/app-card';
import { AppButton } from '@/components/common/app-button';
import { DataTable, Column } from '@/components/common/data-table';
import { NonFormTextInput } from '@/components/common/non-form-text-input';
import { AppSelect } from '@/components/common/app-select';
import { cn } from '@/lib/utils';
import { ChevronDown, Edit } from 'lucide-react';

// Types
type ProjectStageItem = {
  id: string;
  project: string;
  projectName: string;
  task: string;
  assignedBy: string;
  assignedTo: string;
  assignedToDate: string;
  doneOn: string;
  targetDate: string;
  reportingOfficer: string;
  finalReportingAuth: string;
  status: 'Completed' | 'In Progress';
};

// Dummy Data
const DUMMY_DATA: ProjectStageItem[] = [
  {
    id: "1",
    project: "P2022-23/00034",
    projectName: "B 42, Mediair Healthcare Products Pvt Ltd",
    task: "Construction Stage - Completion of 20 % of work",
    assignedBy: "Ar. Kaustubh Kashelkar",
    assignedTo: "En. Pankaj Agate",
    assignedToDate: "1st Aug 2024",
    doneOn: "05/09/24, 5:37 pm",
    targetDate: "01/08/2024",
    reportingOfficer: "",
    finalReportingAuth: "",
    status: "Completed"
  },
  {
    id: "2",
    project: "P00176",
    projectName: "Plot No. J-5, Additional Industrial Area...",
    task: "Site Visit Charges",
    assignedBy: "Darpan Powale",
    assignedTo: "Prasad Date",
    assignedToDate: "11th Apr 2026",
    doneOn: "",
    targetDate: "11/04/2026",
    reportingOfficer: "Ar. Kaustubh Kashelkar",
    finalReportingAuth: "Ar. Madhav Kashelkar",
    status: "In Progress"
  },
  {
    id: "3",
    project: "P2022-23/00034",
    projectName: "B 42, Mediair Healthcare Products Pvt Ltd",
    task: "Appointment of Contractors",
    assignedBy: "Ar. Kaustubh Kashelkar",
    assignedTo: "En. Pankaj Agate",
    assignedToDate: "1st Apr 2024",
    doneOn: "16/05/24, 3:29 pm",
    targetDate: "16/04/2024",
    reportingOfficer: "Ar. Kaustubh Kashelkar",
    finalReportingAuth: "Darpan Powale",
    status: "Completed"
  }
];

export default function ProjectStagesPage() {
  const [search, setSearch] = useState('');
  const [project, setProject] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('');

  const columns: Column<ProjectStageItem>[] = [
    {
      key: 'project',
      header: 'Project',
      accessor: (r) => (
        <div className="flex flex-col gap-0.5 max-w-[200px]">
          <span className="font-semibold text-slate-700">{r.project}</span>
          <span className="text-xs text-muted-foreground whitespace-normal leading-tight">{r.projectName}</span>
        </div>
      ),
    },
    {
      key: 'task',
      header: 'Task',
      accessor: (r) => <span className="font-medium text-slate-800 text-sm max-w-[200px] block whitespace-normal leading-tight">{r.task}</span>,
    },
    {
      key: 'assignedBy',
      header: 'Assigned By',
      accessor: (r) => (
        <span className="text-teal-600 font-bold text-xs px-2 py-1 bg-teal-50 rounded-sm shadow-sm whitespace-nowrap">
          {r.assignedBy}
        </span>
      ),
    },
    {
      key: 'assignedTo',
      header: 'Assigned To',
      accessor: (r) => (
        <div className="flex flex-col">
          <span className="text-teal-600 font-bold text-xs px-2 py-1 bg-teal-50 rounded-sm shadow-sm whitespace-nowrap mb-1">
            {r.assignedTo}
          </span>
          <span className="text-[11px] text-muted-foreground ml-1">{r.assignedToDate}</span>
        </div>
      ),
    },
    {
      key: 'doneOn',
      header: 'Done on',
      accessor: (r) => (
        <div className="flex flex-col text-xs font-medium text-slate-600">
          {r.doneOn ? (
            <>
              <span>{r.doneOn.split(',')[0]}</span>
              <span>{r.doneOn.split(',')[1]}</span>
            </>
          ) : <span>—</span>}
        </div>
      ),
    },
    {
      key: 'targetDate',
      header: 'Target Date',
      accessor: (r) => <span className="text-slate-700 font-semibold text-xs whitespace-nowrap">{r.targetDate}</span>,
    },
    {
      key: 'reportingOfficer',
      header: 'Reporting Officer',
      accessor: (r) => r.reportingOfficer ? (
        <span className="text-teal-600 font-bold text-xs px-2 py-1 bg-teal-50 rounded-sm shadow-sm whitespace-nowrap">
          {r.reportingOfficer}
        </span>
      ) : <span className="text-muted-foreground">—</span>,
    },
    {
      key: 'finalReportingAuth',
      header: 'Final Reporting Authority',
      accessor: (r) => r.finalReportingAuth ? (
        <span className="text-teal-600 font-bold text-xs px-2 py-1 bg-teal-50 rounded-sm shadow-sm whitespace-nowrap">
          {r.finalReportingAuth}
        </span>
      ) : <span className="text-muted-foreground">—</span>,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (r) => (
        <span className={cn(
          "px-2.5 py-1 rounded text-[11px] font-bold text-white tracking-widest shadow-sm uppercase whitespace-nowrap",
          r.status === 'Completed' ? "bg-emerald-500" :
          "bg-orange-400"
        )}>
          {r.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      accessor: (r) => (
        <div className="flex gap-1.5 items-center whitespace-nowrap">
          <AppButton size="sm" className="h-7 px-3 text-[11px] bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            Actions <ChevronDown className="w-3 h-3 ml-1" />
          </AppButton>
          <button className="h-7 w-7 bg-teal-500 hover:bg-teal-600 rounded flex items-center justify-center text-white transition-colors shadow-sm">
            <Edit className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>
      ),
    },
  ];

  function handleSearch() {}
  function handleReset() {
    setSearch('');
    setProject('');
    setAssignedTo('');
    setStatus('');
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in zoom-in-95 duration-200">
      <AppCard className="border-t-4 border-t-primary shadow-md overflow-hidden bg-white/50 backdrop-blur-sm">
        <AppCard.Header>
          <AppCard.Title className="text-lg font-bold text-slate-800">Project Stages</AppCard.Title>
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
                value={project || '__all'}
                onValueChange={(v) => setProject(v === '__all' ? '' : v)}
                placeholder="Search By Project"
                className="w-56 bg-white"
              >
                <AppSelect.Item value="__all">Search By Project</AppSelect.Item>
                <AppSelect.Item value="1">B 42, Mediair Healthcare</AppSelect.Item>
                <AppSelect.Item value="2">Plot J-5, Induction</AppSelect.Item>
              </AppSelect>
              <AppSelect
                value={assignedTo || '__all'}
                onValueChange={(v) => setAssignedTo(v === '__all' ? '' : v)}
                placeholder="Search By Assigned To"
                className="w-56 bg-white ml-auto"
              >
                <AppSelect.Item value="__all">Search By Assigned To</AppSelect.Item>
                <AppSelect.Item value="Pankaj">En. Pankaj Agate</AppSelect.Item>
                <AppSelect.Item value="Prasad">Prasad Date</AppSelect.Item>
              </AppSelect>
              <AppSelect
                value={status || '__all'}
                onValueChange={(v) => setStatus(v === '__all' ? '' : v)}
                placeholder="Search By Status"
                className="w-40 bg-white"
              >
                <AppSelect.Item value="__all">Search By Status</AppSelect.Item>
                <AppSelect.Item value="Completed">Completed</AppSelect.Item>
                <AppSelect.Item value="In Progress">In Progress</AppSelect.Item>
              </AppSelect>
              <div className="flex gap-2 ml-2">
                <AppButton onClick={handleSearch} className="px-6 bg-teal-500 hover:bg-teal-600 shadow-sm transition-all duration-200">
                  Search
                </AppButton>
                <AppButton onClick={handleReset} className="px-6 bg-blue-600 text-white hover:bg-blue-700 border-0 shadow-sm transition-all duration-200">
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
