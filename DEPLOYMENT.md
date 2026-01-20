# 🚀 PropertyFlow CRM - Deployment Guide

This guide will walk you through deploying your PropertyFlow CRM to Vercel with a MongoDB Atlas database.

## Step-by-Step Deployment

### Phase 1: Prepare MongoDB Database (10 minutes)

1. **Create MongoDB Atlas Account**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up with email or Google account
   - Verify your email address

2. **Create a Free Cluster**
   - Click "Build a Database"
   - Select "Shared" (Free tier - M0)
   - Choose your preferred cloud provider (AWS/GCP/Azure)
   - Select a region close to your users
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Create Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `propertyflow_admin`
   - Password: Generate a secure password (save it!)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for Vercel)
   - IP Address will be `0.0.0.0/0`
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Click "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://propertyflow_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - Add database name at the end: `/propertyflow-crm`
   - Final string:
     ```
     mongodb+srv://propertyflow_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/propertyflow-crm?retryWrites=true&w=majority
     ```
   - **SAVE THIS STRING - YOU'LL NEED IT!**

### Phase 2: Deploy to Vercel (5 minutes)

#### Option A: Deploy from GitHub (Recommended)

1. **Push Code to GitHub**
   ```bash
   # Initialize git repository (if not already)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit - PropertyFlow CRM"
   
   # Create a new repository on GitHub and add remote
   git remote add origin https://github.com/YOUR_USERNAME/propertyflow-crm.git
   
   # Push to GitHub
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/signup
   - Sign up with GitHub
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Find and import your `propertyflow-crm` repository
   - Click "Import"

3. **Configure Environment Variables**
   - In the "Configure Project" screen
   - Expand "Environment Variables"
   - Add variable:
     - Name: `MONGODB_URI`
     - Value: Your MongoDB connection string from Phase 1
   - Click "Deploy"

4. **Wait for Deployment**
   - Vercel will build and deploy (takes 1-2 minutes)
   - You'll get a URL like: `https://propertyflow-crm.vercel.app`

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
4. **Set Environment Variable**
   ```bash
   vercel env add MONGODB_URI
   ```
   - Paste your MongoDB connection string
   - Select "Production"

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Phase 3: Seed Database (Optional - 2 minutes)

If you want to add sample data to your production database:

1. **Set MongoDB URI Locally**
   ```bash
   # On macOS/Linux
   export MONGODB_URI="mongodb+srv://propertyflow_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/propertyflow-crm"
   
   # On Windows (Command Prompt)
   set MONGODB_URI=mongodb+srv://propertyflow_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/propertyflow-crm
   
   # On Windows (PowerShell)
   $env:MONGODB_URI="mongodb+srv://propertyflow_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/propertyflow-crm"
   ```

2. **Run Seed Script**
   ```bash
   npm run seed
   ```

3. **Verify**
   - Visit your Vercel URL
   - You should see sample leads, properties, and stats

### Phase 4: Verify Deployment (2 minutes)

1. **Test the Frontend**
   - Visit your Vercel URL (e.g., `https://propertyflow-crm.vercel.app`)
   - You should see the PropertyFlow CRM dashboard
   - Check that stats are showing (if you seeded the database)

2. **Test the API**
   ```bash
   # Replace with your actual Vercel URL
   curl https://propertyflow-crm.vercel.app/api/health
   
   # Should return: {"status":"OK","message":"PropertyFlow CRM API is running"}
   ```

3. **Test Core Features**
   - Navigate to "Leads" page
   - Try adding a new lead
   - Navigate to "Properties" page
   - Try viewing property cards

### Troubleshooting Common Issues

#### Issue: "MongoDB connection error"
**Solution:**
- Verify your MONGODB_URI is correct
- Check that you replaced `<password>` with actual password
- Ensure Network Access allows `0.0.0.0/0`
- Verify database user has "Read and write" permissions

#### Issue: "API endpoints returning 404"
**Solution:**
- Check `vercel.json` is properly configured
- Redeploy: `vercel --prod`
- Check Vercel deployment logs

#### Issue: "Environment variables not working"
**Solution:**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Verify MONGODB_URI is set for "Production" environment
- Redeploy the project

#### Issue: "Frontend loads but no data"
**Solution:**
- The database might be empty
- Run the seed script (Phase 3)
- Or manually add data through the UI

### Post-Deployment Steps

1. **Custom Domain (Optional)**
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Set Up Monitoring**
   - Vercel Dashboard provides analytics
   - Monitor API response times
   - Check error logs regularly

3. **Backup Database**
   - MongoDB Atlas provides automated backups
   - Go to your cluster → Backup
   - Configure backup schedule

4. **Security Hardening**
   - Implement user authentication
   - Add API rate limiting
   - Set up CORS restrictions
   - Enable HTTPS only

### Updating Your Deployment

Whenever you make changes to your code:

**If using GitHub:**
```bash
git add .
git commit -m "Description of changes"
git push
```
Vercel automatically deploys on push.

**If using CLI:**
```bash
vercel --prod
```

### Cost Information

**MongoDB Atlas:**
- Free tier (M0): ✅ FREE
- 512 MB storage
- Shared RAM
- Perfect for development and small apps

**Vercel:**
- Hobby plan: ✅ FREE
- 100 GB bandwidth/month
- Serverless function execution
- Automatic HTTPS

Both services are free for small to medium traffic!

### Need Help?

- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
- **Vercel Docs:** https://vercel.com/docs
- **Project Issues:** Check the README.md

---

🎉 **Congratulations!** Your PropertyFlow CRM is now live!

Visit your deployment URL and start managing your real estate business! 🏠
