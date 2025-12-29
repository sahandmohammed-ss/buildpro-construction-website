import type { Metadata } from "next";
import "@/styles/globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from '@/components/ScrollToTop';
import ScrollHandler from '@/components/ScrollHandler';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "BuildPro - Premium Construction",
  description: "Building the future with excellence and innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ScrollHandler />
        <SmoothScroll>
          <CustomCursor />
          <ScrollToTop />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
