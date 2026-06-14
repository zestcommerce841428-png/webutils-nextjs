import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Box } from '@mui/material';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WebUtils - 1000+ Free Online Tools',
  description: 'Privacy-first collection of 1000+ online tools. All processing happens in your browser. No data upload. Works offline.',
  keywords: ['online tools', 'web tools', 'converters', 'generators', 'calculators', 'privacy', 'offline'],
  authors: [{ name: 'WebUtils' }],
  openGraph: {
    title: 'WebUtils - 1000+ Free Online Tools',
    description: 'Privacy-first online tools that work entirely in your browser',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
