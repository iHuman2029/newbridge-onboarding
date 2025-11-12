"use client";

import { useState } from "react";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { SuccessScreen } from "@/components/onboarding/success-screen";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Clock,
  CheckCircle2,
  Users,
  DollarSign,
  Heart,
  ArrowRight,
  Star,
} from "lucide-react";

export default function LandingPage() {
  const [showWizard, setShowWizard] = useState(false);
  const { isSubmitted } = useOnboardingStore();

  // Show success screen if submitted
  if (isSubmitted) {
    return (
      <SuccessScreen
        onStartNewApplication={() => {
          setShowWizard(true);
        }}
      />
    );
  }

  // Show wizard if started
  if (showWizard) {
    return (
      <OnboardingWizard
        onClose={() => setShowWizard(false)}
        onComplete={() => setShowWizard(false)}
      />
    );
  }

  // Landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Star className="h-4 w-4 fill-current" />
              <span>Trusted by 50,000+ Families</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Life Insurance
              <br />
              <span className="text-primary">In Just 5 Minutes</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Protect your family's future with NewBridge Final Expense
              coverage. Fast, simple, and secure application process.
            </p>

            {/* CTA Button */}
            <Button
              size="lg"
              className="text-lg px-8 py-6 h-auto group"
              onClick={() => setShowWizard(true)}
            >
              Get Your Quote Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>No medical exam required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Instant decision possible</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Free consultation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose NewBridge?
            </h2>
            <p className="text-lg text-muted-foreground">
              The simplest way to secure your family's financial future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Benefit 1 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">5-Minute Application</h3>
                <p className="text-muted-foreground">
                  Our streamlined process reduces a 30-minute form to just 5
                  minutes. Smart defaults and auto-fill technology make it easy.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 2 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Secure</h3>
                <p className="text-muted-foreground">
                  Bank-level encryption protects your personal information. Your
                  data is safe with us, guaranteed.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 3 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Affordable Rates</h3>
                <p className="text-muted-foreground">
                  Get competitive rates tailored to your needs. Coverage starts
                  as low as $20/month.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 4 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Approval</h3>
                <p className="text-muted-foreground">
                  Most applications receive a decision within 3-5 business days.
                  Some even get instant approval!
                </p>
              </CardContent>
            </Card>

            {/* Benefit 5 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Family Protection</h3>
                <p className="text-muted-foreground">
                  Ensure your loved ones are taken care of. Cover final expenses
                  and leave a legacy for your family.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 6 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Medical Exam</h3>
                <p className="text-muted-foreground">
                  Skip the doctor's visit. Our simplified underwriting process
                  means no needles, no waiting rooms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to protect your family
            </p>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Fill Out Application</h3>
                <p className="text-muted-foreground">
                  Complete our 5-minute application with only 19 essential
                  questions. We use smart defaults to speed things up.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Get Reviewed</h3>
                <p className="text-muted-foreground">
                  Our team reviews your application and sends you an email for
                  electronic consent. Quick and easy.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Get Covered</h3>
                <p className="text-muted-foreground">
                  Receive your decision in 3-5 days. Once approved, your coverage
                  starts immediately and policy documents arrive by email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Protect Your Family?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 50,000+ families who trust NewBridge for their final expense
            coverage
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6 h-auto group"
            onClick={() => setShowWizard(true)}
          >
            Start Your Application
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-6 text-sm opacity-75">
            🔒 Your information is secure and encrypted • Free consultation •
            No obligation
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-300 text-center text-sm">
        <p>
          © 2025 NewBridge Final Expense. All rights reserved. | 
          <a href="#" className="hover:text-white ml-1">Privacy Policy</a> |
          <a href="#" className="hover:text-white ml-1">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
}

