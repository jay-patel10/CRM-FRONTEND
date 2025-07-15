// components/ClientDrawer.tsx
'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import ClientForm from './ClientForm';

export default function ClientDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="flex-1 bg-black/40" onClick={onClose}></div>

      {/* Drawer */}
      <div className="w-full max-w-md bg-white shadow-lg h-full overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Client</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <ClientForm onClose={onClose} />
      </div>
    </div>
  );
}
