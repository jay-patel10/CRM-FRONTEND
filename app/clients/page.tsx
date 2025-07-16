'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Client } from '@/types/client';
import ClientTable from '@/components/ClientTable';

export default function ClientListPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔐 Route protection
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')?.trim();

    console.log('🔐 Auth check | token:', token, '| role:', role);

    if (!token || role !== 'Super Admin') {
      alert('Access denied. Please login as Super Admin.');
      router.push('/');
    } else {
      fetchClients();
    }
  }, []);

  const fetchClients = async () => {
    try {
      const res = await api.get('/clients');
      setClients(res.data.data);
    } catch (err) {
      console.error('❌ Failed to fetch clients:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">All Clients</h2>
        <Link
          href="/clients/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Client
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
          <ClientTable
            data={clients}
            onEdit={(id) => {
              console.log('Edit client ID:', id);
              // Optionally redirect or open drawer here
            }}
          />
      )}
    </div>
  );
}
