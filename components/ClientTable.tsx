'use client';

import { useState } from 'react';
import { Client } from '@/types/client';
import { Pencil, Trash2, FileText } from 'lucide-react';

interface Props {
  data: Client[];
  onEdit: (id: number) => void;
}

const ITEMS_PER_PAGE = 10;

export default function ClientTable({ data, onEdit }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedIds([]);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const ids = currentData.map((client) => String(client.id));
      setSelectedIds(ids);
    } else {
      setSelectedIds([]);
    }
  };

  const handleRowSelect = (id: number) => {
    const strId = String(id);
    setSelectedIds((prev) =>
      prev.includes(strId) ? prev.filter((item) => item !== strId) : [...prev, strId]
    );
  };

  return (
    <div className="bg-white shadow rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 w-10">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  onChange={handleSelectAll}
                  checked={
                    currentData.length > 0 &&
                    currentData.every((client) =>
                      selectedIds.includes(String(client.id))
                    )
                  }
                />
              </th>
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
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-500">
                  No clients found.
                </td>
              </tr>
            ) : (
              currentData.map((client, index) => (
                <tr
                  key={client.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      className="accent-blue-600"
                      checked={selectedIds.includes(String(client.id))}
                      onChange={() => handleRowSelect(client.id)}
                    />
                  </td>
                  <td className="p-3">{startIdx + index + 1}</td>
                  <td className="p-3">{client.sfId}</td>
                  <td className="p-3">{client.name}</td>
                  <td className="p-3">{client.departmentType}</td>
                  <td className="p-3">{client.checklistStatus}</td>
                  <td className="p-3">{client.assigningUserId ?? '-'}</td>
                  <td className="p-3">{client.status}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => onEdit(client.id)}
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800" title="Delete">
                        <Trash2 size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800" title="Document">
                        <FileText size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center p-4 bg-gray-50 text-sm text-gray-600">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-white border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-white border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
