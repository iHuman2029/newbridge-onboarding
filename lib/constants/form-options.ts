/**
 * Form Constants and Options
 * Contains dropdown options, states, and other static data
 */

/**
 * US States with abbreviations
 */
export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
] as const;

/**
 * Gender options
 */
export const GENDER_OPTIONS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
] as const;

/**
 * Height - Feet options (4-8 feet)
 */
export const HEIGHT_FEET_OPTIONS = [
  { value: 4, label: "4 ft" },
  { value: 5, label: "5 ft" },
  { value: 6, label: "6 ft" },
  { value: 7, label: "7 ft" },
  { value: 8, label: "8 ft" },
] as const;

/**
 * Height - Inches options (0-11 inches)
 */
export const HEIGHT_INCHES_OPTIONS = [
  { value: 0, label: '0"' },
  { value: 1, label: '1"' },
  { value: 2, label: '2"' },
  { value: 3, label: '3"' },
  { value: 4, label: '4"' },
  { value: 5, label: '5"' },
  { value: 6, label: '6"' },
  { value: 7, label: '7"' },
  { value: 8, label: '8"' },
  { value: 9, label: '9"' },
  { value: 10, label: '10"' },
  { value: 11, label: '11"' },
] as const;

/**
 * Beneficiary relationship options
 */
export const RELATIONSHIP_OPTIONS = [
  { value: "Spouse", label: "Spouse" },
  { value: "Child", label: "Child" },
  { value: "Parent", label: "Parent" },
  { value: "Sibling", label: "Sibling" },
  { value: "Other", label: "Other" },
] as const;

/**
 * Onboarding steps metadata
 */
export const ONBOARDING_STEPS = [
  {
    id: 1,
    title: "Personal",
    description: "Basic information",
  },
  {
    id: 2,
    title: "Contact",
    description: "Address and contact details",
  },
  {
    id: 3,
    title: "Physical",
    description: "Height, weight, and health",
  },
  {
    id: 4,
    title: "License",
    description: "Driver's license or ID",
  },
  {
    id: 5,
    title: "Beneficiary",
    description: "Beneficiary designation",
  },
] as const;

/**
 * BMI Categories for visual indicators
 */
export const BMI_CATEGORIES = {
  underweight: { min: 0, max: 18.5, label: "Underweight", color: "text-yellow-600" },
  normal: { min: 18.5, max: 24.9, label: "Healthy Weight", color: "text-green-600" },
  overweight: { min: 25, max: 29.9, label: "Overweight", color: "text-orange-600" },
  obese: { min: 30, max: 100, label: "Obese", color: "text-red-600" },
} as const;

/**
 * Tier 2 Smart Defaults
 */
export const SMART_DEFAULTS = {
  tobaccoUse: false, // Default: No tobacco use
  hasLicense: true, // Default: Yes, has valid license
  heightFeet: 5, // Default: 5 feet (average)
  heightInches: 9, // Default: 9 inches (5'9" average)
  weight: 170, // Default: 170 lbs (average)
} as const;

