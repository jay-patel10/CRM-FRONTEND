import './globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import type { Metadata } from 'next';

// ✅ Define metadata with favicon
export const metadata: Metadata = {
  title: 'Client Management | PABS',
  description: 'Pacific Accounting & Business Services',
  icons: {
    icon: '/favicon.ico', // Make sure favicon.ico is inside /public folder
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
