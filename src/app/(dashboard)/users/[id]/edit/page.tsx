import EditUserClient from './edit-user-client';

export const dynamicParams = false;

export async function generateStaticParams() {
  // Pre-generate a few IDs for the static build
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function EditUserPage() {
  return <EditUserClient />;
}
