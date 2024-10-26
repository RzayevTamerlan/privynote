import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { montserrat } from '@/fonts';

export const metadata: Metadata = {
  title: 'Privy Note',
  description: 'A simple note-taking app with end-to-end encryption. Create and share notes with anyone, without compromising your privacy.',
  keywords: ['note-taking', 'end-to-end encryption', 'privacy', 'notes', 'sharing'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${montserrat.className}`}
      >
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
