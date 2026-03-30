'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppCard } from '@/components/common/app-card';
import { AppButton } from '@/components/common/app-button';
import { NonFormTextInput } from '@/components/common/non-form-text-input';
import { ArrowLeft, Building2, Mail, Phone, MapPin, User, FileText } from 'lucide-react';
import Link from 'next/link';

export default function AddClientInformationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    contactPerson: '',
    email: '',
    phone: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstNumber: '',
    panNumber: '',
    website: '',
    industry: '',
    notes: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect back to masters or show success
    router.push('/masters/client-information');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-theme(spacing.16))] w-full">
      <AppCard>
        <AppCard.Header className="flex flex-row items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/masters/client-information" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="space-y-1">
              <AppCard.Title>Add Client Information</AppCard.Title>
              <AppCard.Description>Create a new client record in the system.</AppCard.Description>
            </div>
          </div>
        </AppCard.Header>

        <form onSubmit={handleSubmit}>
          <AppCard.Content className="pt-0">
            {/* Basic Information */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Client Name <span className="text-destructive">*</span>
                  </label>
                  <NonFormTextInput
                    placeholder="Enter client company name"
                    value={formData.clientName}
                    onChange={(e) => handleChange('clientName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    Contact Person
                  </label>
                  <NonFormTextInput
                    placeholder="Enter contact person name"
                    value={formData.contactPerson}
                    onChange={(e) => handleChange('contactPerson', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    Email Address
                  </label>
                  <NonFormTextInput
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5" />
                    Phone Number
                  </label>
                  <NonFormTextInput
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Mobile Number</label>
                  <NonFormTextInput
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={(e) => handleChange('mobile', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Website</label>
                  <NonFormTextInput
                    placeholder="Enter website URL"
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-6 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2 lg:col-span-3">
                  <label className="text-sm font-medium text-foreground">Full Address</label>
                  <textarea
                    className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                    placeholder="Enter complete address"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">City</label>
                  <NonFormTextInput
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">State</label>
                  <NonFormTextInput
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Pincode</label>
                  <NonFormTextInput
                    placeholder="Enter pincode"
                    value={formData.pincode}
                    onChange={(e) => handleChange('pincode', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Tax & Legal Information */}
            <div className="mb-6 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Tax & Legal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">GST Number</label>
                  <NonFormTextInput
                    placeholder="Enter GST number"
                    value={formData.gstNumber}
                    onChange={(e) => handleChange('gstNumber', e.target.value.toUpperCase())}
                    maxLength={15}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">PAN Number</label>
                  <NonFormTextInput
                    placeholder="Enter PAN number"
                    value={formData.panNumber}
                    onChange={(e) => handleChange('panNumber', e.target.value.toUpperCase())}
                    maxLength={10}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Industry Type</label>
                  <NonFormTextInput
                    placeholder="Enter industry type"
                    value={formData.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Additional Information
              </h3>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Notes / Remarks</label>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                  placeholder="Enter any additional notes or remarks about the client..."
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                />
              </div>
            </div>
          </AppCard.Content>

          <AppCard.Footer className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <AppButton
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </AppButton>
            <AppButton
              type="submit"
              iconName="Save"
              isLoading={loading}
            >
              Save Client
            </AppButton>
          </AppCard.Footer>
        </form>
      </AppCard>
    </div>
  );
}
