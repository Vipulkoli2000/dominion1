'use client';

import { AppCard } from '@/components/common/app-card';
import { FilterBar } from '@/components/common';
import { AppButton } from '@/components/common/app-button';
import { NonFormTextInput } from '@/components/common/non-form-text-input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Edit, Trash2, MoreHorizontal, FileText, 
  CheckCircle, RefreshCcw, FileSignature, ArrowRightLeft 
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
const DUMMY_RECORDS = [
  {
    id: 1,
    quotationNo: 'Q2025-26/00328',
    quotationDate: '04/03/2026',
    client: 'OMTECH SPECIALITY POLYMER CHEMICALS PRIVATE LIMITED',
    siteName: 'Plot No. C 8/9 & C8/10, Ambernath Industrial Area',
    finalAmount: '₹8,43,700.00',
    preparedBy: { name: 'Darpan Powale', date: '2nd Mar 2026' },
    revision: 0,
  },
  {
    id: 2,
    quotationNo: 'Q2025-26/00327',
    quotationDate: '04/03/2026',
    client: 'OMTECH SPECIALITY POLYMER CHEMICALS PRIVATE LIMITED',
    siteName: 'Plot No. C 8/9 & C8/10, Ambernath Industrial Area',
    finalAmount: '₹4,72,000.00',
    preparedBy: { name: 'Darpan Powale', date: '2nd Mar 2026' },
    revision: 0,
  },
  {
    id: 3,
    quotationNo: 'Q2025-26/00325',
    quotationDate: '',
    client: 'Aphra Commercial Enterprises Private Limited',
    siteName: '',
    finalAmount: '₹0.00',
    preparedBy: { name: 'Darpan Powale', date: '24th Feb 2026' },
    revision: 0,
  },
  {
    id: 4,
    quotationNo: 'Q2025-26/00324',
    quotationDate: '18/02/2025',
    client: 'PureSynth Research Chemicals Pvt Ltd',
    siteName: 'Plot No.89',
    finalAmount: '₹6,87,704.00',
    preparedBy: { name: 'Darpan Powale', date: '16th Feb 2026' },
    revision: 0,
  },
  {
    id: 5,
    quotationNo: 'Q2025-26/00322',
    quotationDate: '12/02/2026',
    client: 'IG Petrochemicals Limited',
    siteName: 'Plot No.( PS-4)(PA-5) T2, Taloja Industrial Area ,',
    finalAmount: '₹6,49,000.00',
    preparedBy: { name: 'Darpan Powale', date: '10th Feb 2026' },
    revision: 2,
  },
  {
    id: 6,
    quotationNo: 'Q2025-26/00321',
    quotationDate: '',
    client: 'Centuiry Enka',
    siteName: '',
    finalAmount: '₹0.00',
    preparedBy: { name: 'Darpan Powale', date: '10th Feb 2026' },
    revision: 0,
  },
  {
    id: 7,
    quotationNo: 'Q2025-26/00320',
    quotationDate: '09/02/2026',
    client: 'Shree Shyam Industries',
    siteName: 'Plot no.7 , Phase 2 , Saravali MIDC, Kalyan Bhiwandi',
    finalAmount: '₹85,50,924.28',
    preparedBy: { name: 'Darpan Powale', date: '9th Feb 2026' },
    revision: 0,
  },
  {
    id: 8,
    quotationNo: 'Q2025-26/00319',
    quotationDate: '06/02/2026',
    client: 'VVL (KFL) KEVA FLAVOURS PVT. LTD., C/o. S H Kelkar & Company Ltd.,',
    siteName: '',
    finalAmount: '₹13,39,300.00',
    preparedBy: { name: 'Darpan Powale', date: '31st Jan 2026' },
    revision: 0,
  },
  {
    id: 9,
    quotationNo: 'Q2025-26/00318',
    quotationDate: '31/01/2026',
    client: "Employees' State Insurance Corporation",
    siteName: 'Baramati Area',
    finalAmount: '₹9,32,200.00',
    preparedBy: { name: 'Darpan Powale', date: '31st Jan 2026' },
    revision: 1,
  },
  {
    id: 10,
    quotationNo: 'Q2025-26/00315',
    quotationDate: '13/01/2026',
    client: 'Chandrakant Dhole',
    siteName: '',
    finalAmount: '₹0.00',
    preparedBy: { name: 'Darpan Powale', date: '13th Jan 2026' },
    revision: 0,
  },
  {
    id: 11,
    quotationNo: 'Q2025-26/00313',
    quotationDate: '12/01/2026',
    client: 'Prashant Pagare',
    siteName: '',
    finalAmount: '₹0.00',
    preparedBy: { name: 'Darpan Powale', date: '12th Jan 2026' },
    revision: 0,
  },
  {
    id: 12,
    quotationNo: 'Q2025-26/00312',
    quotationDate: '08/01/2026',
    client: 'Jindal SMI Coated Products Limited',
    siteName: '',
    finalAmount: '₹0.00',
    preparedBy: { name: 'Darpan Powale', date: '8th Jan 2026' },
    revision: 0,
  },
  {
    id: 13,
    quotationNo: 'Q2025-26/00311',
    quotationDate: '30/12/2025',
    client: 'Lysca Pharma',
    siteName: '',
    finalAmount: '₹50,37,995.84',
    preparedBy: { name: 'Darpan Powale', date: '30th Dec 2025' },
    revision: 0,
  },
  {
    id: 14,
    quotationNo: 'Q2025-26/00309',
    quotationDate: '27/12/2025',
    client: 'MEGHNINAD CO.-OP HSG. SOCIETY LTD.,',
    siteName: 'Building no.: 13, Ground Floor,',
    finalAmount: '₹60,180.00',
    preparedBy: { name: 'Darpan Powale', date: '27th Dec 2025' },
    revision: 0,
  },
  {
    id: 15,
    quotationNo: 'Q2025-26/00308',
    quotationDate: '24/12/2025',
    client: 'HEGDE HOTELS (INDIA) PVT. LTD.,',
    siteName: 'Plot No.: P 16 Chakala Industrial Area. , Andheri East, Mumbai - 400093',
    finalAmount: '₹8,26,000.00',
    preparedBy: { name: 'Darpan Powale', date: '24th Dec 2025' },
    revision: 0,
  },
  {
    id: 16,
    quotationNo: 'Q2025-26/00307',
    quotationDate: '24/12/2025',
    client: 'NETCREASE GLOBE SERVICES LLP',
    siteName: 'Plot No.: 28/22, 28/36 & 28/37, Dombivli MIDC',
    finalAmount: '₹7,67,000.00',
    preparedBy: { name: 'Darpan Powale', date: '24th Dec 2025' },
    revision: 0,
  },
  {
    id: 17,
    quotationNo: 'Q2025-26/00306',
    quotationDate: '',
    client: 'Mr. Kushant Rathod',
    siteName: '',
    finalAmount: '₹0.00',
    preparedBy: { name: 'Darpan Powale', date: '24th Dec 2025' },
    revision: 0,
  },
  {
    id: 18,
    quotationNo: 'Q2025-26/00305',
    quotationDate: '',
    client: 'Sunanda Kene',
    siteName: '',
    finalAmount: '₹0.00',
    preparedBy: { name: 'Darpan Powale', date: '24th Dec 2025' },
    revision: 0,
  },
  {
    id: 19,
    quotationNo: 'Q2025-26/00304',
    quotationDate: '',
    client: 'Mr. S. N. Shukla',
    siteName: 'Plot No.: P-1 Dombivli MIDC',
    finalAmount: '₹0.00',
    preparedBy: { name: 'Darpan Powale', date: '24th Dec 2025' },
    revision: 0,
  },
];

