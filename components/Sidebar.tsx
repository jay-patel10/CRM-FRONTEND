'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Users, Settings, ListChecks } from 'lucide-react';

const menu = [
  { name: 'Client Management', href: '/clients', icon: Home },
  { name: 'User Management', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Audit Logs', href: '/logs', icon: ListChecks },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-55 bg-[#083B60] text-white flex flex-col p-4">
      {/* 🔧 Smaller logo and shifted slightly left */}
      <div className="mb-10">
        <img
          src="/pabs_logo_white.svg"
          alt="PABS Logo"
          className="h-9 w-auto ml-7" // 👈 logo size reduced (was h-12)
        />
      </div>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#0C4F6D] text-sm ${
                isActive ? 'bg-[#0A4563]' : ''
              }`}
            >
              <Icon size={16} /> {/* 👈 smaller icon */}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
