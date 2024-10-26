import { DM_Sans, Inter, Open_Sans, Pacifico, Poppins } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const pacifico = Pacifico({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});
