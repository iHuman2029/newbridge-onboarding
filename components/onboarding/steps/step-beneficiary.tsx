"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Plus, Trash2, CheckCircle2, Users } from "lucide-react";
import {
  beneficiarySchema,
  beneficiaryAssignmentSchema,
  type BeneficiaryFormData,
} from "@/lib/schemas/onboarding-schema";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { validateBeneficiaryShares, formatDateDisplay } from "@/lib/utils/format-helpers";
import { RELATIONSHIP_OPTIONS } from "@/lib/constants/form-options";
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

interface StepBeneficiaryProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepBeneficiary({ onNext, onBack }: StepBeneficiaryProps) {
  const { beneficiaries, addBeneficiary, removeBeneficiary } =
    useOnboardingStore();
  const [isAddingBeneficiary, setIsAddingBeneficiary] = useState(
    beneficiaries.length === 0
  );

  const form = useForm<BeneficiaryFormData>({
    resolver: zodResolver(beneficiarySchema),
    defaultValues: {
      id: crypto.randomUUID(),
      firstName: "",
      lastName: "",
      relationship: undefined,
      dateOfBirth: "",
      share: beneficiaries.length === 0 ? 100 : 0,
    },
  });

  // Calculate total shares
  const totalShares = beneficiaries.reduce((sum, b) => sum + b.share, 0);
  const remainingShares = 100 - totalShares;
  const isComplete = totalShares === 100;

  const handleAddBeneficiary = (data: BeneficiaryFormData) => {
    addBeneficiary(data);
    form.reset({
      id: crypto.randomUUID(),
      firstName: "",
      lastName: "",
      relationship: undefined,
      dateOfBirth: "",
      share: remainingShares > 0 ? remainingShares : 0,
    });
    setIsAddingBeneficiary(false);
  };

  const handleRemoveBeneficiary = (id: string) => {
    removeBeneficiary(id);
    if (beneficiaries.length === 1) {
      setIsAddingBeneficiary(true);
    }
  };

  const handleSubmit = () => {
    const validation = beneficiaryAssignmentSchema.safeParse({
      beneficiaries,
    });

    if (!validation.success) {
      alert("Please ensure total beneficiary shares equal 100%");
      return;
    }

    onNext();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Beneficiary Designation</CardTitle>
        <CardDescription>
          Who should receive the benefit if something happens to you?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Indicator */}
        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Allocation
            </span>
            <span
              className={`text-2xl font-bold ${
                isComplete ? "text-green-600" : "text-orange-600"
              }`}
            >
              {totalShares}%
            </span>
          </div>
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                isComplete ? "bg-green-600" : "bg-orange-500"
              }`}
              style={{ width: `${Math.min(totalShares, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {isComplete ? (
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle2 className="h-3 w-3" />
                Ready to proceed
              </span>
            ) : (
              `Need ${remainingShares}% more to reach 100%`
            )}
          </p>
        </div>

        {/* Beneficiary List */}
        {beneficiaries.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Primary Beneficiaries</h3>
            {beneficiaries.map((beneficiary, index) => (
              <div
                key={beneficiary.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card"
              >
                <div className="flex-1">
                  <div className="font-medium">
                    {beneficiary.firstName} {beneficiary.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {beneficiary.relationship} • {beneficiary.share}%
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveBeneficiary(beneficiary.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Add Beneficiary Form */}
        {isAddingBeneficiary ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddBeneficiary)}
              className="space-y-4 rounded-lg border p-4 bg-muted/10"
            >
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Beneficiary
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane" {...field} />
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
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Relationship */}
              <FormField
                control={form.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {RELATIONSHIP_OPTIONS.map((option) => (
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Share Percentage */}
              <FormField
                control={form.control}
                name="share"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Share (%) *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="100"
                          {...field}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            field.onChange(isNaN(value) ? 0 : value);
                          }}
                          min={1}
                          max={remainingShares}
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          %
                        </span>
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      Remaining available: {remainingShares}%
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Add Beneficiary
                </Button>
                {beneficiaries.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddingBeneficiary(false)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Form>
        ) : (
          remainingShares > 0 && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setIsAddingBeneficiary(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Beneficiary
            </Button>
          )
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            type="button"
            size="lg"
            className="px-8"
            onClick={handleSubmit}
            disabled={!isComplete}
          >
            Complete Application
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

