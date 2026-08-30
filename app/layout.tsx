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
    default: "Pantri — Get the food you need today. Pay from your salary.",
    template: "%s | Pantri",
  },
  description:
    "Pantri helps employees buy groceries, family food packages and event supplies today, while convenient payroll deductions spread the cost over time.",
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
