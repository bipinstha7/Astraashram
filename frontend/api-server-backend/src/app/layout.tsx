import type { Metadata } from 'next';
import { Onest } from 'next/font/google';

import './globals.scss';
import ReactQueryProvider from '../providers/reactQueryProvider';

const onest = Onest({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Astra-asan',
  description: 'Book or rent property',
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={onest.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
