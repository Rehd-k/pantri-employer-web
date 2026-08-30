import { Inter } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/components/marketing/ThemeProvider";
import { ThemeScript } from "@/components/marketing/ThemeScript";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pantri  A full table today. Room in your paycheck for tomorrow.",
    template: "%s | Pantri",
  },
  description:
    "Pantri helps you stock food now with payroll deductionsso you can eat well, cover bills, and invest. Buy in bulk before the next jump (in Nigeria, prices only go up), and your pantry stays full.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-full bg-pantri-background text-pantri-foreground antialiased">
        <ThemeScript />
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
