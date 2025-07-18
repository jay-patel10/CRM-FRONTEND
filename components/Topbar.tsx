'use client';

import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { logoutUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Topbar() {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      router.push('/');
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Logout failed. Try again.');
    }
  };

  return (
    <div className="flex justify-between items-center px-6 py-2 border-b border-[#ccc] bg-white shadow-sm">
      {/* Left: Title */}
      <h1 className="text-lg font-semibold">Client Management</h1>

      {/* Right: Super Admin & Icon */}
      <div className="relative flex items-center gap-2">
        <span className="font-medium text-black">Super Admin</span>

        <button
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-black"
          onClick={() => setShowLogout(!showLogout)}
        >
          <i className="fa-solid fa-user" style={{ fontSize: '26px', color: '#444' }}></i>
        </button>

        {/* Dropdown Logout */}
        {showLogout && (
          <div className="absolute right-0 top-[48px] bg-white shadow-md rounded-md border w-32 z-20">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100 flex items-center gap-2"
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
