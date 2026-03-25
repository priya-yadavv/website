import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Providers } from "@/components/Providers";
import CommandPalette from "@/components/CommandPalette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LuminaCode",
  description: "Agentic AI Code Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative text-primary bg-background">
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <CommandPalette />
          
          {/* Global Ambient Network */}
          <div className="fixed inset-0 z-[0] pointer-events-none transition-opacity duration-1000">
             {/* Dark Mode Gradient (Wine Red Dominant) */}
             <div className="absolute inset-0 hidden dark:block opacity-[0.35] mix-blend-screen">
                <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#561C24] rounded-full blur-[140px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-[#6D2932] rounded-full blur-[180px]" />
                <div className="absolute top-[20%] right-[10%] w-[20vw] h-[20vw] bg-[#C7B7A3] rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] left-[20%] w-[30vw] h-[30vw] bg-[#E8D8C4] opacity-50 rounded-full blur-[120px]" />
             </div>
             {/* Light Mode Gradient (Cream/Beige Dominant) */}
             <div className="absolute inset-0 block dark:hidden opacity-[0.6] mix-blend-multiply">
                <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#561C24] opacity-20 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#6D2932] opacity-30 rounded-full blur-[180px]" />
                <div className="absolute top-[10%] right-[5%] w-[60vw] h-[60vw] bg-[#C7B7A3] rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[15%] w-[70vw] h-[70vw] bg-[#E8D8C4] rounded-full blur-[140px]" />
             </div>
          </div>

          <div className="relative z-10">
            <Navbar />
            <div className="flex-1 mt-20">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
