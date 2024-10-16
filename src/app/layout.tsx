import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { siteMetadata } from '@/data/siteMetadata';
import SectionContainer from '@/layouts/SectionContainer';
import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';

const pretendard = localFont({
  src: './fonts/Pretendard-Regular.woff2',
  variable: '--font-pretendard-regular',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteMetadata.language} className={`${pretendard.variable} scroll-smooth`}>
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <SectionContainer>
          <Header />
          <main className="mb-auto">{children}</main>
          <Footer />
        </SectionContainer>
      </body>
    </html>
  );
}
