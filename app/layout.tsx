import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./lib/ThemeProvider";
import { ThemeScript } from "./lib/theme-script";
import { GoogleAnalytics } from "./lib/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Blog - Personal Thoughts and Projects",
  description: "A personal blog sharing my thoughts, projects and photography",
  authors: [{ name: "Your Name" }],
  keywords: ["blog", "web development", "design", "photography", "minimalist"],
  creator: "Your Name",
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: "My Blog",
    description: "A personal blog sharing my thoughts, projects and photography",
    url: "https://example.com",
    siteName: "My Blog",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Blog",
    description: "A personal blog sharing my thoughts, projects and photography",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <GoogleAnalytics />
      <ThemeScript />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-[#111] text-black dark:text-white min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
