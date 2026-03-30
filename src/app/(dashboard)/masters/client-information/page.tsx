'use client';

import { useState } from 'react';
import { AppCard } from '@/components/common/app-card';
import { AppButton } from '@/components/common/app-button';
import { NonFormTextInput } from '@/components/common/non-form-text-input';
import { FilterBar } from '@/components/common';
import { Edit, Trash2, MoreHorizontal, Building2, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DUMMY_CLIENTS = [
  {
    id: 1,
    clientName: 'OMTECH SPECIALITY POLYMER CHEMICALS PRIVATE LIMITED',
    contactPerson: 'Rajesh Sharma',
    email: 'rajesh@omtech.com',
    phone: '+91 22 1234 5678',
    mobile: '+91 98765 43210',
    city: 'Mumbai',
    state: 'Maharashtra',
    gstNumber: '27AABCU9603R1ZX',
    industry: 'Chemical Manufacturing',
  },
  {
    id: 2,
    clientName: 'Aphra Commercial Enterprises Private Limited',
    contactPerson: 'Priya Patel',
    email: 'priya@aphra.com',
    phone: '+91 80 8765 4321',
    mobile: '+91 87654 32109',
    city: 'Bangalore',
    state: 'Karnataka',
    gstNumber: '29AABCU9603R1ZY',
    industry: 'Trading',
  },
  {
    id: 3,
    clientName: 'PureSynth Research Chemicals Pvt Ltd',
    contactPerson: 'Dr. Amit Kumar',
    email: 'amit@puresynth.com',
    phone: '+91 20 2345 6789',
    mobile: '+91 76543 21098',
    city: 'Pune',
    state: 'Maharashtra',
    gstNumber: '27AABCU9603R1ZZ',
    industry: 'Research & Development',
  },
  {
    id: 4,
    clientName: 'IG Petrochemicals Limited',
    contactPerson: 'Suresh Menon',
    email: 'suresh@igpetro.com',
    phone: '+91 22 3456 7890',
    mobile: '+91 65432 10987',
    city: 'Mumbai',
    state: 'Maharashtra',
    gstNumber: '27AABCU9603R2ZA',
    industry: 'Petrochemicals',
  },
  {
    id: 5,
    clientName: 'Centuiry Enka',
    contactPerson: 'Vikram Desai',
    email: 'vikram@centuryenka.com',
    phone: '+91 22 4567 8901',
    mobile: '+91 54321 09876',
    city: 'Pune',
    state: 'Maharashtra',
    gstNumber: '27AABCU9603R2ZB',
    industry: 'Textiles',
  },
];

export default function ClientInformationPage() {
  const [searchDraft, setSearchDraft] = useState('');
  const [search, setSearch] = useState('');

  const filteredClients = DUMMY_CLIENTS.filter((client) => {
    if (!search.trim()) return true;
    const searchTerm = search.toLowerCase();
    return (
      client.clientName.toLowerCase().includes(searchTerm) ||
      client.contactPerson.toLowerCase().includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm) ||
      client.city.toLowerCase().includes(searchTerm) ||
      client.industry.toLowerCase().includes(searchTerm)
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
              <Building2 className="h-5 w-5 text-primary" />
              <AppCard.Title>Client Information</AppCard.Title>
            </div>
            <AppCard.Description>Manage client records and their contact details.</AppCard.Description>
          </div>
          <AppCard.Action>
            <Link href="/masters/client-information/add">
              <AppButton size="sm" iconName="Plus" type="button">
                Add Client
              </AppButton>
            </Link>
          </AppCard.Action>
        </AppCard.Header>

        <AppCard.Content className="pt-0">
          <FilterBar title="Search & Filter">
            <div className="flex w-full gap-2 items-center">
              <NonFormTextInput
                aria-label="Search clients"
                placeholder="Search by client name, contact person, email, city..."
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
                  <th className="px-4 py-3 align-middle font-medium border-b border-border">Client Name</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border">Contact Person</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border">Contact Info</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border">Location</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border">GST Number</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border">Industry</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-muted/50 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground max-w-[280px] leading-snug">
                        {client.clientName}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 text-primary text-[10px] font-semibold flex items-center justify-center">
                          {client.contactPerson.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                        </div>
                        <span className="text-foreground">{client.contactPerson}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span className="text-xs">{client.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span className="text-xs">{client.mobile}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {client.city}, {client.state}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                        {client.gstNumber}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {client.industry}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          className="text-muted-foreground shadow-sm bg-white border border-border/50 hover:border-primary/50 hover:text-primary transition-colors p-1.5 rounded-md hover:bg-primary/5"
                          title="Edit client"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          className="text-muted-foreground shadow-sm bg-white border border-border/50 hover:border-destructive/50 hover:text-destructive transition-colors p-1.5 rounded-md hover:bg-destructive/5"
                          title="Delete client"
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
                            <DropdownMenuItem className="cursor-pointer">View Projects</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredClients.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                      No clients found matching your search.
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