export default function PipelineProjectsPage() {
  const [searchDraft, setSearchDraft] = useState('');
  const [search, setSearch] = useState('');
  const router = useRouter();

  // Client-side filtering logic based on the committed search state
  const filteredRecords = DUMMY_RECORDS.filter(record => {
    if (!search.trim()) return true;
    
    const searchTerm = search.toLowerCase();
    
    return (
      record.quotationNo.toLowerCase().includes(searchTerm) ||
      record.client.toLowerCase().includes(searchTerm) ||
      (record.siteName && record.siteName.toLowerCase().includes(searchTerm)) ||
      record.preparedBy.name.toLowerCase().includes(searchTerm)
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
      <AppCard className="bg-white/70 backdrop-blur-xl border border-white/50 transition-all duration-300 dark:bg-slate-900/60 dark:border-white/10 dark:shadow-none hover:shadow-xl hover:shadow-blue-500/5">
        <AppCard.Header className="flex flex-row items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <AppCard.Title className="text-2xl font-black text-slate-950 dark:text-slate-50 tracking-tight">Pipeline Projects</AppCard.Title>
            <AppCard.Description className="text-slate-500 dark:text-slate-400 font-medium">Manage pipeline projects and quotations.</AppCard.Description>
          </div>
          <AppCard.Action>
            <Link href="/pipeline-projects/add">
              <AppButton size="sm" iconName="Plus" type="button" className="bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-black px-6 rounded-xl">
                Add Project
              </AppButton>
            </Link>
          </AppCard.Action>
        </AppCard.Header>
        <AppCard.Content className="pt-6">
          <FilterBar title="Search & Filter">
            <div className="flex w-full gap-3 items-center">
              <NonFormTextInput
                aria-label="Search projects"
                placeholder="Search projects by client or quotation no..."
                value={searchDraft}
                onChange={(e) => setSearchDraft(e.target.value)}
                containerClassName="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-white/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 focus:border-blue-500 transition-all rounded-xl h-11"
              />
              <AppButton size="sm" className="min-w-[100px] bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 font-black h-11 rounded-xl shadow-sm" onClick={handleSearch}>
                Search
              </AppButton>
              {(searchDraft || search) ? (
                <AppButton
                  variant="secondary"
                  size="sm"
                  onClick={handleReset}
                  className="min-w-[100px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black h-11 rounded-xl"
                >
                  Reset
                </AppButton>
              ) : null}
            </div>
          </FilterBar>

          <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-2xl mt-6">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-blue-700 dark:text-blue-300 bg-blue-50/50 dark:bg-blue-900/30 font-black uppercase tracking-widest h-12">
                <tr>
                  <th className="px-6 py-3 align-middle border-b border-slate-100 dark:border-slate-800">Quotation No</th>
                  <th className="px-6 py-3 align-middle border-b border-slate-100 dark:border-slate-800">Date</th>
                  <th className="px-6 py-3 align-middle border-b border-slate-100 dark:border-slate-800">Client</th>
                  <th className="px-6 py-3 align-middle border-b border-slate-100 dark:border-slate-800">Site Name</th>
                  <th className="px-6 py-3 align-middle border-b border-slate-100 dark:border-slate-800 text-right">Final Amount</th>
                  <th className="px-6 py-3 align-middle border-b border-slate-100 dark:border-slate-800 text-center">Prepared By</th>
                  <th className="px-6 py-3 align-middle border-b border-slate-100 dark:border-slate-800">Revision</th>
                  <th className="px-6 py-3 align-middle border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredRecords.map((record) => (
                  <tr 
                    key={record.id} 
                    className="hover:bg-blue-50/20 dark:hover:bg-blue-900/10 transition-all group cursor-pointer"
                    onClick={() => router.push(`/pipeline-projects/${record.id}`)}
                  >
                    <td className="px-6 py-4 font-extrabold text-blue-600 dark:text-blue-400 group-hover:underline">
                      {record.quotationNo}
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">{record.quotationDate || '—'}</td>
                    <td className="px-6 py-4 text-slate-800 dark:text-slate-100 font-bold max-w-[250px] leading-snug">{record.client}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium max-w-[250px] leading-snug italic">{record.siteName || '—'}</td>
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-50 font-black text-right tabular-nums">{record.finalAmount || '—'}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="h-9 w-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-[11px] font-black flex items-center justify-center ring-4 ring-blue-50 dark:ring-blue-950/20 shadow-sm transition-transform group-hover:scale-110" title={record.preparedBy.name}>
                          {record.preparedBy.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-tighter">{record.preparedBy.date}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-black text-center">
                      <span className="px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">{record.revision}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 w-max ml-auto" onClick={(e) => e.stopPropagation()}>
                        <button className="text-slate-400 dark:text-slate-500 shadow-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30" title="Edit row">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-slate-400 dark:text-slate-500 shadow-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30" title="Delete row">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="text-slate-400 dark:text-slate-500 shadow-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-slate-900 dark:hover:text-slate-100 transition-all p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700" title="More Actions">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[200px] text-xs font-black uppercase tracking-widest p-2 rounded-2xl border-white/50 bg-white/90 backdrop-blur-xl dark:bg-slate-900/90 dark:border-white/10 shadow-2xl">
                            <DropdownMenuLabel className="text-[10px] text-slate-400 dark:text-slate-500 font-black px-2 pb-2">Project Control</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-blue-600 dark:text-blue-400 focus:text-blue-700 focus:bg-blue-50 dark:focus:bg-blue-900/30 transition-all" onClick={() => router.push(`/pipeline-projects/${record.id}`)}>
                              <ArrowRightLeft className="w-4 h-4" /> Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-sky-600 dark:text-sky-400 focus:text-sky-700 focus:bg-sky-50 dark:focus:bg-sky-900/30 transition-all">
                              <CheckCircle className="w-4 h-4" /> Close Project
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-blue-600 dark:text-blue-400 focus:text-blue-700 focus:bg-blue-50 dark:focus:bg-blue-900/30 transition-all">
                              <RefreshCcw className="w-4 h-4" /> Followups
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-blue-600 dark:text-blue-400 focus:text-blue-700 focus:bg-blue-50 dark:focus:bg-blue-900/30 transition-all">
                              <FileText className="w-4 h-4" /> Revisions
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-blue-800 dark:text-blue-200 focus:text-blue-900 focus:bg-blue-100 dark:focus:bg-blue-800/30 transition-all">
                              <FileSignature className="w-4 h-4" /> Options
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRecords.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                      No projects found matching your search.
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
