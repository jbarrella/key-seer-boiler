import '@/styles/global.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';

import Footer from '@/components/global/Footer';
import Header from '@/components/global/header/Header';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="font-notojp">
        <body className="bg-background text-foreground scroll-behavior:smooth min-h-screen">
          <Header />
          <main className="flex min-h-[70vh] flex-col items-center">{props.children}</main>
          <Footer />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
