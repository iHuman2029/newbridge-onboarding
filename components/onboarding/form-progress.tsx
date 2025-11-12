"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { ONBOARDING_STEPS } from "@/lib/constants/form-options";
import { cn } from "@/lib/utils";

interface FormProgressProps {
  currentStep: number;
  completedSteps: Set<number>;
}

export function FormProgress({ currentStep, completedSteps }: FormProgressProps) {
  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4">
      {/* Mobile View - Compact */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Step {currentStep} of 5</span>
          <span className="text-sm text-muted-foreground">
            {ONBOARDING_STEPS[currentStep - 1]?.title}
          </span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop View - Detailed */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress Line */}
          <div
            className="absolute top-5 left-0 h-0.5 bg-secondary transition-all duration-300"
            style={{ width: "100%" }}
          />
          <div
            className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (ONBOARDING_STEPS.length - 1)) * 100}%`,
            }}
          />

          {/* Steps */}
          <div className="relative flex justify-between">
            {ONBOARDING_STEPS.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = completedSteps.has(step.id);
              const isPast = step.id < currentStep;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center gap-2"
                >
                  {/* Circle */}
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 bg-background transition-all duration-300",
                      isActive &&
                        "border-primary ring-4 ring-primary/20 scale-110",
                      (isCompleted || isPast) &&
                        !isActive &&
                        "border-primary bg-primary text-primary-foreground",
                      !isActive &&
                        !isCompleted &&
                        !isPast &&
                        "border-muted-foreground/30"
                    )}
                  >
                    {isCompleted || isPast ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          isActive && "text-primary"
                        )}
                      >
                        {step.id}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <div className="text-center">
                    <div
                      className={cn(
                        "text-sm font-medium transition-colors",
                        isActive && "text-primary",
                        (isCompleted || isPast) && !isActive && "text-primary",
                        !isActive &&
                          !isCompleted &&
                          !isPast &&
                          "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 max-w-[80px]">
                      {step.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

