import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  PersonalInfoFormData,
  ContactInfoFormData,
  PhysicalInfoFormData,
  LicenseInfoFormData,
  BeneficiaryFormData,
} from "../schemas/onboarding-schema";
import { SMART_DEFAULTS } from "../constants/form-options";

/**
 * Onboarding form state interface
 */
export interface OnboardingState {
  // Current step (1-5)
  currentStep: number;
  
  // Step completion status
  completedSteps: Set<number>;
  
  // Form data for each step
  personalInfo: Partial<PersonalInfoFormData>;
  contactInfo: Partial<ContactInfoFormData>;
  physicalInfo: Partial<PhysicalInfoFormData>;
  licenseInfo: Partial<LicenseInfoFormData>;
  beneficiaries: BeneficiaryFormData[];
  
  // Form submission state
  isSubmitting: boolean;
  isSubmitted: boolean;
  submissionError: string | null;
  
  // Actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  markStepComplete: (step: number) => void;
  
  // Update form data
  updatePersonalInfo: (data: Partial<PersonalInfoFormData>) => void;
  updateContactInfo: (data: Partial<ContactInfoFormData>) => void;
  updatePhysicalInfo: (data: Partial<PhysicalInfoFormData>) => void;
  updateLicenseInfo: (data: Partial<LicenseInfoFormData>) => void;
  
  // Beneficiary management
  addBeneficiary: (beneficiary: BeneficiaryFormData) => void;
  updateBeneficiary: (id: string, beneficiary: Partial<BeneficiaryFormData>) => void;
  removeBeneficiary: (id: string) => void;
  
  // Form submission
  submitForm: () => Promise<void>;
  setSubmissionError: (error: string | null) => void;
  
  // Reset
  resetForm: () => void;
}

/**
 * Initial state with smart defaults (Tier 2)
 */
const initialState = {
  currentStep: 1,
  completedSteps: new Set<number>(),
  personalInfo: {},
  contactInfo: {},
  physicalInfo: {
    // Apply Tier 2 smart defaults
    heightFeet: SMART_DEFAULTS.heightFeet,
    heightInches: SMART_DEFAULTS.heightInches,
    weight: SMART_DEFAULTS.weight,
    tobaccoUse: SMART_DEFAULTS.tobaccoUse,
  },
  licenseInfo: {
    // Apply Tier 2 smart default
    hasLicense: SMART_DEFAULTS.hasLicense,
  },
  beneficiaries: [],
  isSubmitting: false,
  isSubmitted: false,
  submissionError: null,
};

/**
 * Onboarding Store with localStorage persistence
 */
export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Navigation actions
      setCurrentStep: (step) => {
        if (step >= 1 && step <= 5) {
          set({ currentStep: step });
        }
      },

      nextStep: () => {
        const { currentStep, completedSteps } = get();
        if (currentStep < 5) {
          const newCompletedSteps = new Set(completedSteps);
          newCompletedSteps.add(currentStep);
          set({
            currentStep: currentStep + 1,
            completedSteps: newCompletedSteps,
          });
        }
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      markStepComplete: (step) => {
        const { completedSteps } = get();
        const newCompletedSteps = new Set(completedSteps);
        newCompletedSteps.add(step);
        set({ completedSteps: newCompletedSteps });
      },

      // Update form data actions
      updatePersonalInfo: (data) => {
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...data },
        }));
      },

      updateContactInfo: (data) => {
        set((state) => ({
          contactInfo: { ...state.contactInfo, ...data },
        }));
        
        // Tier 3 Auto-fill: If state is updated, auto-fill license state
        if (data.state) {
          set((state) => ({
            licenseInfo: {
              ...state.licenseInfo,
              licenseState: data.state,
            },
          }));
        }
      },

      updatePhysicalInfo: (data) => {
        set((state) => ({
          physicalInfo: { ...state.physicalInfo, ...data },
        }));
      },

      updateLicenseInfo: (data) => {
        set((state) => ({
          licenseInfo: { ...state.licenseInfo, ...data },
        }));
      },

      // Beneficiary management actions
      addBeneficiary: (beneficiary) => {
        set((state) => ({
          beneficiaries: [...state.beneficiaries, beneficiary],
        }));
      },

      updateBeneficiary: (id, updates) => {
        set((state) => ({
          beneficiaries: state.beneficiaries.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        }));
      },

      removeBeneficiary: (id) => {
        set((state) => ({
          beneficiaries: state.beneficiaries.filter((b) => b.id !== id),
        }));
      },

      // Form submission
      submitForm: async () => {
        set({ isSubmitting: true, submissionError: null });

        try {
          const state = get();
          
          // Prepare complete form data
          const formData = {
            personalInfo: state.personalInfo,
            contactInfo: state.contactInfo,
            physicalInfo: state.physicalInfo,
            licenseInfo: state.licenseInfo,
            beneficiaries: {
              beneficiaries: state.beneficiaries,
            },
          };

          // Log to console for now (in production, this would be an API call)
          console.log("Submitting onboarding form:", formData);

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mark as submitted
          set({
            isSubmitting: false,
            isSubmitted: true,
            submissionError: null,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "An unknown error occurred";
          set({
            isSubmitting: false,
            submissionError: errorMessage,
          });
        }
      },

      setSubmissionError: (error) => {
        set({ submissionError: error });
      },

      // Reset form
      resetForm: () => {
        set(initialState);
      },
    }),
    {
      name: "newbridge-onboarding-storage",
      storage: createJSONStorage(() => {
        // Check if we're in the browser
        if (typeof window !== "undefined") {
          return localStorage;
        }
        // Fallback for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      // Custom serialization to handle Set
      partialize: (state) => ({
        currentStep: state.currentStep,
        completedSteps: Array.from(state.completedSteps),
        personalInfo: state.personalInfo,
        contactInfo: state.contactInfo,
        physicalInfo: state.physicalInfo,
        licenseInfo: state.licenseInfo,
        beneficiaries: state.beneficiaries,
      }),
      // Custom deserialization to restore Set
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.completedSteps)) {
          state.completedSteps = new Set(state.completedSteps);
        }
      },
    }
  )
);

