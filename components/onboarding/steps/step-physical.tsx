"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  physicalInfoSchema,
  type PhysicalInfoFormData,
} from "@/lib/schemas/onboarding-schema";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import {
  HEIGHT_FEET_OPTIONS,
  HEIGHT_INCHES_OPTIONS,
  SMART_DEFAULTS,
} from "@/lib/constants/form-options";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface StepPhysicalProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepPhysical({ onNext, onBack }: StepPhysicalProps) {
  const { physicalInfo, updatePhysicalInfo } = useOnboardingStore();

  const form = useForm<PhysicalInfoFormData>({
    resolver: zodResolver(physicalInfoSchema),
    defaultValues: {
      heightFeet: physicalInfo.heightFeet ?? SMART_DEFAULTS.heightFeet,
      heightInches: physicalInfo.heightInches ?? SMART_DEFAULTS.heightInches,
      weight: physicalInfo.weight ?? SMART_DEFAULTS.weight,
      tobaccoUse: physicalInfo.tobaccoUse ?? SMART_DEFAULTS.tobaccoUse,
    },
  });

  const onSubmit = (data: PhysicalInfoFormData) => {
    updatePhysicalInfo(data);
    onNext();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Physical Information</CardTitle>
        <CardDescription>
          This helps us calculate your insurance rate and eligibility.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Height */}
            <div className="space-y-2">
              <Label>Height *</Label>
              <div className="grid grid-cols-2 gap-4">
                {/* Feet */}
                <FormField
                  control={form.control}
                  name="heightFeet"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="text-base">
                            <SelectValue placeholder="Feet" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {HEIGHT_FEET_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value.toString()}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Inches */}
                <FormField
                  control={form.control}
                  name="heightInches"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="text-base">
                            <SelectValue placeholder="Inches" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {HEIGHT_INCHES_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value.toString()}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Weight */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (lbs) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="170"
                      {...field}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        field.onChange(isNaN(value) ? 0 : value);
                      }}
                      min={50}
                      max={500}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tobacco Use */}
            <FormField
              control={form.control}
              name="tobaccoUse"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Tobacco Use (Last 12 Months)
                    </FormLabel>
                    <FormDescription>
                      Have you used tobacco in any form in the last 12 months?
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

            {/* Smart Default Info */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <span className="font-semibold">💡 Smart Defaults:</span> We've
                pre-filled healthy values to speed up your application. Please
                adjust if needed.
              </p>
            </div>

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

