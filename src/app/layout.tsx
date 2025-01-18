import type { Metadata } from "next";
import "./globals.css";
import Cursor from "../components/Cursor";
import localFont from 'next/font/local'


 
const Voyage = localFont({
  src: '../../public/fonts/Voyage.woff2',
  variable: "--font-voyage",
})

const Kobe = localFont({ 
  src:"../../public/fonts/Kobe.woff2",
  variable: "--font-kobe",
})
const Kobe2 = localFont({ 
  src:"../../public/fonts/KobeLight.woff2",
  variable: "--font-kobe2",
})
export const metadata: Metadata = {
  title: "Soul Buddy",
  description:
    "SoulBuddy - AI-Powered Spiritual Guide is a platform blending ancient wisdom with modern AI to provide personalized astrology and numerology insights. Features include Kundali charts, horoscopes, gemstone and ritual recommendations, and an AI chatbot for spiritual guidance. Built using Astra DB and LangFlow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Kobe2.variable} antialiased cursor-none ${Voyage.variable} ${Kobe.variable} bg-[#fdfdfb] text-[#3d3d3b] `}
      >
        <Cursor />
        {children}
      </body>
    </html>
  );
}
