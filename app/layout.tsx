import './globals.css';
import { Syncopate, Space_Grotesk } from 'next/font/google';
import { Providers } from '../components/Providers';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// The wide, aggressive header font
const syncopate = Syncopate({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-syncopate'
});

// The technical, brutalist body font
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space'
});

export const metadata = {
  title: '7 HOUSES | SYNDICATE',
  description: 'Premium Streetwear Drop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Apply the new fonts globally */}
      <body className={`${spaceGrotesk.className} ${syncopate.variable} bg-black text-white`} suppressHydrationWarning>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}