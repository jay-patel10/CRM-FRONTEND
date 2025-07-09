import './globals.css';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Topbar />
          <main className="p-4 bg-gray-100 flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
