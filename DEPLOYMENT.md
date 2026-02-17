# Vercel Deployment Guide

## Authentication System Updates

The authentication system has been updated to work properly on Vercel with the following improvements:

### Changes Made:

1. **Server-Side Route Protection** - Added `middleware.js` for protecting routes at the server level
2. **Client-Side Session Management** - Updated auth store with `checkAuth()` function
3. **Dashboard Authentication** - Added authentication verification to dashboard layout
4. **Cookie Configuration** - Improved cookie settings for production environments

## Required Environment Variables on Vercel

Make sure you have set the following environment variables in your Vercel project settings:

### Required Variables:

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT Secrets (Use strong, random strings - at least 32 characters)
JWT_ACCESS_SECRET=your_strong_random_secret_here
JWT_REFRESH_SECRET=your_different_strong_random_secret_here

# Token Expiration (Optional, defaults shown)
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=30d

# App Configuration
NEXT_PUBLIC_APP_NAME=Shopelp
NEXT_PUBLIC_DEFAULT_CURRENCY=USD
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app

# Node Environment (Vercel sets this automatically)
NODE_ENV=production
```

### How to Set Environment Variables on Vercel:

1. Go to your project dashboard on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its value
4. Make sure to select the appropriate environments (Production, Preview, Development)
5. Redeploy your application after adding the variables

### Important Notes:

- **JWT Secrets**: Generate strong, random secrets for JWT_ACCESS_SECRET and JWT_REFRESH_SECRET
  - You can use: `openssl rand -base64 32` to generate random secrets
  - Never use the example secrets in production
  
- **MongoDB URI**: Ensure your MongoDB cluster allows connections from Vercel
  - In MongoDB Atlas, add `0.0.0.0/0` to IP whitelist (or specific Vercel IPs)
  
- **Base URL**: Update NEXT_PUBLIC_BASE_URL to match your Vercel deployment URL

### Testing Authentication:

After deployment:

1. Clear your browser cookies
2. Try accessing `/dashboard` - should redirect to `/auth/login`
3. Register a new account or login with existing credentials
4. Upon successful login, you should be redirected to `/dashboard`
5. Try accessing protected routes - they should work normally
6. Logout and verify you're redirected back to login

### Troubleshooting:

If authentication still doesn't work:

1. **Check Vercel Logs**: Check the Functions tab in your Vercel dashboard for errors
2. **Verify Environment Variables**: Make sure all required variables are set correctly
3. **Check MongoDB Connection**: Verify your MongoDB Atlas whitelist includes Vercel IPs
4. **Cookie Issues**: Ensure your domain doesn't have conflicting cookie settings
5. **Browser Console**: Check for any client-side errors

### Common Issues:

- **"Unauthorized" errors**: Check JWT secrets are set correctly
- **Redirect loops**: Verify cookies are being set (check browser DevTools → Application → Cookies)
- **Database connection errors**: Check MongoDB URI and IP whitelist
- **401 on /api/auth/me**: Make sure cookies are being sent with requests

## Additional Recommendations:

1. Enable Vercel Analytics for monitoring
2. Set up proper error tracking (e.g., Sentry)
3. Use Vercel's built-in security features
4. Regularly rotate JWT secrets for better security
5. Monitor your MongoDB Atlas usage and performance
