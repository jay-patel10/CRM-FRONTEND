// components/Topbar.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { logoutUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Topbar() {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser(); // 🔐 Hit logout API

      // 🧹 Clear stored session
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');

      console.log('✅ Logged out successfully');

      router.push('/');
    } catch (err) {
      console.error('❌ Logout failed:', err);
      alert('Logout failed. Try again.');
    }
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 border-b bg-white shadow-sm">
      <h1 className="text-xl font-semibold">Client Management</h1>
      <div className="relative">
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <User className="w-5 h-5" />
          <span className="font-medium">Super Admin</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 bg-white shadow rounded-md w-40 z-10 border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
