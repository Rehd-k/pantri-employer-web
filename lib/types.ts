// Mirrors of backend DTOs (see backend/src/**/dto/*.dto.ts). Keep in sync
// with the NestJS source of truth  never guess shapes independently.

export type UserRole = "ADMIN" | "EMPLOYER" | "EMPLOYEE" | "SUPPLIER" | "LOGISTICS";
export type UserStatus = "ACTIVE" | "PENDING_APPROVAL" | "SUSPENDED";

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  employerId: string | null;
  employerName: string | null;
  employerInviteCode: string | null;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

export interface RegisterEmployerInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
}

export type OverLimitAction = "REJECT" | "REQUIRE_APPROVAL";
export type OverDurationAction =
  | "REJECT"
  | "REQUIRE_APPROVAL"
  | "SUGGEST_WAIT"
  | "ALLOW_HIGHER_DEDUCTION";

export interface CreditPolicy {
  employerId: string;
  version: number;
  defaultDeductionPercent: number;
  minDeductionPercent: number;
  maxDeductionPercent: number;
  employeeMaySetDeductionPercent: boolean;
  creditMultiplierBps: number;
  maxRepaymentMonths: number;
  reservationTtlHours: number;
  approvalTtlHours: number;
  interestAnnualRateBps: number;
  interestGraceDays: number;
  penaltiesEnabled: boolean;
  minDaysBetweenPurchases: number;
  maxPurchasesInWindow: number;
  purchaseWindowDays: number;
  requirePriorDeductionAfterFirst: boolean;
  overLimitAction: OverLimitAction;
  overDurationAction: OverDurationAction;
  approvalThresholdKobo: number | null;
  requireApprovalFirstPurchase: boolean;
  requireApprovalHighRisk: boolean;
  highRiskScoreThreshold: number;
  consecutiveMissesBeforeFreeze: number;
  updatedAt: string;
}

export type UpdateCreditPolicyInput = Partial<
  Omit<CreditPolicy, "employerId" | "version" | "updatedAt">
>;

export type PayrollRunStatus =
  | "DRAFT"
  | "GENERATED"
  | "EMPLOYER_REVIEW"
  | "CONFIRMED"
  | "PROCESSING"
  | "COMPLETED"
  | "PARTIALLY_COMPLETED"
  | "FAILED"
  | "CANCELLED";

export type PayrollDeductionLineStatus = "PENDING" | "MISSED" | "REMITTED" | "REVERSED";

export interface PayrollRun {
  id: string;
  employerId: string;
  periodStart: string;
  periodEnd: string;
  payrollDate: string;
  status: PayrollRunStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PayrollDeductionLine {
  id: string;
  employeeId: string;
  salarySnapshotKobo: number;
  deductionPercentSnapshot: number;
  requestedKobo: number;
  collectedKobo: number;
  status: PayrollDeductionLineStatus;
}

export interface PayrollRunDetail extends PayrollRun {
  lines: PayrollDeductionLine[];
}

export interface EmployerBalanceSummary {
  employerId: string;
  totalAccounts: number;
  activeAccounts: number;
  totalCreditLimitKobo: number;
  totalPrincipalOutstandingKobo: number;
  totalPostedInterestKobo: number;
  totalPostedFeesKobo: number;
  totalPostedPenaltiesKobo: number;
  totalReservedKobo: number;
  totalAvailableKobo: number;
  totalExposureKobo: number;
}

export type CreditAccountStatus = "ACTIVE" | "FROZEN" | "CLOSED";

export interface EmployeeExposureLine {
  employeeId: string;
  salaryKobo: number;
  creditLimitKobo: number;
  exposureKobo: number;
  reservedKobo: number;
  availableKobo: number;
  utilizationPercent: number;
  consecutiveMissedDeductions: number;
  status: CreditAccountStatus;
}

export interface EmployerExposureBreakdown {
  employerId: string;
  totalExposureKobo: number;
  employees: EmployeeExposureLine[];
}

export type OrderFulfillmentStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "PROCESSING"
  | "READY_FOR_PICKUP"
  | "OUT_FOR_DELIVERY"
  | "FULFILLED"
  | "CANCELLED"
  | "EXPIRED";

export type OrderCreditStatus =
  | "NONE"
  | "RESERVED"
  | "PARTIALLY_CAPTURED"
  | "CAPTURED"
  | "PARTIALLY_RELEASED"
  | "RELEASED"
  | "PARTIALLY_REFUNDED"
  | "REFUNDED";

export interface EmployerOrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  fulfilledQuantity: number;
  unitPriceKobo: number;
  lineTotalKobo: number;
}

export interface EmployerOrder {
  id: string;
  employeeId: string;
  employerId: string;
  pickupPointId: string;
  productType: string;
  fulfillmentStatus: OrderFulfillmentStatus;
  creditStatus: OrderCreditStatus;
  subtotalKobo: number;
  deliveryFeeKobo: number;
  serviceFeeKobo: number;
  totalKobo: number;
  approvedAmountKobo: number | null;
  approvalExpiresAt: string | null;
  graceInterestStartsAt: string | null;
  reservedKobo: number | null;
  reservationStatus: string | null;
  items: EmployerOrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface EmployerEmployeeCreditSummary {
  id: string;
  status: CreditAccountStatus;
  creditLimitKobo: number;
  effectiveLimitKobo: number;
  availableKobo: number;
  totalOwedKobo: number;
}

export type EmployeeAccountStatus = "ACTIVE" | "FROZEN" | "CLOSED";

export interface EmployerEmployee {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  salaryKobo: number;
  deductionPercent: number;
  accountStatus: EmployeeAccountStatus;
  creditAccount: EmployerEmployeeCreditSummary | null;
  createdAt: string;
}

export type EmployeeVerificationStatus =
  | "INVITED"
  | "REGISTERED"
  | "DOCS_SUBMITTED"
  | "APPROVED"
  | "REJECTED";

export interface EmployeeInvite {
  id: string;
  employerId: string;
  code: string;
  email: string;
  phone: string | null;
  status: "PENDING" | "USED" | "REVOKED" | "EXPIRED";
  expiresAt: string;
  usedAt: string | null;
  employeeId: string | null;
  createdAt: string;
}

export interface VerificationDocument {
  id: string;
  employeeId: string;
  type: "EMPLOYMENT_PROOF" | "PAYROLL_PROOF" | "OTHER";
  status: "UPLOADED" | "SUBMITTED" | "REJECTED";
  fileName: string;
  fileUrl: string;
  mimeType: string | null;
  note: string | null;
  createdAt: string;
}

export interface EmployeeVerification {
  id: string;
  userId: string;
  employerId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  verificationStatus: EmployeeVerificationStatus;
  salaryKobo: number;
  creditMultiplierBps: number | null;
  rejectionReason: string | null;
  verifiedAt: string | null;
  documents: VerificationDocument[];
  createdAt: string;
}

export interface CompanyInvoice {
  id: string;
  employerId: string;
  periodStart: string;
  periodEnd: string;
  status: "DRAFT" | "ISSUED" | "PAID" | "VOID";
  subtotalKobo: number;
  feesKobo: number;
  interestKobo: number;
  totalDueKobo: number;
  remittedKobo: number;
  issuedAt: string | null;
  createdAt: string;
  _count?: { lines: number };
  lines?: Array<{
    id: string;
    employeeId: string | null;
    description: string;
    category: string;
    amountKobo: number;
  }>;
}
