'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './i18n'
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr')
  const [lang, setLang] = useState('fr')

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'fr'
    setLang(savedLang)
    setDir(savedLang === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = savedLang
  }, [])

  return (
    <html lang={lang} dir={dir} className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        {/* SUPPRIME la barre de langue ici - plus de LanguageSwitcher */}
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}