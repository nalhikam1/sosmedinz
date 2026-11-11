import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'CuanStack - Pengelola Sosial Media Multi-Akun Tanpa Batas',
  description: 'Aplikasi pengelola multi-akun sosial media tanpa batas bergaya brutalism hijau muda untuk TikTok, Instagram, YouTube, Facebook, Threads, dan X dengan multi-platform matrix, batch scheduler, katalog hook cuan, dan revenue tracker.',
  openGraph: {
    title: 'CuanStack - Pengelola Sosial Media Multi-Akun Tanpa Batas',
    description: 'Aplikasi pengelola multi-akun sosial media tanpa batas bergaya brutalism hijau muda untuk TikTok, Instagram, YouTube, Facebook, Threads, dan X.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CuanStack - Pengelola Sosial Media Multi-Akun Tanpa Batas',
    description: 'Aplikasi pengelola multi-akun sosial media tanpa batas bergaya brutalism hijau muda.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
