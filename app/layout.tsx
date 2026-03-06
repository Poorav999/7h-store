import type { Metadata } from "next";
import { Space_Grotesk, Syncopate } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import CustomCursor from "@/components/CustomCursor";
import Noise from "@/components/Noise";
import StatusBar from "@/components/StatusBar";
import Preloader from "@/components/Preloader";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const syncopate = Syncopate({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-syncopate" });

export const metadata: Metadata = {
  title: "7HOUSES | SYNDICATE",
  description: "Exclusive Drops",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body 
        className={`${spaceGrotesk.variable} ${syncopate.variable} font-sans bg-black text-white cursor-none selection:bg-red-600 selection:text-white`}
        suppressHydrationWarning
      >
        <Providers>
          <Preloader />
          <CustomCursor />
          <Noise />
          <Navbar /> 
          {children}
          <Footer />
          <StatusBar />
        </Providers>
      </body>
    </html>
  );
}