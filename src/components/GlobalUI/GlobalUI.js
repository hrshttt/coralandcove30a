"use client";

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';

export default function GlobalUI({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <ChatWidget />}
      {!isAdmin && <Footer />}
    </>
  );
}
