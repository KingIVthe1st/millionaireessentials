"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  DollarSign,
  Clock,
  User,
  Send,
} from "lucide-react";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/sections/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin();
}

const businessTypes = [
  "Construction / Contracting",
  "Healthcare / Medical",
  "Professional Services",
  "Retail / E-commerce",
  "Manufacturing",
  "Transportation / Logistics",
  "Restaurant / Hospitality",
  "Technology",
  "Real Estate",
  "Other",
];

const revenueRanges = [
  "Under $250K",
  "$250K - $500K",
  "$500K - $1M",
  "$1M - $2.5M",
  "$2.5M - $5M",
  "$5M - $10M",
  "$10M+",
];

const fundingNeeds = [
  "Working Capital",
  "Equipment Financing",
  "Real Estate / Property",
  "Business Acquisition",
  "Expansion / Growth",
  "Debt Refinancing",
  "Inventory / Supplies",
  "Other",
];

const timelines = [
  "Immediately (within 1 week)",
  "Soon (1-4 weeks)",
  "Planning ahead (1-3 months)",
  "Exploring options (3+ months)",
];

const fundingAmounts = [
  "$25K - $50K",
  "$50K - $100K",
  "$100K - $250K",
  "$250K - $500K",
  "$500K - $1M",
  "$1M+",
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessType: string;
  revenue: string;
  fundingNeed: string;
  fundingAmount: string;
  timeline: string;
  message: string;
}

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessType: "",
    revenue: "",
    fundingNeed: "",
    fundingAmount: "",
    timeline: "",
    message: "",
  });

  const totalSteps = 4;

  useEffect(() => {
    gsap.from(".contact-hero", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  // Animate step transitions
  useEffect(() => {
    gsap.fromTo(
      ".step-content",
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [step]);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.firstName && formData.email;
      case 2:
        return formData.businessType && formData.revenue;
      case 3:
        return (
          formData.fundingNeed && formData.fundingAmount && formData.timeline
        );
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div>
        <section className="min-h-[80vh] flex items-center justify-center pt-32">
          <div className="container-luxury">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mx-auto mb-8">
                <Check className="w-10 h-10 text-[var(--color-accent)]" />
              </div>
              <h1 className="text-headline mb-4">
                Thank You,{" "}
                <span className="text-[var(--color-accent)]">
                  {formData.firstName}
                </span>
              </h1>
              <p className="text-xl text-[var(--color-text-secondary)] mb-8">
                We've received your information and an advisor will reach out
                within one business day to discuss your capital needs.
              </p>
              <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-left mb-8">
                <h3 className="font-medium mb-4">What happens next?</h3>
                <ul className="space-y-3 text-[var(--color-text-secondary)]">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-[var(--color-accent)]">
                        1
                      </span>
                    </span>
                    <span>
                      An advisor reviews your information and prepares relevant
                      options
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-[var(--color-accent)]">
                        2
                      </span>
                    </span>
                    <span>
                      We'll call you at{" "}
                      {formData.phone || "the number provided"} to discuss your
                      goals
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-[var(--color-accent)]">
                        3
                      </span>
                    </span>
                    <span>
                      Together we'll explore the capital solutions that fit your
                      situation
                    </span>
                  </li>
                </ul>
              </div>
              <Link href="/">
                <Button variant="ghost">Return to Home</Button>
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <section className="min-h-screen pt-32 pb-20">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Left Column - Info */}
            <div className="lg:col-span-2 contact-hero">
              <span className="text-overline mb-4 block">Get in Touch</span>
              <h1 className="text-headline mb-6">
                Begin the{" "}
                <span className="text-[var(--color-accent)]">Conversation</span>
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)] mb-8">
                Tell us about your business and what you're looking to
                accomplish. An advisor will reach out within one business day.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <a
                  href="tel:+19178095707"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Call us
                    </p>
                    <p className="font-medium">+1 (917) 809-5707</p>
                  </div>
                </a>

                <a
                  href="mailto:info@millionaireessentials.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Email us
                    </p>
                    <p className="font-medium">
                      info@millionaireessentials.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Visit us
                    </p>
                    <p className="font-medium">Montclair, NJ</p>
                  </div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="p-4 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  <span className="font-medium text-[var(--color-text-primary)]">
                    Trusted by 500+ business owners
                  </span>{" "}
                  across 40+ industries. Your information is kept confidential
                  and never shared.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-3" ref={formRef}>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 md:p-10">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[var(--color-text-muted)]">
                      Step {step} of {totalSteps}
                    </span>
                    <span className="text-sm text-[var(--color-text-muted)]">
                      {Math.round((step / totalSteps) * 100)}% complete
                    </span>
                  </div>
                  <div className="h-1 bg-[var(--color-border)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-accent)] transition-all duration-500 ease-out"
                      style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Step Content */}
                <div className="step-content min-h-[400px]">
                  {/* Step 1: Contact Info */}
                  {step === 1 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-[var(--color-accent)]" />
                        </div>
                        <div>
                          <h2 className="text-xl font-medium">
                            Let's start with you
                          </h2>
                          <p className="text-sm text-[var(--color-text-secondary)]">
                            How can we reach you?
                          </p>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              First Name{" "}
                              <span className="text-[var(--color-accent)]">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              value={formData.firstName}
                              onChange={(e) =>
                                updateFormData("firstName", e.target.value)
                              }
                              className="w-full px-4 py-3 bg-[var(--color-primary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Last Name
                            </label>
                            <input
                              type="text"
                              value={formData.lastName}
                              onChange={(e) =>
                                updateFormData("lastName", e.target.value)
                              }
                              className="w-full px-4 py-3 bg-[var(--color-primary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                              placeholder="Smith"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Email{" "}
                            <span className="text-[var(--color-accent)]">
                              *
                            </span>
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              updateFormData("email", e.target.value)
                            }
                            className="w-full px-4 py-3 bg-[var(--color-primary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                            placeholder="john@company.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              updateFormData("phone", e.target.value)
                            }
                            className="w-full px-4 py-3 bg-[var(--color-primary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Business Info */}
                  {step === 2 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-[var(--color-accent)]" />
                        </div>
                        <div>
                          <h2 className="text-xl font-medium">
                            About your business
                          </h2>
                          <p className="text-sm text-[var(--color-text-secondary)]">
                            Help us understand your company
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-3">
                            Industry{" "}
                            <span className="text-[var(--color-accent)]">
                              *
                            </span>
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {businessTypes.map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() =>
                                  updateFormData("businessType", type)
                                }
                                className={`px-4 py-3 text-sm text-left rounded-lg border transition-colors ${
                                  formData.businessType === type
                                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                                    : "border-[var(--color-border)] hover:border-[var(--color-accent)]/50"
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-3">
                            Annual Revenue{" "}
                            <span className="text-[var(--color-accent)]">
                              *
                            </span>
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {revenueRanges.map((range) => (
                              <button
                                key={range}
                                type="button"
                                onClick={() => updateFormData("revenue", range)}
                                className={`px-4 py-3 text-sm rounded-lg border transition-colors ${
                                  formData.revenue === range
                                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                                    : "border-[var(--color-border)] hover:border-[var(--color-accent)]/50"
                                }`}
                              >
                                {range}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Funding Needs */}
                  {step === 3 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-[var(--color-accent)]" />
                        </div>
                        <div>
                          <h2 className="text-xl font-medium">
                            Your funding needs
                          </h2>
                          <p className="text-sm text-[var(--color-text-secondary)]">
                            What are you looking to accomplish?
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-3">
                            Purpose of Funding{" "}
                            <span className="text-[var(--color-accent)]">
                              *
                            </span>
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {fundingNeeds.map((need) => (
                              <button
                                key={need}
                                type="button"
                                onClick={() =>
                                  updateFormData("fundingNeed", need)
                                }
                                className={`px-4 py-3 text-sm text-left rounded-lg border transition-colors ${
                                  formData.fundingNeed === need
                                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                                    : "border-[var(--color-border)] hover:border-[var(--color-accent)]/50"
                                }`}
                              >
                                {need}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-3">
                            Funding Amount{" "}
                            <span className="text-[var(--color-accent)]">
                              *
                            </span>
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {fundingAmounts.map((amount) => (
                              <button
                                key={amount}
                                type="button"
                                onClick={() =>
                                  updateFormData("fundingAmount", amount)
                                }
                                className={`px-4 py-3 text-sm rounded-lg border transition-colors ${
                                  formData.fundingAmount === amount
                                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                                    : "border-[var(--color-border)] hover:border-[var(--color-accent)]/50"
                                }`}
                              >
                                {amount}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-3">
                            Timeline{" "}
                            <span className="text-[var(--color-accent)]">
                              *
                            </span>
                          </label>
                          <div className="space-y-2">
                            {timelines.map((timeline) => (
                              <button
                                key={timeline}
                                type="button"
                                onClick={() =>
                                  updateFormData("timeline", timeline)
                                }
                                className={`w-full px-4 py-3 text-sm text-left rounded-lg border transition-colors flex items-center gap-3 ${
                                  formData.timeline === timeline
                                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                                    : "border-[var(--color-border)] hover:border-[var(--color-accent)]/50"
                                }`}
                              >
                                <Clock className="w-4 h-4" />
                                {timeline}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review & Submit */}
                  {step === 4 && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                          <Send className="w-5 h-5 text-[var(--color-accent)]" />
                        </div>
                        <div>
                          <h2 className="text-xl font-medium">Almost there</h2>
                          <p className="text-sm text-[var(--color-text-secondary)]">
                            Review your information and submit
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="p-4 rounded-lg bg-[var(--color-primary)] border border-[var(--color-border)]">
                          <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-2">
                            Contact
                          </h3>
                          <p>
                            {formData.firstName} {formData.lastName}
                          </p>
                          <p className="text-[var(--color-text-secondary)]">
                            {formData.email}
                          </p>
                          {formData.phone && (
                            <p className="text-[var(--color-text-secondary)]">
                              {formData.phone}
                            </p>
                          )}
                        </div>

                        <div className="p-4 rounded-lg bg-[var(--color-primary)] border border-[var(--color-border)]">
                          <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-2">
                            Business
                          </h3>
                          <p>{formData.businessType}</p>
                          <p className="text-[var(--color-text-secondary)]">
                            {formData.revenue} annual revenue
                          </p>
                        </div>

                        <div className="p-4 rounded-lg bg-[var(--color-primary)] border border-[var(--color-border)]">
                          <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-2">
                            Funding Request
                          </h3>
                          <p>
                            {formData.fundingAmount} for {formData.fundingNeed}
                          </p>
                          <p className="text-[var(--color-text-secondary)]">
                            {formData.timeline}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Additional Details (Optional)
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) =>
                            updateFormData("message", e.target.value)
                          }
                          rows={4}
                          className="w-full px-4 py-3 bg-[var(--color-primary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                          placeholder="Anything else we should know about your situation?"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
                  {step > 1 ? (
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < totalSteps ? (
                    <Button
                      variant="primary"
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="group"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Request
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
