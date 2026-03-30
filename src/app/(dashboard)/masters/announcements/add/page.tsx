'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppCard } from '@/components/common/app-card';
import { AppButton } from '@/components/common/app-button';
import { NonFormTextInput } from '@/components/common/non-form-text-input';
import { ArrowLeft, Megaphone, Calendar, FileText, Tag, Eye, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AddAnnouncementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    priority: 'normal',
    startDate: '',
    endDate: '',
    visibleTo: 'all',
    status: 'active',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect back
    router.push('/masters/announcements');
  };

  return (
    <div className="p-4 sm:p-6 max-w-[900px] mx-auto min-h-[calc(100vh-theme(spacing.16))] w-full">
      <AppCard>
        <AppCard.Header className="flex flex-row items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/masters/announcements" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="space-y-1">
              <AppCard.Title>Add Announcement</AppCard.Title>
              <AppCard.Description>Create a new announcement for the organization.</AppCard.Description>
            </div>
          </div>
        </AppCard.Header>

        <form onSubmit={handleSubmit}>
          <AppCard.Content className="pt-0 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-primary" />
                Announcement Details
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Title <span className="text-destructive">*</span>
                  </label>
                  <NonFormTextInput
                    placeholder="Enter announcement title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5" />
                    Content <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    className="w-full min-h-[150px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                    placeholder="Enter announcement content..."
                    value={formData.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Classification */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                Classification
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <select
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                  >
                    <option value="">Select category</option>
                    <option value="general">General</option>
                    <option value="hr">HR</option>
                    <option value="it">IT</option>
                    <option value="finance">Finance</option>
                    <option value="operations">Operations</option>
                    <option value="safety">Safety</option>
                    <option value="event">Event</option>
                    <option value="policy">Policy</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Priority</label>
                  <select
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.priority}
                    onChange={(e) => handleChange('priority', e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Visibility & Dates */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                Visibility & Duration
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1">
                    <Globe className="h-3.5 w-3.5" />
                    Visible To
                  </label>
                  <select
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.visibleTo}
                    onChange={(e) => handleChange('visibleTo', e.target.value)}
                  >
                    <option value="all">All Employees</option>
                    <option value="admin">Admin Only</option>
                    <option value="managers">Managers & Above</option>
                    <option value="hr">HR Department</option>
                    <option value="finance">Finance Department</option>
                    <option value="operations">Operations Department</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Status</label>
                  <select
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </AppCard.Content>

          <AppCard.Footer className="flex items-center justify-end gap-3 pt-6 border-t border-border">
            <AppButton
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </AppButton>
            <AppButton
              type="submit"
              iconName="Save"
              isLoading={loading}
            >
              Save Announcement
            </AppButton>
          </AppCard.Footer>
        </form>
      </AppCard>
    </div>
  );
}
