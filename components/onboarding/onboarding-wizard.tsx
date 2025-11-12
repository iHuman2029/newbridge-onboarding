"use client";

import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { FormProgress } from "./form-progress";
import { StepPersonalInfo } from "./steps/step-personal-info";
import { StepContact } from "./steps/step-contact";
import { StepPhysical } from "./steps/step-physical";
import { StepLicense } from "./steps/step-license";
import { StepBeneficiary } from "./steps/step-beneficiary";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface OnboardingWizardProps {
  onClose?: () => void;
  onComplete?: () => void;
}

export function OnboardingWizard({
  onClose,
  onComplete,
}: OnboardingWizardProps) {
  const {
    currentStep,
    completedSteps,
    nextStep,
    prevStep,
    submitForm,
    isSubmitted,
  } = useOnboardingStore();

  const handleNext = () => {
    nextStep();
  };

  const handleBack = () => {
    prevStep();
  };

  const handleComplete = async () => {
    await submitForm();
    onComplete?.();
  };

  // If submitted, don't show the wizard (success screen will be shown)
  if (isSubmitted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Life Insurance Application
            </h1>
            <p className="text-muted-foreground mt-1">
              Complete in just 5-7 minutes
            </p>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Progress Indicator */}
        <FormProgress currentStep={currentStep} completedSteps={completedSteps} />

        {/* Step Content */}
        <div className="mt-8 animate-in fade-in slide-in-from-right-4 duration-300">
          {currentStep === 1 && <StepPersonalInfo onNext={handleNext} />}
          {currentStep === 2 && (
            <StepContact onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 3 && (
            <StepPhysical onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 4 && (
            <StepLicense onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 5 && (
            <StepBeneficiary onNext={handleComplete} onBack={handleBack} />
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            🔒 Your information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}

