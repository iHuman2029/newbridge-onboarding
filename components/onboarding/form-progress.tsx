"use client";

import { CheckCircle2 } from "lucide-react";
import { ONBOARDING_STEPS } from "@/lib/constants/form-options";
import { cn } from "@/lib/utils";

interface FormProgressProps {
  currentStep: number;
  completedSteps: Set<number>;
  onStepClick?: (step: number) => void;
}

export function FormProgress({ currentStep, completedSteps, onStepClick }: FormProgressProps) {
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
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((Math.max(...Array.from(completedSteps), 0) + 1) / 5) * 100}%` }}
          />
        </div>
        {/* Mobile step indicators */}
        <div className="flex justify-center gap-2">
          {ONBOARDING_STEPS.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = completedSteps.has(step.id);
            
            return (
              <button
                key={step.id}
                onClick={() => onStepClick?.(step.id)}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 text-xs font-semibold",
                  isActive && "border-primary bg-primary text-primary-foreground ring-2 ring-primary/20",
                  isCompleted && !isActive && "border-primary bg-primary text-primary-foreground",
                  !isActive && !isCompleted && "border-muted-foreground/30 text-muted-foreground"
                )}
                type="button"
                aria-label={`Go to step ${step.id}: ${step.title}`}
              >
                {step.id}
              </button>
            );
          })}
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
              width: `${(Math.max(...Array.from(completedSteps), 0) / (ONBOARDING_STEPS.length - 1)) * 100}%`,
            }}
          />

          {/* Steps */}
          <div className="relative flex justify-between">
            {ONBOARDING_STEPS.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = completedSteps.has(step.id);

              return (
                <button
                  key={step.id}
                  onClick={() => onStepClick?.(step.id)}
                  className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2"
                  type="button"
                  aria-label={`Go to step ${step.id}: ${step.title}`}
                >
                  {/* Circle */}
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 bg-background transition-all duration-300",
                      isActive &&
                        "border-primary ring-4 ring-primary/20 scale-110",
                      isCompleted &&
                        !isActive &&
                        "border-primary bg-primary text-primary-foreground",
                      !isActive &&
                        !isCompleted &&
                        "border-muted-foreground/30"
                    )}
                  >
                    {isCompleted ? (
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
                        isCompleted && !isActive && "text-primary",
                        !isActive &&
                          !isCompleted &&
                          "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 max-w-[80px]">
                      {step.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

