# Architecture Documentation

## System Overview

The NewBridge onboarding application is built using a modern, scalable architecture that prioritizes performance, user experience, and maintainability.

## Technology Decisions

### Framework: Next.js 14 (App Router)

**Why Next.js?**
- Server-side rendering for improved SEO
- File-based routing for intuitive structure
- Built-in API routes for backend functionality
- Excellent TypeScript support
- Image optimization out of the box
- Strong ecosystem and community

**Why App Router?**
- React Server Components for better performance
- Improved data fetching patterns
- Better code splitting
- Simplified layouts and nested routing

### State Management: Zustand

**Why Zustand over Redux?**
- Minimal boilerplate (100x less code)
- No context provider needed
- Easy middleware integration
- Great TypeScript support
- Perfect for form state management
- Built-in localStorage persistence

**Store Design:**
```typescript
interface OnboardingState {
  // Navigation
  currentStep: number
  completedSteps: Set<number>
  
  // Form Data (5 steps)
  personalInfo: {...}
  contactInfo: {...}
  physicalInfo: {...}
  licenseInfo: {...}
  beneficiaries: [...]
  
  // Actions
  nextStep, prevStep, updateField, etc.
}
```

### Form Management: React Hook Form + Zod

**Why React Hook Form?**
- Excellent performance (uncontrolled components)
- Minimal re-renders
- Built-in validation support
- Great DevTools

**Why Zod?**
- Type-safe schema validation
- Runtime and compile-time checks
- Excellent error messages
- Composable schemas

**Validation Strategy:**
- Client-side: Immediate feedback using Zod schemas
- Server-side: Re-validate on submission (security)
- Progressive: Only validate completed fields

### UI Framework: shadcn/ui + Radix UI

**Why shadcn/ui?**
- Copy-paste component model (full control)
- Built on Radix UI (accessibility first)
- Customizable with Tailwind
- No runtime overhead
- Type-safe

**Why Not a Full Library (MUI, Ant Design)?**
- Smaller bundle size
- More flexibility
- Better performance
- Easier customization

### Styling: Tailwind CSS

**Why Tailwind?**
- Utility-first approach (rapid development)
- Small production bundle (PurgeCSS)
- Consistent design system
- Excellent responsive utilities
- Dark mode built-in

## Component Architecture

### Atomic Design Principles

```
Components Hierarchy:
├── Pages (app/)
│   └── Landing Page
│       ├── Organisms
│       │   ├── OnboardingWizard
│       │   ├── SuccessScreen
│       │   └── Hero Section
│       ├── Molecules
│       │   ├── FormProgress
│       │   ├── Step Components
│       │   └── Feature Cards
│       └── Atoms
│           └── UI Components (shadcn)
```

### Component Patterns

**1. Container/Presenter Pattern**
```typescript
// Container: Logic + State
function StepPersonalInfo({ onNext }) {
  const form = useForm()
  const { updatePersonalInfo } = useOnboardingStore()
  
  // Handle logic
  const onSubmit = (data) => {
    updatePersonalInfo(data)
    onNext()
  }
  
  return <PersonalInfoForm form={form} onSubmit={onSubmit} />
}

// Presenter: Pure UI
function PersonalInfoForm({ form, onSubmit }) {
  return <Form>...</Form>
}
```

**2. Compound Components**
```typescript
<Card>
  <CardHeader>
    <CardTitle>...</CardTitle>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>
```

**3. Render Props / Children as Function**
```typescript
<FormField
  control={form.control}
  name="firstName"
  render={({ field }) => (
    <Input {...field} />
  )}
/>
```

## Data Flow

### Unidirectional Data Flow

```
User Action
    ↓
Form Handler (React Hook Form)
    ↓
Validation (Zod Schema)
    ↓
Store Action (Zustand)
    ↓
State Update
    ↓
UI Re-render
    ↓
localStorage Sync (Middleware)
```

### State Management Layers

**1. Local Component State (useState)**
- UI-only state (modals, toggles)
- Temporary form state
- Animation states

**2. Form State (React Hook Form)**
- Current step form data
- Validation errors
- Field dirty/touched states

**3. Global Application State (Zustand)**
- Multi-step form data
- Navigation state
- Submission status

**4. Persistent State (localStorage)**
- Form progress
- Partial submissions
- User preferences

## Performance Optimizations

### Code Splitting

```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./heavy'), {
  loading: () => <Spinner />
})
```

### React Optimizations

1. **Memoization**
```typescript
const bmi = useMemo(() => 
  calculateBMI(feet, inches, weight),
  [feet, inches, weight]
)
```

2. **Callback Optimization**
```typescript
const handleChange = useCallback((value) => {
  updateField(value)
}, [])
```

3. **Component Splitting**
- Separate step components
- Lazy-load success screen
- Code split by route

### Form Performance

