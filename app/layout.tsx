import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import EntranceWrapper from '@/components/entrance/EntranceWrapper';
import VideoPreloadHead from '@/components/entrance/VideoPreloadHead';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nealy's Event Decor - Luxury Event Rentals & Custom Fabrication",
  description: 'Transform your events with luxury rentals and custom fabrication from Nealy\'s Event Decor.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <head>
          <VideoPreloadHead />
        </head>
        <EntranceWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </EntranceWrapper>
      </body>
    </html>
  );
}