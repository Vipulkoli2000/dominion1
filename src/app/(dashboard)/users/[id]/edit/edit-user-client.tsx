'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiGet } from '@/lib/api-client';
import { toast } from '@/lib/toast';
import UserForm, { UserFormInitialData } from '@/app/(dashboard)/users/user-form';

export default function EditUserClient() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<UserFormInitialData | null>(null);

  useEffect(() => {
    // Mocking behavior for frontend-only project: skip apiGet to avoid 404
    setInitial({
      id: Number(id),
      name: id === '1' ? 'John Doe' : id === '2' ? 'Gaurav Bhatle' : 'Mock User',
      email: id === '1' ? 'john@example.com' : id === '2' ? 'gaurav@example.com' : 'mock@example.com',
      role: id === '1' ? 'admin' : 'employee',
      status: true,
    });
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className='p-6'>Loading...</div>;
  }
  return <UserForm mode='edit' initial={initial} />;
}
