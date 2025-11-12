import { differenceInYears, parse } from "date-fns";

/**
 * Format SSN to XXX-XX-XXXX pattern
 * @param value - Raw SSN string (digits only or partially formatted)
 * @returns Formatted SSN string
 */
export function formatSSN(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");
  
  // Limit to 9 digits
  const limited = digits.slice(0, 9);
  
  // Format as XXX-XX-XXXX
  if (limited.length <= 3) {
    return limited;
  } else if (limited.length <= 5) {
    return `${limited.slice(0, 3)}-${limited.slice(3)}`;
  } else {
    return `${limited.slice(0, 3)}-${limited.slice(3, 5)}-${limited.slice(5)}`;
  }
}

/**
 * Format phone number to (XXX) XXX-XXXX pattern
 * @param value - Raw phone string (digits only or partially formatted)
 * @returns Formatted phone string
 */
export function formatPhone(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");
  
  // Limit to 10 digits
  const limited = digits.slice(0, 10);
  
  // Format as (XXX) XXX-XXXX
  if (limited.length <= 3) {
    return limited;
  } else if (limited.length <= 6) {
    return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
  } else {
    return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
  }
}

/**
 * Calculate BMI from height and weight
 * @param heightFeet - Height in feet
 * @param heightInches - Height in inches
 * @param weightPounds - Weight in pounds
 * @returns BMI value rounded to 1 decimal place
 */
export function calculateBMI(
  heightFeet: number,
  heightInches: number,
  weightPounds: number
): number {
  // Convert height to inches
  const totalHeightInches = heightFeet * 12 + heightInches;
  
  // BMI formula: (weight in pounds / (height in inches)²) × 703
  const bmi = (weightPounds / (totalHeightInches * totalHeightInches)) * 703;
  
  return Math.round(bmi * 10) / 10;
}

/**
 * Get BMI category based on BMI value
 * @param bmi - BMI value
 * @returns Category object with label and color
 */
export function getBMICategory(bmi: number): {
  category: string;
  label: string;
  color: string;
} {
  if (bmi < 18.5) {
    return {
      category: "underweight",
      label: "Underweight",
      color: "text-yellow-600",
    };
  } else if (bmi < 25) {
    return {
      category: "normal",
      label: "Healthy Weight",
      color: "text-green-600",
    };
  } else if (bmi < 30) {
    return {
      category: "overweight",
      label: "Overweight",
      color: "text-orange-600",
    };
  } else {
    return {
      category: "obese",
      label: "Obese",
      color: "text-red-600",
    };
  }
}

/**
 * Calculate age from date of birth
 * @param dateOfBirth - Date string in MM/dd/yyyy format
 * @returns Age in years
 */
export function calculateAge(dateOfBirth: string): number {
  try {
    const dob = parse(dateOfBirth, "MM/dd/yyyy", new Date());
    return differenceInYears(new Date(), dob);
  } catch {
    return 0;
  }
}

/**
 * Validate that beneficiary shares total 100%
 * @param shares - Array of share percentages
 * @returns True if shares total 100%, false otherwise
 */
export function validateBeneficiaryShares(shares: number[]): boolean {
  const total = shares.reduce((sum, share) => sum + share, 0);
  return total === 100;
}

/**
 * Format date for display
 * @param dateString - Date string in MM/dd/yyyy format
 * @returns Formatted date string or empty if invalid
 */
export function formatDateDisplay(dateString: string): string {
  try {
    const date = parse(dateString, "MM/dd/yyyy", new Date());
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

/**
 * Mask SSN for display (show only last 4 digits)
 * @param ssn - Full SSN string
 * @returns Masked SSN (XXX-XX-1234)
 */
export function maskSSN(ssn: string): string {
  if (ssn.length !== 11) return ssn; // Expected format: XXX-XX-XXXX
  return `XXX-XX-${ssn.slice(-4)}`;
}

/**
 * Format zip code
 * @param value - Raw zip code string
 * @returns Formatted zip code (XXXXX or XXXXX-XXXX)
 */
export function formatZipCode(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");
  
  // Limit to 9 digits
  const limited = digits.slice(0, 9);
  
  // Format as XXXXX or XXXXX-XXXX
  if (limited.length <= 5) {
    return limited;
  } else {
    return `${limited.slice(0, 5)}-${limited.slice(5)}`;
  }
}

/**
 * Get state name from abbreviation
 * @param stateCode - 2-letter state code
 * @returns Full state name or code if not found
 */
export function getStateName(stateCode: string): string {
  const states: Record<string, string> = {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
  };
  
  return states[stateCode.toUpperCase()] || stateCode;
}

