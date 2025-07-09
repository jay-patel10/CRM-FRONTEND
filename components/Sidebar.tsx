// components/Sidebar.tsx
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
    <aside className="w-64 bg-[#083B60] text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-10">🌀 PABS</div>
      <nav className="flex flex-col gap-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-600 ${
                isActive ? 'bg-blue-700' : ''
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
