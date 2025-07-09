// components/ClientTable.tsx
'use client';

import { Client } from '@/types/client';
import { Pencil, Trash2 } from 'lucide-react';

interface Props {
  data: Client[];
}

export default function ClientTable({ data }: Props) {
  return (
    <div className="bg-white shadow rounded-md overflow-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3">Sr No.</th>
            <th className="p-3">SF ID</th>
            <th className="p-3">Client Name</th>
            <th className="p-3">Department Type</th>
            <th className="p-3">Checklist Status</th>
            <th className="p-3">Assigning User</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-4 text-center text-gray-500">
                No clients found.
              </td>
            </tr>
          ) : (
            data.map((client, index) => (
              <tr
                key={client.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{client.sfId}</td>
                <td className="p-3">{client.name}</td>
                <td className="p-3">{client.departmentType}</td>
                <td className="p-3">{client.checklistStatus}</td>
                <td className="p-3">{client.assigningUserId ?? '-'}</td>
                <td className="p-3">{client.status}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Pencil size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
