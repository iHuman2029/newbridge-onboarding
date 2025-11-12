import { z } from "zod";
import { differenceInYears, parse } from "date-fns";

/**
 * SSN validation: XXX-XX-XXXX format
 */
const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;

/**
 * Phone validation: (XXX) XXX-XXXX format
 */
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

/**
 * Helper function to validate age from date of birth
 */
const validateAge = (dateString: string, minAge: number, maxAge: number) => {
  try {
    const dob = parse(dateString, "MM/dd/yyyy", new Date());
    const age = differenceInYears(new Date(), dob);
    return age >= minAge && age <= maxAge;
  } catch {
    return false;
  }
};

/**
 * Step 1: Personal Information Schema
 * Fields: Legal First Name, Legal Last Name, Date of Birth, Gender, SSN
 */
export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
  
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
  
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine(
      (val) => validateAge(val, 18, 85),
      "Applicant must be between 18 and 85 years old"
    ),
  
  gender: z.enum(["Male", "Female"], {
    required_error: "Please select a gender",
  }),
  
  ssn: z
    .string()
    .regex(ssnRegex, "SSN must be in format XXX-XX-XXXX")
    .refine((val) => val !== "000-00-0000", "Invalid SSN"),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

/**
 * Step 2: Contact Information Schema
 * Fields: Street Address, Zip Code, Email, Phone
 * Note: City and State are auto-filled from address lookup (Tier 3)
 */
export const contactInfoSchema = z.object({
  streetAddress: z
    .string()
    .min(5, "Street address must be at least 5 characters")
    .max(100, "Street address must not exceed 100 characters"),
  
  city: z
    .string()
    .min(2, "City is required")
    .max(50, "City must not exceed 50 characters"),
  
  state: z
    .string()
    .length(2, "State code must be 2 characters")
    .regex(/^[A-Z]{2}$/, "Invalid state code"),
  
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, "Zip code must be in format XXXXX or XXXXX-XXXX"),
  
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must not exceed 100 characters"),
  
  phone: z
    .string()
    .regex(phoneRegex, "Phone must be in format (XXX) XXX-XXXX"),
});

export type ContactInfoFormData = z.infer<typeof contactInfoSchema>;

/**
 * Step 3: Physical Information Schema
 * Fields: Height (Feet/Inches), Weight, Tobacco Use
 */
export const physicalInfoSchema = z.object({
  heightFeet: z
    .number()
    .min(4, "Height must be at least 4 feet")
    .max(8, "Height must not exceed 8 feet"),
  
  heightInches: z
    .number()
    .min(0, "Inches must be between 0 and 11")
    .max(11, "Inches must be between 0 and 11"),
  
  weight: z
    .number()
    .min(50, "Weight must be at least 50 pounds")
    .max(500, "Weight must not exceed 500 pounds"),
  
  tobaccoUse: z.boolean({
    required_error: "Please select tobacco use status",
  }),
});

export type PhysicalInfoFormData = z.infer<typeof physicalInfoSchema>;

/**
 * Step 4: Driver's License Information Schema
 * Fields: Has Valid License/ID, License Number, License State
 * Note: License State is auto-filled from residence state (Tier 3)
 */
export const licenseInfoSchema = z.object({
  hasLicense: z.boolean({
    required_error: "Please select if you have a valid license or ID",
  }),
  
  licenseNumber: z.string().optional(),
  
  licenseState: z.string().length(2).regex(/^[A-Z]{2}$/).optional(),
}).refine(
  (data) => {
    // If hasLicense is true, licenseNumber and licenseState are required
    if (data.hasLicense) {
      return !!data.licenseNumber && data.licenseNumber.length >= 5 && !!data.licenseState;
    }
    return true;
  },
  {
    message: "License number and state are required when you have a valid license",
    path: ["licenseNumber"],
  }
);

export type LicenseInfoFormData = z.infer<typeof licenseInfoSchema>;

/**
 * Beneficiary Schema (used in Step 5)
 */
export const beneficiarySchema = z.object({
  id: z.string(),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),
  
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),
  
  relationship: z.enum(["Spouse", "Child", "Parent", "Sibling", "Other"], {
    required_error: "Please select a relationship",
  }),
  
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine(
      (val) => {
        try {
          const dob = parse(val, "MM/dd/yyyy", new Date());
          return differenceInYears(new Date(), dob) >= 0;
        } catch {
          return false;
        }
      },
      "Please enter a valid date of birth"
    ),
  
  share: z
    .number()
    .min(1, "Share must be at least 1%")
    .max(100, "Share must not exceed 100%"),
});

export type BeneficiaryFormData = z.infer<typeof beneficiarySchema>;

/**
 * Step 5: Beneficiary Assignment Schema
 * Validates that primary beneficiaries total 100%
 */
export const beneficiaryAssignmentSchema = z.object({
  beneficiaries: z
    .array(beneficiarySchema)
    .min(1, "At least one beneficiary is required")
    .refine(
      (beneficiaries) => {
        const totalShare = beneficiaries.reduce((sum, b) => sum + b.share, 0);
        return totalShare === 100;
      },
      "Total beneficiary shares must equal 100%"
    ),
});

export type BeneficiaryAssignmentFormData = z.infer<typeof beneficiaryAssignmentSchema>;

/**
 * Complete Onboarding Form Schema
 * Combines all steps for final submission
 */
export const completeOnboardingSchema = z.object({
  personalInfo: personalInfoSchema,
  contactInfo: contactInfoSchema,
  physicalInfo: physicalInfoSchema,
  licenseInfo: licenseInfoSchema,
  beneficiaries: beneficiaryAssignmentSchema,
});

export type CompleteOnboardingFormData = z.infer<typeof completeOnboardingSchema>;

