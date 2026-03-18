'use client';

import { AppCard } from '@/components/common/app-card';
import { FilterBar } from '@/components/common';
import { AppButton } from '@/components/common/app-button';
import { NonFormTextInput } from '@/components/common/non-form-text-input';
import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

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
      <AppCard>
        <AppCard.Header className="flex flex-row items-center justify-between pb-4">
          <div className="space-y-1">
            <AppCard.Title>Pipeline Projects</AppCard.Title>
            <AppCard.Description>Manage pipeline projects and quotations.</AppCard.Description>
          </div>
          <AppCard.Action>
            <Link href="/pipeline-projects/add">
              <AppButton size="sm" iconName="Plus" type="button">
                Add
              </AppButton>
            </Link>
          </AppCard.Action>
        </AppCard.Header>
        <AppCard.Content className="pt-0">
          <FilterBar title="Search & Filter">
            <div className="flex w-full gap-2 items-center">
              <NonFormTextInput
                aria-label="Search projects"
                placeholder="Search projects by client or quotation no..."
                value={searchDraft}
                onChange={(e) => setSearchDraft(e.target.value)}
                containerClassName="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <AppButton size="sm" className="min-w-[84px]" onClick={handleSearch}>
                Search
              </AppButton>
              {(searchDraft || search) ? (
                <AppButton
                  variant="secondary"
                  size="sm"
                  onClick={handleReset}
                  className="min-w-[84px]"
                >
                  Reset
                </AppButton>
              ) : null}
            </div>
          </FilterBar>

          <div className="overflow-x-auto border-t border-border mt-4">
            <table className="w-full text-sm text-left">
              <thead className="text-[13px] text-muted-foreground bg-muted/40 font-semibold align-top h-11">
                <tr>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border">Quotation No</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border">Quotation Date</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border">Client</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border">Site Name</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border text-right">Final Amount</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border">Prepared By</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border">Revision</th>
                  <th className="px-4 py-3 align-middle font-medium border-b border-border">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-muted/50 transition-colors group">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {record.quotationNo}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{record.quotationDate || '—'}</td>
                    <td className="px-4 py-3 text-foreground max-w-[250px] leading-snug">{record.client}</td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[250px] leading-snug">{record.siteName || '—'}</td>
                    <td className="px-4 py-3 text-foreground text-right tabular-nums">{record.finalAmount || '—'}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-sm bg-primary/10 px-2 py-[2px] text-[11px] font-medium text-primary ring-1 ring-inset ring-primary/20">
                        {record.preparedBy.name}
                      </span>
                      <div className="text-[11px] text-muted-foreground mt-1 tracking-tight">{record.preparedBy.date}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{record.revision}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1 w-max">
                        <div className="flex gap-1">
                          <button className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 text-[11px] font-medium px-2 py-0.5 rounded transition-colors ring-1 ring-inset ring-orange-500/20">Convert</button>
                          <button className="bg-destructive/10 hover:bg-destructive/20 text-destructive text-[11px] font-medium px-2 py-0.5 rounded transition-colors ring-1 ring-inset ring-destructive/20">Closed</button>
                          <button className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 text-[11px] font-medium px-2 py-0.5 rounded transition-colors ring-1 ring-inset ring-emerald-500/20">Followups</button>
                        </div>
                        <div className="flex gap-1 mt-0.5">
                          <button className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 text-[11px] font-medium px-2 py-0.5 rounded transition-colors ring-1 ring-inset ring-emerald-500/20">Revisions</button>
                          <button className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 text-[11px] font-medium px-2 py-0.5 rounded transition-colors ring-1 ring-inset ring-blue-500/20">Quotation</button>
                          <button className="text-muted-foreground hover:text-primary transition-colors p-1 rounded-sm hover:bg-muted">
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-sm hover:bg-muted">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
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
