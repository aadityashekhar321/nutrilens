import type { Metadata } from 'next';
import { Inter, DM_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchDialog from '@/components/search/SearchDialog';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

export const metadata: Metadata = {
  title: 'NutriLens | Next-Gen Nutrition Intelligence & Truth Engine',
  description: 'AI-powered nutrition intelligence. Decode misleading food labels, discover hidden ingredients, and compare products side-by-side.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${dmSans.variable} font-sans min-h-screen flex flex-col bg-[var(--background)] relative overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-500`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-full font-medium shadow-lg">
            Skip to content
          </a>

          {/* Ambient Lighting Orbs */}
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none -z-10 rounded-full animate-pulse-soft" />
          <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/5 via-emerald-500/5 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />

          {/* Floating Navigation Pill */}
          <Navbar />
          
          {/* Quick Search Dialog */}
          <SearchDialog />
          
          {/* Main App Viewport */}
          <div className="flex-1 flex flex-col w-full min-h-screen pt-16 sm:pt-20">
            <main id="main-content" className="flex-1 w-full">
              {children}
            </main>
            <Footer />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
