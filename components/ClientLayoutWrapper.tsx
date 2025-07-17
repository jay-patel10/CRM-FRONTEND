'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/' || pathname.startsWith('/otp');

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar (only if not on login/OTP) */}
      {!isAuthPage && <Sidebar />}

      {/* Main content layout */}
      <div className="flex flex-col flex-1 h-full">
        {!isAuthPage && <Topbar />}

        {/* This container scrolls, not the whole screen */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-0">
          {children}
        </div>
      </div>
    </div>
  );
}
