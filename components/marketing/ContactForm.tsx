"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "next/navigation";

export const CONTACT_TOPICS = [
  "General",
  "Employer enquiry",
  "Business/Sales",
  "Payroll",
  "Supplier",
  "Support",
  "Careers",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

function normalizeTopic(raw: string | null): ContactTopic {
  if (!raw) return "General";
  const match = CONTACT_TOPICS.find(
    (t) => t.toLowerCase() === raw.toLowerCase() || t.toLowerCase().includes(raw.toLowerCase()),
  );
  return match ?? "General";
}

export function ContactForm({ defaultTopic }: { defaultTopic?: string } = {}) {
  const searchParams = useSearchParams();
  const topicFromQuery = normalizeTopic(defaultTopic ?? searchParams.get("topic"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState<ContactTopic>(topicFromQuery);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setTopic(topicFromQuery);
  }, [topicFromQuery]);

  function validate() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required";
    if (!email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email";
    if (!message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      // Phase 1: client-only success (no backend contact API yet)
      await new Promise((r) => setTimeout(r, 600));
      setSuccess(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or email support@pantri.app.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="pantri-card p-8 text-center sm:p-10">
        <p className="text-lg font-bold text-pantri-foreground">Thank you  message received</p>
        <p className="mt-3 text-sm leading-relaxed text-pantri-muted">
          We&apos;ll be back to you within 1 business day. For employer onboarding, our team will
          guide your organisation through setup  companies are not self-registered on the website.
        </p>
        <button
          type="button"
          onClick={() => {
            setSuccess(false);
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setTopic("General");
          }}
          className="mt-6 text-sm font-semibold text-pantri-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="pantri-card space-y-5 p-6 sm:p-8" noValidate>
      {submitError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
          {submitError}
        </p>
      ) : null}

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-pantri-muted">Name</span>
        <input
          className="pantri-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-pantri-muted">Email</span>
        <input
          type="email"
          className="pantri-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-pantri-muted">
          Phone <span className="font-normal">(optional)</span>
        </span>
        <input
          type="tel"
          className="pantri-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-pantri-muted">Topic</span>
        <select
          className="pantri-input"
          value={topic}
          onChange={(e) => setTopic(e.target.value as ContactTopic)}
        >
          {CONTACT_TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-pantri-muted">Message</span>
        <textarea
          className="pantri-input min-h-32 resize-y"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
        />
        {errors.message ? <p className="mt-1 text-xs text-red-600">{errors.message}</p> : null}
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-pantri-accent px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
