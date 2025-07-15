// app/layout.tsx
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Management System',
  description: 'Manage clients and departments efficiently',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex h-screen overflow-hidden text-black bg-white">
        {/* Full height, solid sidebar background */}
        <div className="w-64 shrink-0 h-full bg-[#013c59] text-white">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1 h-full">
          <div className="border-b border-gray-200">
            <Topbar />
          </div>
          <main className="flex-1 overflow-auto bg-gray-100 p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
