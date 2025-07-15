'use client';

import { useState, useEffect } from 'react';
import ClientDrawer from '@/components/ClientDrawer';
import ClientTable from '@/components/ClientTable';
import { getClientById } from '@/lib/api'; // adjust to your API
import type { ClientType } from '@/types';

export default function ClientsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<ClientType | null>(null);

  // Call this to add new client
  const handleAdd = () => {
    setClientToEdit(null);
    setEditMode(false);
    setIsDrawerOpen(true);
  };

  // Call this to edit client
  const handleEdit = async (id: string) => {
    try {
      const client = await getClientById(id);
      setClientToEdit(client);
      setEditMode(true);
      setIsDrawerOpen(true);
    } catch (err) {
      console.error('Failed to load client:', err);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setClientToEdit(null);
    setEditMode(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Clients</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Client
        </button>
      </div>

      {/* Pass handleEdit to ClientTable */}
      <ClientTable onEdit={handleEdit} />

      {/* Drawer shared for add/edit */}
      <ClientDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        initialData={clientToEdit}
        editMode={editMode}
      />
    </div>
  );
}
