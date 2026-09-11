import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Industrial Intelligence — AI, Data & Automation',
  description: 'Industrial AI, data engineering and automation systems built around real operational problems.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
