'use client';

import { useState } from 'react';
import { Pencil, Trash2, FileText } from 'lucide-react';
import { Client } from '@/types/client';

interface Props {
  data: Client[];
  onEdit?: (id: number) => void;
  isLoading?: boolean;
}

const ITEMS_PER_PAGE = 10;

export default function ClientTable({ data, onEdit, isLoading }: Props) {
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

  if (isLoading) {
    return (
      <div className="bg-white p-4 text-center text-gray-500 border border-gray-200">
        Loading clients...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-300 bg-white">
      <table className="min-w-full text-sm text-left table-fixed">
        <thead className="bg-[#f6f7fa] text-[#1f2937] border-b border-gray-300">
          <tr>
            <th className="px-5 py-4 w-10">
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-blue-600"
                onChange={handleSelectAll}
                checked={
                  currentData.length > 0 &&
                  currentData.every((client) => selectedIds.includes(String(client.id)))
                }
              />
            </th>
            <th className="px-4 py-3 font-semibold text-gray-800">Sr No.</th>
<th className="px-4 py-3 font-semibold text-gray-800">SF ID</th>
<th className="px-4 py-3 font-semibold text-gray-800">Client Name</th>
<th className="px-4 py-3 font-semibold text-gray-800">Department Type</th>
<th className="px-4 py-3 font-semibold text-gray-800">Checklist Status</th>
<th className="px-4 py-3 font-semibold text-gray-800">Assigning User</th>
<th className="px-4 py-3 font-semibold text-gray-800">Status</th>
<th className="px-4 py-3 font-semibold text-gray-800">Actions</th>

          </tr>
        </thead>
        <tbody className="text-gray-700">
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-4 text-gray-500">
                No clients found.
              </td>
            </tr>
          ) : (
            currentData.map((client, index) => (
              <tr
                key={client.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-5 py-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer accent-blue-600"
                    checked={selectedIds.includes(String(client.id))}
                    onChange={() => handleRowSelect(client.id)}
                  />
                </td>
          <td className="px-4 py-3 text-gray-700 font-normal">{startIdx + index + 1}</td>
<td className="px-4 py-3 text-gray-700 font-normal">{client.sfId}</td>
<td className="px-4 py-3 text-gray-700 font-normal">{client.name}</td>
<td className="px-4 py-3 text-gray-700 font-normal">{client.departmentType}</td>
<td className="px-4 py-3 text-gray-700 font-normal">{client.checklistStatus}</td>
<td className="px-4 py-3 text-gray-700 font-normal">{client.assigningUserId ?? '-'}</td>
<td className="px-4 py-3 text-gray-700 font-normal">{client.status}</td>

                <td className="px-2 py-2">
                  <div className="flex items-center gap-2">
                    <button
                      className="text-gray-600 hover:text-gray-800"
                      onClick={() => onEdit?.(client.id)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Trash2 size={16} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <FileText size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-2 bg-[#f6f7fa] text-sm border-t border-gray-300">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-400 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-400 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
