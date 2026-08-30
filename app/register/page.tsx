"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Public employer self-registration is disabled.
 * Organisations are onboarded by Pantri; employers only log in once invited.
 */
export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/contact?topic=Employer%20enquiry");
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <p className="text-sm text-slate-600">
        Employer accounts are created by Pantri — redirecting you to contact…
      </p>
      <Link
        href="/contact?topic=Employer%20enquiry"
        className="mt-4 text-sm font-semibold text-emerald-700 hover:underline"
      >
        Continue to contact
      </Link>
      <p className="mt-6 text-sm text-slate-500">
        Already onboarded?{" "}
        <Link href="/login" className="font-medium text-emerald-700">
          Sign in
        </Link>
      </p>
    </div>
  );
}