- Uncontrolled inputs (React Hook Form)
- Debounced address autocomplete (500ms)
- Validation only on blur/submit
- Minimal re-renders

### Bundle Optimization

- Tree-shaking (ES modules)
- PurgeCSS (Tailwind)
- Image optimization (WebP)
- Font optimization (next/font)

## Accessibility (a11y)

### WCAG 2.1 AA Compliance

**Semantic HTML**
```typescript
<form>
  <fieldset>
    <legend>Personal Information</legend>
    <label htmlFor="firstName">First Name</label>
    <input id="firstName" />
  </fieldset>
</form>
```

**ARIA Attributes**
```typescript
<button
  aria-label="Show password"
  aria-pressed={showPassword}
>
  {showPassword ? <EyeOff /> : <Eye />}
</button>
```

**Keyboard Navigation**
- Tab order follows visual order
- Enter to submit
- Escape to close modals
- Arrow keys in dropdowns

**Focus Management**
- Visible focus indicators
- Focus trap in modals
- Auto-focus on errors

**Screen Reader Support**
- Descriptive labels
- Error announcements
- Progress updates
- Form validation messages

## Security Considerations

### Client-Side Security

1. **Input Sanitization**
```typescript
// Zod validation prevents injection
const schema = z.string()
  .min(2)
  .max(50)
  .regex(/^[a-zA-Z\s'-]+$/)
```

2. **SSN Protection**
```typescript
// Masked display
const maskSSN = (ssn) => `XXX-XX-${ssn.slice(-4)}`

// Password-type input
<Input type={showSSN ? "text" : "password"} />
```

3. **localStorage Security**
- No sensitive data in localStorage (production)
- Encryption recommended
- Clear on logout

### Server-Side Security (Future)

1. **API Authentication**
```typescript
// JWT tokens
// Rate limiting
// CORS configuration
```

2. **Data Validation**
```typescript
// Re-validate all inputs server-side
// Never trust client data
```

3. **HTTPS Only**
```typescript
// Enforce HTTPS in production
// Secure cookies
// HSTS headers
```

## Testing Strategy

### Testing Pyramid

```
       E2E Tests (5%)
      ↗           ↖
Integration Tests (15%)
↗                     ↖
Unit Tests (80%)
```

### Unit Tests
- Schema validation
- Format helpers
- Pure utility functions
- Component logic

### Integration Tests
- Multi-step navigation
- Form submission flow
- Store interactions
- API mocking

### E2E Tests
- Complete application flow
- Browser compatibility
- Accessibility checks
- Performance metrics

## Deployment Architecture

### Development
```
Local Machine
    ↓
Next.js Dev Server (http://localhost:3000)
    ↓
Hot Module Replacement
```

### Production
```
Git Push
    ↓
Vercel/CI
    ↓
Build & Optimize
    ↓
CDN Distribution (Static Assets)
    ↓
Edge Network (SSR)
    ↓
Users
```

### Monitoring (Recommended)

- **Analytics**: Google Analytics / Plausible
- **Error Tracking**: Sentry
- **Performance**: Vercel Analytics / Lighthouse CI
- **Logging**: Structured logging with Winston

## Future Enhancements

### Phase 2 Features

1. **Multi-language Support (i18n)**
```typescript
import { useTranslation } from 'next-i18next'
const { t } = useTranslation('onboarding')
```

2. **A/B Testing**
```typescript
import { useExperiment } from '@/lib/experiments'
const variant = useExperiment('wizard-layout')
```

3. **Real-time Collaboration**
```typescript
// Agent can see client's progress
// WebSocket connection
// Shared state
```

4. **Progressive Web App (PWA)**
```typescript
// Offline support
// Install prompt
// Push notifications
```

5. **Analytics & Tracking**
```typescript
// Form abandonment tracking
// Conversion funnels
// Heatmaps
```

## API Integration (Future)

### Backend API Structure

```
POST /api/applications
  - Create new application
  - Store in database
  - Return application ID

GET /api/applications/:id
  - Retrieve application
  - Resume progress

PUT /api/applications/:id
  - Update application
  - Auto-save progress

POST /api/applications/:id/submit
  - Final submission
  - Trigger underwriting
  - Send confirmation email
```

### Database Schema (Example)

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  status VARCHAR(50),
  current_step INT,
  personal_info JSONB,
  contact_info JSONB,
  physical_info JSONB,
  license_info JSONB,
  beneficiaries JSONB[],
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  submitted_at TIMESTAMP
);
```

## Conclusion

This architecture balances:
- **Performance**: Fast load times, minimal re-renders
- **Developer Experience**: Type-safe, maintainable code
- **User Experience**: Smooth, intuitive interface
- **Scalability**: Easy to extend and modify
- **Accessibility**: Inclusive design for all users

The modular design allows for incremental improvements without major refactoring.

