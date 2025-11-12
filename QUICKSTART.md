# Quick Start Guide

Get the NewBridge onboarding application running in 5 minutes!

## Prerequisites Check

Ensure you have:
- Node.js 18+ installed (`node --version`)
- npm, yarn, or pnpm installed
- A code editor (VS Code recommended)

## Installation (3 steps)

### 1. Install Dependencies

```bash
cd nextjs-frontend
npm install
```

This will install all required packages (~30 seconds).

### 2. Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:3000`

### 3. Open in Browser

Navigate to: **http://localhost:3000**

That's it! You should see the landing page.

## First Steps

### Explore the Landing Page

1. View the hero section with CTA
2. Scroll through benefits and features
3. See the "How It Works" section

### Test the Application Flow

1. Click **"Get Your Quote Now"** button
2. Complete Step 1: Personal Information
   - Notice the age calculation as you type DOB
   - Try the SSN show/hide toggle
3. Complete Step 2: Contact Information
   - Type an address and see autocomplete suggestions
   - Notice city/state auto-fill
4. Complete Step 3: Physical Information
   - Watch the BMI calculate in real-time
   - See the smart defaults pre-filled
5. Complete Step 4: License Information
   - Toggle the license switch
   - See conditional fields appear
6. Complete Step 5: Beneficiary
   - Add a beneficiary
   - Watch the progress circle update
   - Try adding another (shares must total 100%)
7. Submit the application
   - View the success screen
   - See your data summarized

### Test Persistence

1. Fill out step 1
2. Close the browser tab
3. Reopen `http://localhost:3000`
4. Click "Get Your Quote Now"
5. Notice your data is still there! (localStorage)

## Key Features to Try

### Smart Defaults (Tier 2)

The form pre-fills healthy values:
- Height: 5'9"
- Weight: 170 lbs
- Tobacco: No
- Has License: Yes

Just adjust if different!

### Auto-Fill (Tier 3)

Watch these fill automatically:
- City/State from address selection
- License state from residence state

### Real-time Validation

Try these to see validation:
- Enter invalid SSN format
- Enter age < 18 or > 85
- Leave required fields empty
- Enter invalid email

### Responsive Design

Test on different screen sizes:
- Desktop: Full layout with detailed progress
- Tablet: Responsive grid
- Mobile: Single column, compact UI

## Development Tips

### Hot Reload

Edit any file and see changes instantly:
```typescript
// Try editing app/(landing)/page.tsx
<h1>Your Custom Title</h1>
```

Save and watch the browser update automatically!

### View Form State

Open browser console and check localStorage:
```javascript
localStorage.getItem('newbridge-onboarding-storage')
```

You'll see the form state JSON.

### Test Different Scenarios

**Happy Path**: Fill all fields correctly
**Error Path**: Submit with missing fields
**Partial Save**: Fill halfway, reload page
**Multiple Beneficiaries**: Add 3 beneficiaries at 33%, 33%, 34%

## File Structure (Where to Find Things)

```
nextjs-frontend/
├── app/(landing)/page.tsx        ← Landing page UI
├── components/onboarding/
│   ├── onboarding-wizard.tsx    ← Main wizard
│   ├── success-screen.tsx       ← Success page
│   └── steps/                   ← Individual steps
├── lib/
│   ├── stores/onboarding-store.ts  ← Form state
│   ├── schemas/onboarding-schema.ts ← Validation
│   └── utils/format-helpers.ts     ← Utilities
└── components/ui/               ← UI components
```

## Common Tasks

### Add a New Field

1. Add to schema: `lib/schemas/onboarding-schema.ts`
2. Add to store: `lib/stores/onboarding-store.ts`
3. Add to component: `components/onboarding/steps/step-*.tsx`

### Change Smart Defaults

Edit: `lib/constants/form-options.ts`

```typescript
export const SMART_DEFAULTS = {
  tobaccoUse: false,  // ← Change this
  hasLicense: true,
  heightFeet: 5,
  heightInches: 9,
  weight: 170,
}
```

### Customize Styling

Edit: `tailwind.config.ts` for theme
Or: Add classes directly in components

```typescript
<Button className="bg-red-500 hover:bg-red-600">
  Custom Button
</Button>
```

### Add New Validation Rule

Edit: `lib/schemas/onboarding-schema.ts`

```typescript
firstName: z.string()
  .min(2)
  .max(50)
  .regex(/^[a-zA-Z]+$/)  // ← Add rules here
```

## Build for Production

### Build

```bash
npm run build
```

This creates an optimized production build.

### Test Production Build

```bash
npm run start
```

Opens at `http://localhost:3000`

### Check Bundle Size

```bash
npm run build
```

Look for output showing page sizes.

## Troubleshooting

### Port Already in Use

```bash
# Use different port
npm run dev -- -p 3001
```

### Dependencies Not Installing

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Type Errors

```bash
# Check TypeScript
npx tsc --noEmit
```

### Styling Not Working

```bash
# Rebuild Tailwind
npm run dev
# Refresh browser with cache clear (Ctrl+Shift+R)
```

## Next Steps

1. **Read README.md** for full documentation
2. **Read ARCHITECTURE.md** for system design
3. **Customize** the landing page copy
4. **Add** your own branding/logo
5. **Integrate** with backend API
6. **Deploy** to Vercel

## Getting Help

- Check documentation in README.md
- Review code comments
- Check console for errors
- Search issues on GitHub

## Production Checklist

Before deploying:
- [ ] Replace mock address API with real service
- [ ] Add real API endpoints for form submission
- [ ] Set up error tracking (Sentry)
- [ ] Add analytics (Google Analytics)
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Run accessibility audit
- [ ] Run performance audit (Lighthouse)
- [ ] Set up monitoring
- [ ] Configure environment variables
- [ ] Enable HTTPS
- [ ] Add rate limiting

---

Happy coding! 🚀

Questions? Check README.md or ARCHITECTURE.md

