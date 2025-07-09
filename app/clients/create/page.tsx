'use client';

import ClientForm from '@/components/ClientForm';
import Link from 'next/link';

export default function CreateClientPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Add New Client</h2>
        <Link href="/clients" className="text-sm text-blue-600 hover:underline">
          ← Back to Client List
        </Link>
      </div>
      <ClientForm />
    </div>
  );
}
