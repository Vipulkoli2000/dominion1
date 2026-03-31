'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppButton } from '@/components/common';
import { SelectInput } from '@/components/common/select-input';
import { AppCard } from '@/components/common/app-card';
import { TextInput } from '@/components/common/text-input';
import { TextareaInput } from '@/components/common/textarea-input';
import { FormSection, FormRow } from '@/components/common/app-form';
import { toast } from '@/lib/toast';
import { useRouter } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';

const schema = z.object({
  quotationNo: z.string(),
  quotationDate: z.string().min(1, 'Quotation Date is required'),
  client: z.string().optional(),
  clientContactPerson: z.string().optional(),
  projectType: z.string().optional(),
  leadType: z.string().optional(),

  contactPerson: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().optional(),

  siteName: z.string().optional(),
  siteAddress1: z.string().optional(),
  siteCity: z.string().optional(),
  siteAddress2: z.string().optional(),
  sitePincode: z.string().optional(),

  billingName: z.string().optional(),
  billingAddress1: z.string().optional(),
  billingCity: z.string().optional(),
  billingAddress2: z.string().optional(),
  billingPincode: z.string().optional(),

  feesType: z.string().optional(),
  costPerSqFt: z.string().optional(),
  totalArea: z.string().optional(),
  architecturalFeesPercent: z.string().optional(),
  freeVisits: z.string().optional(),
  visitCharge: z.string().optional(),
  nextFollowupDate: z.string().optional(),

  architectCharges: z.string().optional(),
  architectChargesUnit: z.string().optional(),
  travelCharges: z.string().optional(),
  travelChargesUnit: z.string().optional(),
  lodgingCharges: z.string().optional(),
  lodgingChargesUnit: z.string().optional(),
  modelCharges: z.string().optional(),
  modelChargesUnit: z.string().optional(),
  simulationCharges: z.string().optional(),
  simulationChargesUnit: z.string().optional(),
  drawingCharges: z.string().optional(),
  drawingChargesUnit: z.string().optional(),

  note: z.string().optional(),
  inclusion: z.string().optional(),
  exclusion: z.string().optional(),

  preparedBy: z.string().optional(),

  tasks: z.array(z.object({
    task: z.string().optional(),
    feesType: z.string().optional(),
    days: z.string().optional(),
    order: z.string().optional(),
    percentage: z.string().optional(),
    fees: z.string().optional()
  })).optional()
});

type RawFormValues = z.infer<typeof schema>;

