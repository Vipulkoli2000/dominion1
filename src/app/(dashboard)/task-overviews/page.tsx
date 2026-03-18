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
import { Badge } from '@/components/ui/badge'; // Using standard badge if it exists, or we can use custom styling to match

// Types
type TaskItem = {
  id: string;
  projectNo: string;
  activity: string;
  assignedTo: string;
  dueDate: string;
  duration: string;
  timeRequired: string;
  status: 'Done' | 'Open' | 'In Progress';
};

// Dummy Data
const DUMMY_DATA: TaskItem[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `task-${i}`,
  projectNo: '---',
  activity: i % 2 === 0 ? 'Phone Calls' : i % 3 === 0 ? 'Sending Emails' : 'Accounts Activity',
  assignedTo: i % 2 === 0 ? 'Neha U. Gharat' : 'Gaurav Bhatle',
  dueDate: '11/03/2026',
  duration: i % 2 === 0 ? '0' : i % 3 === 0 ? '15 min' : '30 min',
  timeRequired: i % 2 === 0 ? '6 Days' : '0 Days',
  status: 'Done',
}));

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

export default function TaskOverviewsPage() {
  const [search, setSearch] = useState('');
  const [activity, setActivity] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [assignedBy, setAssignedBy] = useState('');
  const [status, setStatus] = useState('');

  const columns: Column<TaskItem>[] = [
    {
      key: 'projectNo',
      header: 'Project No',
      accessor: (r) => r.projectNo,
      cellClassName: 'text-muted-foreground',
    },
    {
      key: 'activity',
      header: 'Activity',
      accessor: (r) => r.activity,
      cellClassName: 'font-medium',
    },
    {
      key: 'assignedTo',
      header: 'Assigned To',
      accessor: (r) => (
        <span className="text-teal-600 font-medium underline decoration-teal-200 underline-offset-2">
          {r.assignedTo}
        </span>
      ),
    },
    {
      key: 'dueDate',
      header: 'due_date',
      accessor: (r) => r.dueDate,
    },
    {
      key: 'duration',
      header: 'duration',
      accessor: (r) => r.duration,
    },
    {
      key: 'timeRequired',
      header: 'Time Required',
      accessor: (r) => r.timeRequired,
    },
    {
      key: 'status',
      header: 'status',
      accessor: (r) => (
        <span className={cn(
          "px-2.5 py-1 rounded text-xs font-semibold text-white tracking-wide shadow-sm",
          r.status === 'Done' ? "bg-emerald-500" :
          r.status === 'Open' ? "bg-teal-400" :
          "bg-amber-500"
        )}>
          {r.status}
        </span>
      ),
    },
  ];

  function handleSearch() {
    // Implement search logic here
  }

  function handleReset() {
    setSearch('');
    setActivity('');
    setAssignedTo('');
    setAssignedBy('');
    setStatus('');
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in zoom-in-95 duration-200">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Task" 
          value="4062" 
          colorClass="border-blue-500" 
          iconBgClass="bg-blue-600" 
        />
        <StatCard 
          title="Open Task" 
          value="127" 
          colorClass="border-teal-400" 
          iconBgClass="bg-teal-400" 
        />
        <StatCard 
          title="In Progress Task" 
          value="77" 
          colorClass="border-red-500" 
          iconBgClass="bg-red-500" 
        />
        <StatCard 
          title="Completed Task" 
          value="3832" 
          colorClass="border-green-500" 
          iconBgClass="bg-emerald-500" 
        />
      </div>

      {/* Main Table Card */}
      <AppCard className="border-t-4 border-t-primary shadow-md overflow-hidden bg-white/50 backdrop-blur-sm">
        <AppCard.Header>
          <AppCard.Title className="text-lg font-bold text-slate-800">Daily Tasks</AppCard.Title>
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
                <AppSelect.Item value="Phone Calls">Phone Calls</AppSelect.Item>
                <AppSelect.Item value="Sending Emails">Sending Emails</AppSelect.Item>
              </AppSelect>
              <AppSelect
                value={assignedTo || '__all'}
                onValueChange={(v) => setAssignedTo(v === '__all' ? '' : v)}
                placeholder="Search By Assigned To"
                className="w-48 bg-white"
              >
                <AppSelect.Item value="__all">Search By Assigned To</AppSelect.Item>
                <AppSelect.Item value="Neha">Neha U. Gharat</AppSelect.Item>
                <AppSelect.Item value="Gaurav">Gaurav Bhatle</AppSelect.Item>
              </AppSelect>
              <AppSelect
                value={assignedBy || '__all'}
                onValueChange={(v) => setAssignedBy(v === '__all' ? '' : v)}
                placeholder="Search By Assigned By"
                className="w-48 bg-white"
              >
                <AppSelect.Item value="__all">Search By Assigned By</AppSelect.Item>
                <AppSelect.Item value="Neha">Neha U. Gharat</AppSelect.Item>
              </AppSelect>
              <AppSelect
                value={status || '__all'}
                onValueChange={(v) => setStatus(v === '__all' ? '' : v)}
                placeholder="Search By Status"
                className="w-40 bg-white"
              >
                <AppSelect.Item value="__all">Search By Status</AppSelect.Item>
                <AppSelect.Item value="Done">Done</AppSelect.Item>
                <AppSelect.Item value="Open">Open</AppSelect.Item>
                <AppSelect.Item value="In Progress">In Progress</AppSelect.Item>
              </AppSelect>
              <div className="flex gap-2 ml-auto">
                <AppButton onClick={handleSearch} className="px-6 bg-blue-600 hover:bg-blue-700 shadow-sm transition-all duration-200 hover:shadow">
                  Search
                </AppButton>
                <AppButton onClick={handleReset} variant="outline" className="px-6 bg-teal-400 text-white hover:bg-teal-500 hover:text-white border-0 shadow-sm transition-all duration-200 hover:shadow">
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
