"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  personalInfoSchema,
  type PersonalInfoFormData,
} from "@/lib/schemas/onboarding-schema";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { formatSSN, calculateAge } from "@/lib/utils/format-helpers";
import { GENDER_OPTIONS } from "@/lib/constants/form-options";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StepPersonalInfoProps {
  onNext: () => void;
}

export function StepPersonalInfo({ onNext }: StepPersonalInfoProps) {
  const { personalInfo, updatePersonalInfo } = useOnboardingStore();
  const [showSSN, setShowSSN] = useState(false);

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: personalInfo.firstName || "",
      lastName: personalInfo.lastName || "",
      dateOfBirth: personalInfo.dateOfBirth || "",
      gender: personalInfo.gender || undefined,
      ssn: personalInfo.ssn || "",
    },
  });

  const dateOfBirth = form.watch("dateOfBirth");
  const age = dateOfBirth ? calculateAge(dateOfBirth) : null;

  const onSubmit = (data: PersonalInfoFormData) => {
    updatePersonalInfo(data);
    onNext();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Please provide your basic personal details. All fields are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Legal First Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Legal Last Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth */}
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth *</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="MM/DD/YYYY"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        let formatted = value;
                        if (value.length >= 2) {
                          formatted = value.slice(0, 2) + "/" + value.slice(2);
                        }
                        if (value.length >= 4) {
                          formatted =
                            value.slice(0, 2) +
                            "/" +
                            value.slice(2, 4) +
                            "/" +
                            value.slice(4, 8);
                        }
                        field.onChange(formatted);
                      }}
                      maxLength={10}
                      className="text-base"
                    />
                  </FormControl>
                  {age && age > 0 && (
                    <FormDescription>Age: {age} years old</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender (At Birth) *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-base">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GENDER_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SSN */}
            <FormField
              control={form.control}
              name="ssn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Security Number *</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showSSN ? "text" : "password"}
                        placeholder="XXX-XX-XXXX"
                        {...field}
                        onChange={(e) => {
                          const formatted = formatSSN(e.target.value);
                          field.onChange(formatted);
                        }}
                        maxLength={11}
                        className="text-base pr-10"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-10 w-10"
                      onClick={() => setShowSSN(!showSSN)}
                    >
                      {showSSN ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <FormDescription className="text-xs">
                    Required for identity verification and policy issuance
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
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

