'use client';

import { useState } from 'react';
import { AppCard } from '@/components/common/app-card';
import { AppButton } from '@/components/common/app-button';
import { NonFormTextInput } from '@/components/common/non-form-text-input';
import { FilterBar } from '@/components/common';
import { Edit, Trash2, MoreHorizontal, Megaphone, Calendar, Eye, Tag } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DUMMY_ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'New HR Policy Update - Leave Management',
    content: 'Updated leave policy effective from next month. Please review the changes.',
    category: 'hr',
    priority: 'high',
    status: 'active',
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    visibleTo: 'all',
    createdBy: 'Admin',
    createdAt: '2026-02-28',
  },
  {
    id: 2,
    title: 'Office Maintenance - Server Room',
    content: 'Scheduled maintenance on March 15th. Systems may be temporarily unavailable.',
    category: 'it',
    priority: 'normal',
    status: 'active',
    startDate: '2026-03-15',
    endDate: '2026-03-15',
    visibleTo: 'all',
    createdBy: 'Admin',
    createdAt: '2026-03-01',
  },
  {
    id: 3,
    title: 'Annual General Meeting 2026',
    content: 'AGM scheduled for April 20th, 2026. All employees are encouraged to attend.',
    category: 'general',
    priority: 'urgent',
    status: 'scheduled',
    startDate: '2026-04-20',
    endDate: '2026-04-20',
    visibleTo: 'all',
    createdBy: 'Admin',
    createdAt: '2026-03-05',
  },
  {
    id: 4,
    title: 'New Safety Protocols - Construction Sites',
    content: 'Updated safety guidelines for all construction site operations.',
    category: 'safety',
    priority: 'high',
    status: 'active',
    startDate: '2026-03-10',
    endDate: '2026-12-31',
    visibleTo: 'all',
    createdBy: 'Admin',
    createdAt: '2026-03-08',
  },
  {
    id: 5,
    title: 'Finance Department - Budget Approval Process',
    content: 'New budget approval workflow now in effect. Contact finance for details.',
    category: 'finance',
    priority: 'normal',
    status: 'active',
    startDate: '2026-03-01',
    endDate: '2026-06-30',
    visibleTo: 'finance',
    createdBy: 'Admin',
    createdAt: '2026-02-25',
  },
];

const PRIORITY_COLORS: Record<string, string> = {
  low: 'bg-gray-100 text-gray-700 ring-gray-600/20',
  normal: 'bg-blue-50 text-blue-700 ring-blue-700/10',
  high: 'bg-orange-50 text-orange-700 ring-orange-700/10',
  urgent: 'bg-red-50 text-red-700 ring-red-700/10',
};

const CATEGORY_LABELS: Record<string, string> = {
  general: 'General',
  hr: 'HR',
  it: 'IT',
  finance: 'Finance',
  operations: 'Operations',
  safety: 'Safety',
  event: 'Event',
  policy: 'Policy',
};

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-50 text-green-700 ring-green-700/10',
  draft: 'bg-gray-50 text-gray-700 ring-gray-600/20',
  scheduled: 'bg-purple-50 text-purple-700 ring-purple-700/10',
};

export default function AnnouncementsPage() {
  const [searchDraft, setSearchDraft] = useState('');
  const [search, setSearch] = useState('');

  const filteredAnnouncements = DUMMY_ANNOUNCEMENTS.filter((announcement) => {
    if (!search.trim()) return true;
    const searchTerm = search.toLowerCase();
    return (
      announcement.title.toLowerCase().includes(searchTerm) ||
      announcement.content.toLowerCase().includes(searchTerm) ||
      announcement.category.toLowerCase().includes(searchTerm)
    );
  });

  const handleSearch = () => {
    setSearch(searchDraft);
  };

  const handleReset = () => {
    setSearch('');
    setSearchDraft('');
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1700px] mx-auto min-h-[calc(100vh-theme(spacing.16))] w-full">
      <AppCard>
        <AppCard.Header className="flex flex-row items-center justify-between pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-primary" />
              <AppCard.Title>Announcements</AppCard.Title>
            </div>
            <AppCard.Description>Manage organizational announcements and notices.</AppCard.Description>
          </div>
          <AppCard.Action>
            <Link href="/masters/announcements/add">
              <AppButton size="sm" iconName="Plus" type="button">
                Add Announcement
              </AppButton>
            </Link>
          </AppCard.Action>
        </AppCard.Header>

        <AppCard.Content className="pt-0">
          <FilterBar title="Search & Filter">
            <div className="flex w-full gap-2 items-center">
              <NonFormTextInput
                aria-label="Search announcements"
                placeholder="Search by title, content, or category..."
                value={searchDraft}
                onChange={(e) => setSearchDraft(e.target.value)}
                containerClassName="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <AppButton size="sm" className="min-w-[84px]" onClick={handleSearch}>
                Search
              </AppButton>
              {(searchDraft || search) && (
                <AppButton
                  variant="secondary"
                  size="sm"
                  onClick={handleReset}
                  className="min-w-[84px]"
                >
                  Reset
                </AppButton>
              )}
            </div>
          </FilterBar>

          <div className="overflow-x-auto border-t border-border mt-4">
            <table className="w-full text-sm text-left">
              <thead className="text-[13px] text-muted-foreground bg-muted/40 font-semibold align-top h-11">
                <tr>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border">Announcement</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border w-28">Category</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border w-24">Priority</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border w-24">Status</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border w-36">Duration</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border w-28">Visible To</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAnnouncements.map((announcement) => (
                  <tr key={announcement.id} className="hover:bg-muted/50 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground max-w-[350px] leading-snug mb-1">
                        {announcement.title}
                      </div>
                      <div className="text-xs text-muted-foreground max-w-[350px] line-clamp-2">
                        {announcement.content}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                        <Tag className="h-3 w-3 mr-1" />
                        {CATEGORY_LABELS[announcement.category] || announcement.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${PRIORITY_COLORS[announcement.priority]}`}>
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_COLORS[announcement.status]}`}>
                        {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>From: {announcement.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>To: {announcement.endDate}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span className="capitalize">{announcement.visibleTo}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          className="text-muted-foreground shadow-sm bg-white border border-border/50 hover:border-primary/50 hover:text-primary transition-colors p-1.5 rounded-md hover:bg-primary/5"
                          title="Edit announcement"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          className="text-muted-foreground shadow-sm bg-white border border-border/50 hover:border-destructive/50 hover:text-destructive transition-colors p-1.5 rounded-md hover:bg-destructive/5"
                          title="Delete announcement"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="text-muted-foreground shadow-sm bg-white border border-border/50 hover:border-border hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted"
                              title="More Actions"
                            >
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px] text-xs font-medium">
                            <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredAnnouncements.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                      No announcements found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </AppCard.Content>
      </AppCard>
    </div>
  );
}
