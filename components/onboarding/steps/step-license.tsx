"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard } from "lucide-react";
import {
  licenseInfoSchema,
  type LicenseInfoFormData,
} from "@/lib/schemas/onboarding-schema";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { SMART_DEFAULTS } from "@/lib/constants/form-options";
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

interface StepLicenseProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepLicense({ onNext, onBack }: StepLicenseProps) {
  const { licenseInfo, contactInfo, updateLicenseInfo } = useOnboardingStore();

  const form = useForm<LicenseInfoFormData>({
    resolver: zodResolver(licenseInfoSchema),
    defaultValues: {
      hasLicense: licenseInfo.hasLicense ?? SMART_DEFAULTS.hasLicense,
      licenseNumber: licenseInfo.licenseNumber || "",
      licenseState: licenseInfo.licenseState || contactInfo.state || "",
    },
  });

  const hasLicense = form.watch("hasLicense");

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

                {/* License State (Auto-filled from residence) */}
                <FormField
                  control={form.control}
                  name="licenseState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License State</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ST"
                          {...field}
                          className="text-base uppercase"
                          maxLength={2}
                          readOnly
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Auto-filled from your state of residence (Tier 3)
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

