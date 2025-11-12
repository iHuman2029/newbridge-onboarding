"use client";

import { useEffect, useState } from "react";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download, Mail, Phone, MapPin, User, Calendar } from "lucide-react";
import { formatDateDisplay, getStateName, maskSSN } from "@/lib/utils/format-helpers";

interface SuccessScreenProps {
  onStartNewApplication?: () => void;
}

export function SuccessScreen({ onStartNewApplication }: SuccessScreenProps) {
  const {
    personalInfo,
    contactInfo,
    physicalInfo,
    licenseInfo,
    beneficiaries,
    resetForm,
  } = useOnboardingStore();

  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadSummary = () => {
    // In production, this would generate a PDF
    alert("Download functionality would generate a PDF summary here");
  };

  const handleStartNew = () => {
    resetForm();
    onStartNewApplication?.();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              🎉
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8 animate-in fade-in zoom-in duration-500">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Application Submitted!
          </h1>
          <p className="text-lg text-muted-foreground">
            Thank you for completing your life insurance application
          </p>
        </div>

        {/* Next Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What Happens Next?</CardTitle>
            <CardDescription>Here's what you can expect</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                1
              </div>
              <div>
                <h3 className="font-medium">Review & Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Our team will review your application within 24-48 hours
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                2
              </div>
              <div>
                <h3 className="font-medium">Consent Email</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive an email at {contactInfo.email} to provide
                  electronic consent
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                3
              </div>
              <div>
                <h3 className="font-medium">Underwriting Decision</h3>
                <p className="text-sm text-muted-foreground">
                  Most applications receive a decision within 3-5 business days
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                4
              </div>
              <div>
                <h3 className="font-medium">Policy Issuance</h3>
                <p className="text-sm text-muted-foreground">
                  Once approved, your policy documents will be sent to your email
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Application Summary</CardTitle>
            <CardDescription>Review your submitted information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <User className="h-4 w-4" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>{" "}
                  {personalInfo.firstName} {personalInfo.lastName}
                </div>
                <div>
                  <span className="text-muted-foreground">Date of Birth:</span>{" "}
                  {personalInfo.dateOfBirth &&
                    formatDateDisplay(personalInfo.dateOfBirth)}
                </div>
                <div>
                  <span className="text-muted-foreground">Gender:</span>{" "}
                  {personalInfo.gender}
                </div>
                <div>
                  <span className="text-muted-foreground">SSN:</span>{" "}
                  {personalInfo.ssn && maskSSN(personalInfo.ssn)}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t pt-6">
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="md:col-span-2">
                  <span className="text-muted-foreground">Address:</span>{" "}
                  {contactInfo.streetAddress}
                </div>
                <div>
                  <span className="text-muted-foreground">City:</span>{" "}
                  {contactInfo.city}
                </div>
                <div>
                  <span className="text-muted-foreground">State:</span>{" "}
                  {contactInfo.state && getStateName(contactInfo.state)}
                </div>
                <div>
                  <span className="text-muted-foreground">ZIP:</span>{" "}
                  {contactInfo.zipCode}
                </div>
                <div>
                  <Mail className="h-3 w-3 inline mr-1 text-muted-foreground" />
                  {contactInfo.email}
                </div>
                <div>
                  <Phone className="h-3 w-3 inline mr-1 text-muted-foreground" />
                  {contactInfo.phone}
                </div>
              </div>
            </div>

            {/* Physical Information */}
            <div className="border-t pt-6">
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4" />
                Health Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Height:</span>{" "}
                  {physicalInfo.heightFeet}'{physicalInfo.heightInches}"
                </div>
                <div>
                  <span className="text-muted-foreground">Weight:</span>{" "}
                  {physicalInfo.weight} lbs
                </div>
                <div>
                  <span className="text-muted-foreground">Tobacco Use:</span>{" "}
                  {physicalInfo.tobaccoUse ? "Yes" : "No"}
                </div>
                <div>
                  <span className="text-muted-foreground">License:</span>{" "}
                  {licenseInfo.hasLicense ? "Valid" : "None"}
                </div>
              </div>
            </div>

            {/* Beneficiaries */}
            <div className="border-t pt-6">
              <h3 className="font-medium mb-3">Beneficiaries</h3>
              <div className="space-y-2">
                {beneficiaries.map((beneficiary, index) => (
                  <div
                    key={beneficiary.id}
                    className="flex justify-between items-center text-sm p-2 rounded bg-muted/30"
                  >
                    <span>
                      {beneficiary.firstName} {beneficiary.lastName} (
                      {beneficiary.relationship})
                    </span>
                    <span className="font-medium">{beneficiary.share}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={handleDownloadSummary} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Summary
          </Button>
          <Button size="lg" onClick={handleStartNew}>
            Start New Application
          </Button>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Questions? Contact us at{" "}
            <a
              href="mailto:support@newbridge.com"
              className="text-primary hover:underline"
            >
              support@newbridge.com
            </a>{" "}
            or{" "}
            <a href="tel:1-800-555-0123" className="text-primary hover:underline">
              1-800-555-0123
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