export function ProjectForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<RawFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      quotationNo: 'Q2025-26/00329',
      quotationDate: '',
      feesType: 'Percentage Basis',
      costPerSqFt: '',
      totalArea: '',
      architecturalFeesPercent: '',
      freeVisits: '',
      visitCharge: '0.00',
      architectCharges: '0.00',
      architectChargesUnit: 'Lumsum',
      travelCharges: '0.00',
      travelChargesUnit: 'Lumsum',
      lodgingCharges: '0.00',
      lodgingChargesUnit: 'Lumsum',
      modelCharges: '0.00',
      modelChargesUnit: 'Lumsum',
      simulationCharges: '0.00',
      simulationChargesUnit: 'Lumsum',
      drawingCharges: '0.00',
      drawingChargesUnit: 'Lumsum',
      tasks: [{ task: '', feesType: '', days: '', order: '', percentage: '', fees: '' }]
    },
  });

  const { control, handleSubmit, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks',
  });

  const costPerSqFt = parseFloat(watch('costPerSqFt') || '0');
  const totalArea = parseFloat(watch('totalArea') || '0');
  const architectPercent = parseFloat(watch('architecturalFeesPercent') || '0');

  const totalCostOfConstruction = (costPerSqFt * totalArea).toFixed(2);
  const calculatedFees = ((parseFloat(totalCostOfConstruction) * architectPercent) / 100).toFixed(2);

  async function onSubmit(data: RawFormValues) {
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Successfully saved!');
      router.push('/pipeline-projects');
    }, 800);
  }

  const unitOptions = [{ value: 'Lumsum', label: 'Lumsum' }, { value: 'Sq.Ft', label: 'Sq.Ft' }];

  return (
    <Form {...form}>
      <AppCard>
        <AppCard.Header className="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Plus className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <div>
              <AppCard.Title className="text-2xl font-black text-slate-950 dark:text-slate-50 tracking-tight">Add Strategic Project</AppCard.Title>
              <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mt-1">Global Pipeline Pipeline Integration</p>
            </div>
          </div>
        </AppCard.Header>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <AppCard.Content className="space-y-10 p-8">

            <FormSection legend="Strategic Matrix Overview" className="border-blue-100/50 dark:border-blue-900/30">
              <FormRow cols={2}>
                {/* Simulated disabled input matching UI mockup styling without strict TextInput restrictions */}
                <div className="flex flex-col gap-2 col-span-12 lg:col-span-1">
                  <label className="text-sm font-medium leading-none">Quotation No</label>
                  <input className="flex w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm shadow-sm opacity-70 cursor-not-allowed h-10" disabled value="Q2025-26/00329" />
                </div>
                <TextInput control={control} name="quotationDate" label="Quotation Date" type="date" required span={1} />
              </FormRow>
            </FormSection>

            <FormSection legend="Client Identification" className="border-blue-100/50 dark:border-blue-900/30">
              <FormRow cols={2}>
                <SelectInput control={control} name="client" label="Client" options={[{ value: 'c1', label: 'Client 1' }]} placeholder="Enter Client" span={1} />
                <SelectInput control={control} name="clientContactPerson" label="Contact Person" options={[{ value: 'p1', label: 'Person 1' }]} placeholder="Enter Contact Person" span={1} />
                <SelectInput control={control} name="projectType" label="Project Type" options={[{ value: 't1', label: 'Type 1' }]} placeholder="Enter Project Type" span={1} />
                <SelectInput control={control} name="leadType" label="Lead Type" options={[{ value: 'l1', label: 'Lead 1' }]} placeholder="Enter Lead Type" span={1} />
              </FormRow>
            </FormSection>

            <FormSection legend="Communication Logistics" className="border-blue-100/50 dark:border-blue-900/30">
              <FormRow cols={3}>
                <TextInput control={control} name="contactPerson" label="Contact Person" placeholder="Enter Contact Person" span={1} />
                <TextInput control={control} name="mobile" label="Mobile" placeholder="Enter Mobile" span={1} />
                <TextInput control={control} name="email" label="Email" type="email" placeholder="Enter Email" span={1} />
              </FormRow>
            </FormSection>

            <FormSection legend="Deployment Site Geographics" className="border-blue-100/50 dark:border-blue-900/30">
              <FormRow>
                <TextInput control={control} name="siteName" label="Site Name" placeholder="Enter Site Name" />
              </FormRow>
              <FormRow cols={2}>
                <TextInput control={control} name="siteAddress1" label="Address Line 1" placeholder="Enter Address Line 1" span={1} />
                <TextInput control={control} name="siteCity" label="City" placeholder="Enter City" span={1} />
              </FormRow>
              <FormRow cols={2}>
                <TextInput control={control} name="siteAddress2" label="Address Line 2" placeholder="Enter Address Line 2" span={1} />
                <TextInput control={control} name="sitePincode" label="Pincode" placeholder="Enter Pincode" span={1} />
              </FormRow>
            </FormSection>

            <FormSection legend="Financial Billing Nexus" className="border-blue-100/50 dark:border-blue-900/30">
              <FormRow>
                <TextInput control={control} name="billingName" label="Billing" placeholder="Enter Billing Name" />
              </FormRow>
              <FormRow cols={2}>
                <TextInput control={control} name="billingAddress1" label="Address Line 1" placeholder="Enter Address Line 1" span={1} />
                <TextInput control={control} name="billingCity" label="City" placeholder="Enter City" span={1} />
              </FormRow>
              <FormRow cols={2}>
                <TextInput control={control} name="billingAddress2" label="Address Line 2" placeholder="Enter Address Line 2" span={1} />
                <TextInput control={control} name="billingPincode" label="Pincode" placeholder="Enter Pincode" span={1} />
              </FormRow>
            </FormSection>

            <FormSection legend="Operational Analytics & Scoping" className="border-blue-100/50 dark:border-blue-900/30">
              <FormRow cols={2}>
                <SelectInput control={control} name="feesType" label="Fees Type" options={[{ value: 'Percentage Basis', label: 'Percentage Basis' }]} span={1} />
              </FormRow>
              <FormRow cols={5}>
                <TextInput control={control} name="costPerSqFt" label="Cost Of Const Per Sq.Ft(Rs)" type="number" span={1} />
                <TextInput control={control} name="totalArea" label="Total Const. Area" type="number" span={1} />
                <div className="flex flex-col gap-2 col-span-12 lg:col-span-1">
                  <label className="text-sm font-medium leading-none">Total Cost Of Construction (Rs)</label>
                  <input className="flex h-10 w-full rounded-md border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm opacity-70 cursor-not-allowed" disabled value={totalCostOfConstruction} />
                </div>
                <TextInput control={control} name="architecturalFeesPercent" label="Architectural Fees (%)" type="number" span={1} />
                <div className="flex flex-col gap-2 col-span-12 lg:col-span-1">
                  <label className="text-sm font-medium leading-none">Fees (Rs)</label>
                  <input className="flex h-10 w-full rounded-md border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm opacity-70 cursor-not-allowed" disabled value={calculatedFees} />
                </div>
              </FormRow>
              <FormRow cols={2}>
                <TextInput control={control} name="freeVisits" label="Free Visits" span={1} />
                <TextInput control={control} name="visitCharge" label="Visit Charge (Rs)" span={1} />
                <TextInput control={control} name="nextFollowupDate" label="Next Followup Date" type="date" span={1} />
              </FormRow>

              <FormRow cols={2}>
                <TextInput control={control} name="architectCharges" label="Architect Documentation & Communication Charges" span={1} />
                <SelectInput control={control} name="architectChargesUnit" label="Unit" options={unitOptions} span={1} />
              </FormRow>
              <FormRow cols={2}>
                <TextInput control={control} name="travelCharges" label="Travelling (To & Fro) Charges." span={1} />
                <SelectInput control={control} name="travelChargesUnit" label="Unit" options={unitOptions} span={1} />
              </FormRow>
              <FormRow cols={2}>
                <TextInput control={control} name="lodgingCharges" label="Lodging & Boarding Charges" span={1} />
                <SelectInput control={control} name="lodgingChargesUnit" label="Unit" options={unitOptions} span={1} />
              </FormRow>
              <FormRow cols={2}>
                <TextInput control={control} name="modelCharges" label="Models Presentation Charges" span={1} />
                <SelectInput control={control} name="modelChargesUnit" label="Unit" options={unitOptions} span={1} />
              </FormRow>
              <FormRow cols={2}>
                <TextInput control={control} name="simulationCharges" label="Computer Simulation Charges" span={1} />
                <SelectInput control={control} name="simulationChargesUnit" label="Unit" options={unitOptions} span={1} />
              </FormRow>
              <FormRow cols={2}>
                <TextInput control={control} name="drawingCharges" label="Drawing Presentation Charges" span={1} />
                <SelectInput control={control} name="drawingChargesUnit" label="Unit" options={unitOptions} span={1} />
              </FormRow>
            </FormSection>

            <FormSection legend="Strategic Narrative" className="border-blue-100/50 dark:border-blue-900/30">
              <FormRow>
                <TextareaInput control={control} name="note" label="Additional Notes" placeholder="Write a note..." rows={4} />
              </FormRow>
            </FormSection>

            <FormRow cols={2}>
              <FormSection legend="Strategic Inclusions" className="border-blue-100/50 dark:border-blue-900/30">
                <TextareaInput control={control} name="inclusion" label="Project Inclusions" placeholder="Inclusions..." rows={4} />
              </FormSection>
              <FormSection legend="Critical Exclusions" className="border-blue-100/50 dark:border-blue-900/30">
                <TextareaInput control={control} name="exclusion" label="Project Exclusions" placeholder="Exclusions..." rows={4} />
              </FormSection>
            </FormRow>

            <FormRow cols={3}>
              <SelectInput control={control} name="preparedBy" label="Prepared By" options={[{ value: 'dp', label: 'Darpan Powale' }]} />
            </FormRow>

            <FormSection legend="Execution Blueprint & Task Delegation" className="border-blue-100/50 dark:border-blue-900/30">
              <div className="border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-xl shadow-blue-500/5">
                <table className="w-full text-sm">
                  <thead className="bg-blue-50/50 dark:bg-blue-900/20 border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-left">Task Designation</th>
                      <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-left">Revenue Model</th>
                      <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-left">Timeline</th>
                      <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-left">Priority</th>
                      <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-left">Impact %</th>
                      <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-left">Value</th>
                      <th className="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center w-12">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {fields.map((field, index) => (
                      <tr key={field.id} className="bg-background">
                        <td className="p-2 pt-4 align-top">
                          <TextInput control={control} name={`tasks.${index}.task`} placeholder="Task Name" />
                        </td>
                        <td className="p-2 pt-4 align-top">
                          <SelectInput control={control} name={`tasks.${index}.feesType`} label="" placeholder="Select..." options={[{ value: 'Percentage', label: 'Percentage' }, { value: 'Lumsum', label: 'Lumsum' }]} />
                        </td>
                        <td className="p-2 pt-4 align-top">
                          <TextInput control={control} name={`tasks.${index}.days`} placeholder="Days" />
                        </td>
                        <td className="p-2 pt-4 align-top">
                          <TextInput control={control} name={`tasks.${index}.order`} placeholder="Order" />
                        </td>
                        <td className="p-2 pt-4 align-top">
                          <TextInput control={control} name={`tasks.${index}.percentage`} placeholder="%" />
                        </td>
                        <td className="p-2 pt-4 align-top">
                          <TextInput control={control} name={`tasks.${index}.fees`} placeholder="Fees" />
                        </td>
                        <td className="p-2 pt-4 align-top text-center">
                          <button type="button" onClick={() => remove(index)} className="text-destructive hover:text-destructive/80 mt-2 p-1 rounded-sm transition-colors mx-auto block">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-4 bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800">
                  <button type="button" onClick={() => append({ task: '', feesType: '', days: '', order: '', percentage: '', fees: '' })} className="flex items-center gap-2 text-[11px] text-blue-600 dark:text-blue-400 hover:text-blue-700 font-black uppercase tracking-widest transition-all">
                    <Plus className="h-4 w-4" strokeWidth={3} /> Add Mission Critical Task
                  </button>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <div className="w-64 space-y-3">
                  <div className="grid grid-cols-2 items-center gap-2">
                    <span className="text-sm text-right text-muted-foreground">Amount</span>
                    <input className="flex h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm transition-colors disabled:opacity-50" disabled value="0.00" />
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">CGST Rate %</span>
                      <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" placeholder="CGST Rate %" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">CGST Amount</span>
                      <input className="flex h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm transition-colors disabled:opacity-50" disabled value="0.00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">SGST Rate %</span>
                      <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" placeholder="SGST Rate %" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">SGST Amount</span>
                      <input className="flex h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm transition-colors disabled:opacity-50" disabled value="0.00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">IGST Rate %</span>
                      <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" placeholder="IGST Rate %" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">IGST Amount</span>
                      <input className="flex h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm transition-colors disabled:opacity-50" disabled value="0.00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2 pt-2 border-t">
                    <span className="text-sm text-right font-medium">Final Amount</span>
                    <input className="flex h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm disabled:opacity-50 font-medium" disabled value="0.00" />
                  </div>
                </div>
              </div>
            </FormSection>

          </AppCard.Content>
          <AppCard.Footer className="justify-end gap-3 p-8 bg-slate-50/30 dark:bg-slate-900/60 border-t border-slate-100 dark:border-white/5">
            <AppButton
              type="button"
              variant="secondary"
              onClick={() => router.push('/pipeline-projects')}
              disabled={submitting}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest px-8 rounded-2xl h-12 shadow-sm"
            >
              Discard Changes
            </AppButton>
            <AppButton
              type="submit"
              isLoading={submitting}
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest px-10 rounded-2xl h-12 shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]"
            >
              Finalize Project Integration
            </AppButton>
          </AppCard.Footer>
        </form>
      </AppCard>
    </Form>
  );
}
