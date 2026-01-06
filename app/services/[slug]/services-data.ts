import {
  Banknote,
  Building,
  CreditCard,
  LineChart,
  Briefcase,
} from "lucide-react";

export interface ServiceData {
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  stats: { label: string; value: string }[];
  howItWorks: { step: number; title: string; description: string }[];
  benefits: string[];
  requirements: string[];
  faqs: { question: string; answer: string }[];
  idealFor: string[];
}

export const servicesData: Record<string, ServiceData> = {
  "term-loans": {
    title: "Term Loans",
    tagline: "Predictable financing for strategic investments",
    description:
      "Term loans provide a lump sum of capital that you repay over a fixed period with regular, predictable payments. They're ideal for major investments with clear ROI—equipment purchases, business acquisitions, or expansion projects where you need substantial capital upfront.",
    icon: Banknote,
    stats: [
      { label: "Loan Amounts", value: "$50K-$5M+" },
      { label: "Terms", value: "1-10 years" },
      { label: "Approval Time", value: "1-4 weeks" },
      { label: "Credit Required", value: "650+" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Initial Consultation",
        description:
          "We discuss your goals, timeline, and financial situation to understand the best term loan structure for your needs.",
      },
      {
        step: 2,
        title: "Documentation Review",
        description:
          "Our team reviews your financials, tax returns, and business documentation to match you with the right lenders.",
      },
      {
        step: 3,
        title: "Lender Matching",
        description:
          "We present your opportunity to our network of 75+ lenders, securing competitive offers tailored to your profile.",
      },
      {
        step: 4,
        title: "Funding",
        description:
          "Once you select the best offer, we guide you through closing. Funds typically arrive within days of approval.",
      },
    ],
    benefits: [
      "Fixed, predictable monthly payments for easier budgeting",
      "Build business credit with consistent payment history",
      "Retain full ownership—no equity dilution",
      "Tax-deductible interest payments",
      "Flexibility in how you use the funds",
    ],
    requirements: [
      "Minimum 2 years in business",
      "Annual revenue of $250K+",
      "Personal credit score of 650+",
      "Business bank statements (3-6 months)",
      "Recent tax returns (2-3 years)",
      "No recent bankruptcies",
    ],
    faqs: [
      {
        question:
          "What's the difference between secured and unsecured term loans?",
        answer:
          "Secured loans require collateral (equipment, real estate, inventory) and typically offer lower rates. Unsecured loans don't require collateral but may have higher rates and stricter credit requirements.",
      },
      {
        question: "Can I pay off the loan early?",
        answer:
          "Most term loans allow early payoff. Some may have prepayment penalties, which we'll clearly outline before you commit to any offer.",
      },
      {
        question: "How is the interest rate determined?",
        answer:
          "Rates depend on your credit profile, time in business, revenue, industry, and whether the loan is secured. We work to get you the most competitive rate possible.",
      },
    ],
    idealFor: [
      "Major equipment purchases",
      "Business acquisitions",
      "Expansion projects",
      "Real estate investment",
      "Debt consolidation",
    ],
  },
  "sba-loans": {
    title: "SBA Loans",
    tagline: "Government-backed financing with favorable terms",
    description:
      "SBA loans are partially guaranteed by the Small Business Administration, allowing lenders to offer more favorable terms—lower down payments, longer repayment periods, and competitive rates. They're ideal for established businesses making significant investments.",
    icon: Building,
    stats: [
      { label: "Loan Amounts", value: "Up to $5M" },
      { label: "Terms", value: "Up to 25 years" },
      { label: "Approval Time", value: "45-90 days" },
      { label: "Down Payment", value: "10-20%" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Eligibility Assessment",
        description:
          "We evaluate your business against SBA requirements and determine which program (7(a) or 504) best fits your needs.",
      },
      {
        step: 2,
        title: "Documentation Preparation",
        description:
          "SBA loans require thorough documentation. We help you compile everything needed for a complete application.",
      },
      {
        step: 3,
        title: "Lender Selection",
        description:
          "We connect you with SBA-preferred lenders who specialize in your industry and loan type.",
      },
      {
        step: 4,
        title: "Application & Approval",
        description:
          "We guide you through the application process and coordinate between you and the lender until funding.",
      },
    ],
    benefits: [
      "Lower down payments (as low as 10%)",
      "Longer repayment terms reduce monthly payments",
      "Competitive, capped interest rates",
      "Can be used for real estate, equipment, or working capital",
      "Build relationship with SBA-preferred lenders",
    ],
    requirements: [
      "Minimum 2 years in business",
      "For-profit business in the US",
      "Owner has invested equity",
      "No outstanding government debt",
      "Personal credit score of 680+",
      "Detailed business plan (for larger loans)",
    ],
    faqs: [
      {
        question: "What's the difference between SBA 7(a) and 504 loans?",
        answer:
          "7(a) loans are versatile and can be used for working capital, equipment, or real estate. 504 loans are specifically for major fixed assets like real estate or large equipment purchases.",
      },
      {
        question: "Why do SBA loans take longer?",
        answer:
          "The SBA guarantee requires additional documentation and approval steps. However, the favorable terms make the wait worthwhile for many businesses.",
      },
      {
        question: "Do I need collateral for an SBA loan?",
        answer:
          "SBA loans typically require collateral to the extent it's available, but they won't decline a loan solely for lack of collateral if you meet other requirements.",
      },
    ],
    idealFor: [
      "Commercial real estate purchase",
      "Major equipment investments",
      "Business acquisition",
      "Franchise purchase",
      "Large-scale expansion",
    ],
  },
  "lines-of-credit": {
    title: "Lines of Credit",
    tagline: "Flexible capital when you need it",
    description:
      "A business line of credit gives you access to funds you can draw on as needed—only paying interest on what you use. It's the ultimate flexible financing tool for managing cash flow, covering seasonal fluctuations, or seizing unexpected opportunities.",
    icon: CreditCard,
    stats: [
      { label: "Credit Lines", value: "$10K-$500K" },
      { label: "Draw Period", value: "12-24 months" },
      { label: "Approval Time", value: "1-7 days" },
      { label: "Interest", value: "On usage only" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Credit Assessment",
        description:
          "We review your business finances to determine the optimal credit line amount and structure.",
      },
      {
        step: 2,
        title: "Lender Matching",
        description:
          "We connect you with lenders offering the best rates and terms for your credit profile.",
      },
      {
        step: 3,
        title: "Approval & Setup",
        description:
          "Once approved, your credit line is established. Draw funds via transfer, check, or card depending on the lender.",
      },
      {
        step: 4,
        title: "Draw & Repay",
        description:
          "Use funds as needed, repay, and draw again. Most lines are revolving, so you can access capital repeatedly.",
      },
    ],
    benefits: [
      "Only pay interest on funds you actually use",
      "Revolving access—draw, repay, draw again",
      "Faster access than traditional loans",
      "Build credit with responsible usage",
      "No need to reapply each time you need capital",
    ],
    requirements: [
      "Minimum 1 year in business",
      "Annual revenue of $100K+",
      "Personal credit score of 600+",
      "Business bank statements (3 months)",
      "No recent bankruptcies",
    ],
    faqs: [
      {
        question: "How is a line of credit different from a loan?",
        answer:
          "A loan provides a lump sum you repay over time. A line of credit is available capital you draw as needed—like a credit card, but typically with better rates and higher limits.",
      },
      {
        question: "What can I use the funds for?",
        answer:
          "Lines of credit are flexible. Common uses include payroll, inventory, unexpected expenses, seasonal cash flow gaps, or quick opportunities.",
      },
      {
        question: "Do unused funds affect my credit?",
        answer:
          "Having available credit can actually help your credit profile. You're not penalized for having access to funds you don't use.",
      },
    ],
    idealFor: [
      "Cash flow management",
      "Seasonal businesses",
      "Inventory purchases",
      "Payroll coverage",
      "Emergency reserves",
    ],
  },
  "business-credit": {
    title: "Business Credit Building",
    tagline: "Build the foundation for better financing",
    description:
      "Your business credit profile affects every financing decision. We help you establish, build, and optimize your business credit to access better rates, higher limits, and more favorable terms on future financing.",
    icon: LineChart,
    stats: [
      { label: "Timeline", value: "3-12 months" },
      { label: "Credit Bureaus", value: "All 3 major" },
      { label: "Score Improvement", value: "Varies" },
      { label: "Monitoring", value: "Ongoing" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Credit Analysis",
        description:
          "We pull your business credit reports and identify areas for improvement and opportunities to build.",
      },
      {
        step: 2,
        title: "Strategy Development",
        description:
          "We create a customized plan to establish or improve your business credit through strategic steps.",
      },
      {
        step: 3,
        title: "Implementation",
        description:
          "We guide you through opening trade accounts, securing vendor credit, and building positive payment history.",
      },
      {
        step: 4,
        title: "Ongoing Monitoring",
        description:
          "We track your progress, adjust strategies as needed, and prepare you for future financing opportunities.",
      },
    ],
    benefits: [
      "Separate personal and business credit liability",
      "Access higher credit limits",
      "Qualify for better interest rates",
      "Build credibility with lenders and vendors",
      "Protect personal credit from business activities",
    ],
    requirements: [
      "Registered business entity (LLC, Corp, etc.)",
      "EIN (Employer Identification Number)",
      "Business bank account",
      "Business address and phone",
      "Commitment to the building process",
    ],
    faqs: [
      {
        question: "How long does it take to build business credit?",
        answer:
          "With strategic effort, you can establish a solid foundation in 3-6 months. Building excellent credit typically takes 12-24 months of consistent positive activity.",
      },
      {
        question: "Can I build business credit with bad personal credit?",
        answer:
          "Yes! Business credit is separate from personal credit. While personal credit may be checked initially, building business credit can help you eventually qualify for financing based on business metrics alone.",
      },
      {
        question: "What credit bureaus track business credit?",
        answer:
          "The three major business credit bureaus are Dun & Bradstreet, Experian Business, and Equifax Business. We help you build presence on all three.",
      },
    ],
    idealFor: [
      "New businesses",
      "Sole proprietors transitioning to LLC/Corp",
      "Businesses with limited credit history",
      "Preparing for future financing",
      "Separating personal and business liability",
    ],
  },
  "alternative-lending": {
    title: "Alternative Lending",
    tagline: "Fast, flexible funding for unique situations",
    description:
      "When traditional financing doesn't fit—whether due to time constraints, credit challenges, or unique circumstances—alternative lending provides fast access to capital. Revenue-based financing, merchant cash advances, and bridge loans offer solutions when speed matters.",
    icon: Briefcase,
    stats: [
      { label: "Funding", value: "$10K-$500K" },
      { label: "Approval", value: "24-72 hours" },
      { label: "Credit Required", value: "500+" },
      { label: "Revenue Based", value: "Yes" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Rapid Assessment",
        description:
          "We quickly evaluate your situation and identify the best alternative funding options available to you.",
      },
      {
        step: 2,
        title: "Option Presentation",
        description:
          "We present multiple offers with clear terms so you can make an informed decision quickly.",
      },
      {
        step: 3,
        title: "Fast Approval",
        description:
          "Alternative lenders prioritize speed. Approvals often happen within 24-72 hours of complete application.",
      },
      {
        step: 4,
        title: "Quick Funding",
        description:
          "Once approved, funds are typically deposited within 1-3 business days.",
      },
    ],
    benefits: [
      "Fast approval and funding (often same week)",
      "More flexible credit requirements",
      "Revenue-based options for varying cash flow",
      "No collateral required for many products",
      "Access capital while building traditional credit",
    ],
    requirements: [
      "Minimum 6 months in business",
      "Monthly revenue of $10K+",
      "Active business bank account",
      "No open bankruptcies",
      "Basic documentation (bank statements)",
    ],
    faqs: [
      {
        question: "Is alternative lending more expensive?",
        answer:
          "Alternative lending typically has higher costs than traditional financing, but the speed, flexibility, and accessibility can make it the right choice for certain situations. We help you understand the true cost before committing.",
      },
      {
        question: "What is revenue-based financing?",
        answer:
          "Revenue-based financing ties repayment to your daily or weekly revenue. When sales are higher, you pay more; when they're lower, you pay less. This flexibility can be valuable for businesses with variable income.",
      },
      {
        question:
          "Will alternative lending affect my ability to get traditional loans?",
        answer:
          "Responsible use of alternative financing and timely repayment can actually help you qualify for traditional loans in the future by demonstrating your ability to manage debt.",
      },
    ],
    idealFor: [
      "Time-sensitive opportunities",
      "Businesses with limited credit history",
      "Seasonal revenue fluctuations",
      "Bridge financing needs",
      "Quick cash flow solutions",
    ],
  },
};

// Export valid slugs for static generation
export const validSlugs = Object.keys(servicesData);
