"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown, Check } from "lucide-react";
import {
  contactInfoSchema,
  type ContactInfoFormData,
} from "@/lib/schemas/onboarding-schema";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { formatPhone, formatZipCode } from "@/lib/utils/format-helpers";
import { useAddressAutocomplete } from "@/hooks/use-address-autocomplete";
import { US_STATES } from "@/lib/constants/form-options";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StepContactProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepContact({ onNext, onBack }: StepContactProps) {
  const { contactInfo, updateContactInfo } = useOnboardingStore();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [stateSearchQuery, setStateSearchQuery] = useState("");
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const stateDropdownRef = useRef<HTMLDivElement>(null);

  const form = useForm<ContactInfoFormData>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      streetAddress: contactInfo.streetAddress || "",
      city: contactInfo.city || "",
      state: contactInfo.state || "",
      zipCode: contactInfo.zipCode || "",
      email: contactInfo.email || "",
      phone: contactInfo.phone || "",
    },
  });

  const {
    query,
    setQuery,
    suggestions,
    isLoading,
    handleSelect,
    clearSuggestions,
  } = useAddressAutocomplete((address) => {
    // Auto-fill all address fields (Tier 3)
    form.setValue("streetAddress", address.streetAddress);
    form.setValue("city", address.city);
    form.setValue("state", address.state);
    form.setValue("zipCode", address.zipCode);
    setShowSuggestions(false);
  });

  // Filter states based on search query
  const filteredStates = US_STATES.filter((state) => {
    const query = stateSearchQuery.toLowerCase();
    return (
      state.label.toLowerCase().includes(query) ||
      state.value.toLowerCase().includes(query)
    );
  });

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
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

  const onSubmit = (data: ContactInfoFormData) => {
    updateContactInfo(data);
    onNext();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>
          Where can we reach you? We'll use this for your policy documents.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Street Address with Autocomplete */}
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address *</FormLabel>
                  <div className="relative" ref={suggestionsRef}>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="Enter your address"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setQuery(e.target.value);
                            setShowSuggestions(true);
                          }}
                          onFocus={() => setShowSuggestions(true)}
                          className="text-base pl-10"
                        />
                      </FormControl>
                    </div>

                    {/* Autocomplete Suggestions */}
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-lg">
                        <div className="max-h-60 overflow-auto p-1">
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              type="button"
                              className="w-full rounded-sm px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              onClick={() => handleSelect(suggestion)}
                            >
                              <div className="font-medium">
                                {suggestion.streetAddress}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {suggestion.city}, {suggestion.state}{" "}
                                {suggestion.zipCode}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <FormDescription className="text-xs">
                    Start typing and select from suggestions
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="City"
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* State (Auto-filled, searchable) */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State *</FormLabel>
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
                      Auto-filled from address or search by name/code
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Zip Code */}
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="XXXXX"
                        {...field}
                        onChange={(e) => {
                          const formatted = formatZipCode(e.target.value);
                          field.onChange(formatted);
                        }}
                        maxLength={10}
                        className="text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Required for consent process and policy documents
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="(XXX) XXX-XXXX"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatPhone(e.target.value);
                        field.onChange(formatted);
                      }}
                      maxLength={14}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

