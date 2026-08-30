import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Employer Portal",
  description: "Manage payroll-backed credit, policy, and orders for your team.",
};

export default function PortalLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
