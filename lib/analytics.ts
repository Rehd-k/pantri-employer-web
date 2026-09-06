import { API_BASE_URL, getToken } from "@/lib/api";

const SESSION_KEY = "pantri_employer_analytics_session";

export const EmployerEvents = {
  LOGIN: "employer.login",
  DASHBOARD_VIEWED: "employer.dashboard_viewed",
  EMPLOYEE_LIST_VIEWED: "employer.employee_list_viewed",
  EMPLOYEE_INVITED: "employer.employee_invited",
  PAYROLL_VIEWED: "employer.payroll_viewed",
  PAYROLL_SUBMITTED: "employer.payroll_submitted",
  ORDERS_VIEWED: "employer.orders_viewed",
  ORDER_APPROVED: "employer.order_approved",
  ORDER_REJECTED: "employer.order_rejected",
  POLICY_VIEWED: "employer.policy_viewed",
  REPORT_VIEWED: "employer.report_viewed",
  EXPORT_PERFORMED: "employer.export_performed",
  ANALYTICS_VIEWED: "employer.analytics_viewed",
  INVOICES_VIEWED: "employer.invoices_viewed",
} as const;

function sessionId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = window.sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/** Fail-soft client analytics. Never throws. */
export function track(
  eventName: string,
  opts?: {
    entityType?: string;
    entityId?: string;
    metadata?: Record<string, unknown>;
  },
): void {
  if (typeof window === "undefined") return;
  const payload = {
    events: [
      {
        eventName,
        occurredAt: new Date().toISOString(),
        sessionId: sessionId(),
        platform: "web",
        appVersion: "employer-web",
        entityType: opts?.entityType,
        entityId: opts?.entityId,
        metadata: opts?.metadata ?? {},
      },
    ],
  };
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  void fetch(`${API_BASE_URL}/analytics/events`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    /* ignore */
  });
}

export function trackPage(eventName: string, metadata?: Record<string, unknown>) {
  track(eventName, { metadata });
}
