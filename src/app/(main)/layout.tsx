import type { ReactNode } from 'react';
import { Header } from '@components/header';
import { ThemeProvider } from '@providers/ThemeProvider';

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
