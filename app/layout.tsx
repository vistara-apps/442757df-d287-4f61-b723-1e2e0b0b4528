import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pocket Justice - Your rights, right in your pocket',
  description: 'A mobile app for non-technical users to quickly access legal scripts and documentation tools during encounters with law enforcement.',
  keywords: ['legal rights', 'law enforcement', 'mobile app', 'legal scripts', 'emergency'],
  authors: [{ name: 'Pocket Justice Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e40af',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
