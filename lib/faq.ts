export interface FaqItem {
  q: string;
  a: string;
}

/** Full FAQ list for /faq (spec 15). */
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is Pantri?",
    a: "Pantri is a food purchasing platform that lets employees of participating organizations buy groceries, family food packages, and event supplies today, while repayment is handled through authorized payroll deductions over 5 or 6 months.",
  },
  {
    q: "How does payroll deduction work?",
    a: "After you choose a 5- or 6-month plan and your employer approves the arrangement, equal installments are deducted automatically through your employer's payroll  no cash upfront. As deductions reduce what you owe, available credit opens again so you can buy up to your limit even before a prior plan is fully repaid.",
  },
  {
    q: "Who can use Pantri?",
    a: "Employees of participating employers whose accounts have been verified through their workplace and payroll arrangement. Availability and limits depend on your employer's policy.",
  },
  {
    q: "Does my employer need to participate?",
    a: "Yes. Pantri is available through participating employers and payroll administrators. Your company must be onboarded before you can shop with payroll deductions.",
  },
  {
    q: "When do I receive my food?",
    a: "After your order is approved by your employer arrangement, Pantri fulfils and delivers your order according to your selected delivery option.",
  },
  {
    q: "What payment plans are available?",
    a: "Plans are typically 5 or 6 equal monthly payroll deductions with no cash upfront. Your food package limit is usually 1.5× your monthly salary  you cannot buy above that limit. Actual eligibility and terms depend on your employer's credit policy.",
  },
  {
    q: "Can I customize my package?",
    a: "Yes. You can choose a curated package or build a custom basket from the marketplace in the Pantri app. Pricing and plan examples update based on your selection.",
  },
  {
    q: "Can I buy food for an event?",
    a: "Yes. Pantri supports event and bulk food purchasing where available through your employer. Browse event options in the app or ask your employer about eligibility.",
  },
  {
    q: "Can I buy individual groceries?",
    a: "Yes. Shop everyday groceries in addition to family packages. Browse the catalog on the website and place orders in the Pantri mobile app.",
  },
  {
    q: "How does delivery work?",
    a: "Fulfilment and delivery options are shown in the app when you order. Timing depends on product type, location, and your selected delivery slot after approval.",
  },
  {
    q: "What happens if I leave my employer?",
    a: "Outstanding deductions are managed according to your employer's agreement with Pantri. Contact support for details specific to your situation.",
  },
  {
    q: "Can I cancel an order?",
    a: "Cancellation depends on order status and fulfilment progress. Check the order in the Pantri app or contact support as soon as possible if you need to cancel.",
  },
  {
    q: "How does Pantri handle refunds?",
    a: "Refunds are handled according to Pantri's fulfilment and quality policies and your employer's arrangement. Contact support with your order details for help.",
  },
  {
    q: "How does Pantri handle fresh food?",
    a: "Fresh and perishable items follow shorter fulfilment windows and quality checks. Availability and delivery timing are shown in the app for each product.",
  },
  {
    q: "Is Pantri a loan?",
    a: "No. Pantri is primarily a food purchasing platform with payroll-backed payment plans  not a personal loan product. Every purchase ties back to an authorized employer relationship.",
  },
  {
    q: "Is my financial information secure?",
    a: "Pantri uses secure account practices and works through your employer's authorized payroll process. We do not ask you to share unrelated banking credentials in the marketing site.",
  },
];

/** Homepage / short accordion subset. */
export const FAQ_HOMEPAGE: FaqItem[] = FAQ_ITEMS.filter((item) =>
  [
    "What is Pantri?",
    "Is Pantri a loan?",
    "Does my employer need to participate?",
    "What payment plans are available?",
    "When do I receive my food?",
    "What happens if I leave my employer?",
  ].includes(item.q),
);

/** Employee page FAQ subset. */
export const FAQ_EMPLOYEE: FaqItem[] = FAQ_ITEMS.filter((item) =>
  [
    "Who can use Pantri?",
    "Does my employer need to participate?",
    "What payment plans are available?",
    "Is Pantri a loan?",
    "When do I receive my food?",
  ].includes(item.q),
);

/** Pricing page FAQ subset. */
export const FAQ_PRICING: FaqItem[] = FAQ_ITEMS.filter((item) =>
  [
    "What payment plans are available?",
    "Is Pantri a loan?",
    "Who can use Pantri?",
  ].includes(item.q),
);
