"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import { CreditCard, ChevronDown, Check } from "lucide-react";
import {
  licenseInfoSchema,
  type LicenseInfoFormData,
} from "@/lib/schemas/onboarding-schema";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { SMART_DEFAULTS, US_STATES } from "@/lib/constants/form-options";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StepLicenseProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepLicense({ onNext, onBack }: StepLicenseProps) {
  const { licenseInfo, contactInfo, updateLicenseInfo } = useOnboardingStore();
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [stateSearchQuery, setStateSearchQuery] = useState("");
  const stateDropdownRef = useRef<HTMLDivElement>(null);

  const form = useForm<LicenseInfoFormData>({
    resolver: zodResolver(licenseInfoSchema),
    defaultValues: {
      hasLicense: licenseInfo.hasLicense ?? SMART_DEFAULTS.hasLicense,
      licenseNumber: licenseInfo.licenseNumber || "",
      licenseState: licenseInfo.licenseState || contactInfo.state || "",
    },
  });

  const hasLicense = form.watch("hasLicense");

  // Filter states based on search query
  const filteredStates = US_STATES.filter((state) => {
    const query = stateSearchQuery.toLowerCase();
    return (
      state.label.toLowerCase().includes(query) ||
      state.value.toLowerCase().includes(query)
    );
  });

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(event.target as Node)
      ) {
        setShowStateDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = (data: LicenseInfoFormData) => {
    updateLicenseInfo(data);
    onNext();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Driver's License or State ID</CardTitle>
        <CardDescription>
          Required for identity verification to process your application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Has License Toggle */}
            <FormField
              control={form.control}
              name="hasLicense"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-muted/30">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Valid Driver's License or State ID
                    </FormLabel>
                    <FormDescription>
                      Do you have a valid driver's license or state-issued ID?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Conditional License Fields */}
            {hasLicense && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                {/* License Number */}
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License / ID Number *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="D1234567"
                          {...field}
                          className="text-base font-mono"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Enter your driver's license or state ID number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* License State (Auto-filled, searchable) */}
                <FormField
                  control={form.control}
                  name="licenseState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License State</FormLabel>
                      <div className="relative" ref={stateDropdownRef}>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Type to search states..."
                              value={
                                field.value
                                  ? US_STATES.find((s) => s.value === field.value)
                                      ?.label || field.value
                                  : stateSearchQuery
                              }
                              onChange={(e) => {
                                setStateSearchQuery(e.target.value);
                                setShowStateDropdown(true);
                              }}
                              onFocus={() => setShowStateDropdown(true)}
                              className="text-base pr-10"
                            />
                            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                          </div>
                        </FormControl>

                        {/* State Dropdown */}
                        {showStateDropdown && filteredStates.length > 0 && (
                          <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-lg">
                            <div className="max-h-60 overflow-auto p-1">
                              {filteredStates.map((state) => (
                                <button
                                  key={state.value}
                                  type="button"
                                  className={cn(
                                    "w-full rounded-sm px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex items-center justify-between",
                                    field.value === state.value && "bg-accent"
                                  )}
                                  onClick={() => {
                                    field.onChange(state.value);
                                    setStateSearchQuery("");
                                    setShowStateDropdown(false);
                                  }}
                                >
                                  <span>
                                    {state.label} ({state.value})
                                  </span>
                                  {field.value === state.value && (
                                    <Check className="h-4 w-4" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <FormDescription className="text-xs">
                        Auto-filled from your state of residence or search
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Smart Default Info */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <span className="font-semibold">💡 Smart Default:</span> Most
                applicants have a valid ID, so we've pre-selected "Yes". Toggle
                if this doesn't apply to you.
              </p>
            </div>

            {/* Help Text */}
            {!hasLicense && (
              <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-4">
                <p className="text-sm text-yellow-900 dark:text-yellow-100">
                  <span className="font-semibold">⚠️ Note:</span> A valid form
                  of identification is typically required for policy processing.
                  Please contact us if you need assistance.
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button type="submit" size="lg" className="px-8">
                Next Step
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

