# Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Navigate to project directory**:
```bash
cd nextjs-frontend
```

3. **Run deployment command**:
```bash
vercel
```

4. **Follow the prompts**:
   - Login to Vercel (if first time)
   - Confirm project settings
   - Deploy!

5. **Your app will be live!** 🎉
   - You'll get a URL like: `https://your-app.vercel.app`

### Option 2: Deploy via Vercel Dashboard (Recommended for GitHub Integration)

#### Step 1: Push to GitHub (if not already done)

```bash
# Initialize git repository (if not done)
cd nextjs-frontend
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - NewBridge onboarding app"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/newbridge-onboarding.git
git branch -M main
git push -u origin main
```

#### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository
5. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

#### Step 3: Configure Environment Variables (Optional)

If you want to use real address API:

1. In Vercel project settings
2. Go to **"Environment Variables"**
3. Add variables:
   ```
   NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_key_here
   ```

#### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Your app is live! 🚀

## Pre-Deployment Checklist

### ✅ Essential Checks

- [x] All dependencies installed (`package.json` complete)
- [x] No TypeScript errors (`npm run build` succeeds locally)
- [x] No linting errors
- [x] All components properly imported
- [x] Environment variables documented
- [x] API routes working

### 🔧 Configuration Files

Your project already has:
- ✅ `next.config.js` - Next.js configuration
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `tailwind.config.ts` - Tailwind CSS configuration
- ✅ `postcss.config.js` - PostCSS configuration
- ✅ `package.json` - Dependencies

## Vercel-Specific Optimizations

### Automatic Features (Already Enabled)

Your Next.js app automatically gets:

1. **Edge Network**: Global CDN distribution
2. **Automatic HTTPS**: SSL certificates
3. **Image Optimization**: Next.js Image component
4. **Incremental Static Regeneration**: Fast page loads
5. **Zero-Config Deployments**: Just works!

### Performance Settings

Vercel automatically optimizes:
- ✅ Static page generation
- ✅ API routes as serverless functions
- ✅ Code splitting
- ✅ Asset compression

## Post-Deployment

### Testing Your Live App

1. **Visit your deployment URL**
2. **Test all features**:
   - Landing page loads
   - Click "Get Your Quote Now"
   - Fill out all 5 steps
   - Submit application
   - See success screen

3. **Test on mobile devices**
4. **Check browser console** for errors

### Custom Domain Setup (Optional)

1. In Vercel dashboard
2. Go to **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for propagation (5-60 minutes)

## Continuous Deployment

Once connected to GitHub:

1. **Push to main branch** → Automatic production deployment
2. **Push to other branches** → Automatic preview deployments
3. **Pull requests** → Get preview URLs for testing

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically deploys! 🚀
```

## Environment Variables for Production

### Current Setup (No APIs Required)

Your app currently uses **mock data** for address autocomplete, so it works immediately without any API keys!

### Optional: Add Real Address API

If you want real address autocomplete later:

**Google Places API**:
```bash
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_key_here
```

**Mapbox API**:
```bash
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here
```

To add in Vercel:
1. Dashboard → Your Project → Settings → Environment Variables
2. Add variable name and value
3. Redeploy

## Monitoring & Analytics

### Vercel Analytics (Free)

1. In Vercel dashboard
2. Go to **"Analytics"**
3. Enable Vercel Analytics
4. Get real-time performance metrics

### Error Tracking (Optional)

Consider adding:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **Google Analytics** for user analytics

## Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Locally, run:
cd nextjs-frontend
rm -rf node_modules package-lock.json
npm install
npm run build

# If successful, commit and push
```

**Error: "TypeScript errors"**
```bash
# Check for errors:
npx tsc --noEmit

# Fix errors, then deploy
```

### Deployment Success but App Doesn't Work

1. **Check Vercel logs**:
   - Dashboard → Deployments → View Function Logs
   
2. **Check browser console** for errors

3. **Verify all files committed**:
   ```bash
   git status  # Should be clean
   ```

### Environment Variables Not Working

1. Make sure they start with `NEXT_PUBLIC_` for client-side access
2. Redeploy after adding variables
3. Check spelling and format

## Performance Tips

### Already Implemented ✅

Your app already has:
- Code splitting
- Lazy loading
- Image optimization ready
- Minimal bundle size
- Fast page loads

### Recommended Additions

1. **Add Vercel Analytics**
2. **Enable Vercel Speed Insights**
3. **Monitor Core Web Vitals**

## Security Checklist

- [x] HTTPS enabled (automatic)
- [x] Environment variables secured
- [x] No sensitive data in client code
- [x] Input validation (Zod)
- [x] XSS protection (React)
- [ ] Add Content Security Policy (optional)
- [ ] Add rate limiting for API routes (optional)

## Cost

**Vercel Free Tier** includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Preview deployments
- ✅ Analytics

Your app will run **completely free** on Vercel!

## Quick Commands Reference

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm [deployment-url]
```

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Discord**: https://vercel.com/discord

---

## 🎉 Ready to Deploy!

Your app is **production-ready** and optimized for Vercel. Just push to GitHub or run `vercel` command!

### Quick Start Commands:

```bash
cd nextjs-frontend
vercel
```

That's it! Your app will be live in 2-3 minutes! 🚀

