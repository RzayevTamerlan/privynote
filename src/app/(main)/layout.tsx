import { Header } from '@components/header';
import { ThemeProvider } from '@providers/ThemeProvider';
import type { ReactNode } from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <Header />
      {children}
    </ThemeProvider>
  );
}
