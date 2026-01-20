# Innovality Real Estate CRM - One-Click Deploy 🚀

<div align="center">

![Innovality CRM](https://img.shields.io/badge/Innovality-Real%20Estate%20CRM-green?style=for-the-badge)

**Deploy Your CRM in 60 Seconds**

</div>

---

## 🚀 Ultra Quick Deploy

### Method 1: One-Click Deploy to Vercel

After you push this code to GitHub, add this button to your README:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/innovality-real-estate-crm)

Click the button above to deploy instantly!

---

### Method 2: Command Line Deploy (2 minutes)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Done!** Your CRM is live at `https://innovality-crm.vercel.app`

---

## 📋 Post-Deployment Setup

### 1. Set up MongoDB (5 minutes)

1. **Create MongoDB Atlas account:** https://www.mongodb.com/cloud/atlas/register
2. **Create FREE cluster** (M0 tier)
3. **Create database user:**
   - Username: `innovality_admin`
   - Password: Auto-generate and save
4. **Allow network access:** `0.0.0.0/0`
5. **Get connection string:**
   ```
   mongodb+srv://innovality_admin:PASSWORD@cluster0.xxxxx.mongodb.net/innovality-crm
   ```

### 2. Add to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - **Name:** `MONGODB_URI`
   - **Value:** Your MongoDB connection string
3. Redeploy

### 3. Seed Database (Optional)

```bash
export MONGODB_URI="your_connection_string"
npm install
npm run seed
```

---

## 🎯 What You Get

✅ Professional landing page  
✅ Full-featured CRM dashboard  
✅ Lead management system  
✅ Property listings  
✅ Deal pipeline  
✅ Real-time analytics  
✅ RESTful API  
✅ Sample data (after seeding)  

---

## 📖 Documentation

- **Quick Start:** [DEPLOY-NOW.md](DEPLOY-NOW.md)
- **Full Guide:** [INNOVALITY-DEPLOYMENT.md](INNOVALITY-DEPLOYMENT.md)
- **Company Docs:** [README-INNOVALITY.md](README-INNOVALITY.md)

---

## 💰 Cost

**FREE Forever!**
- ✅ Vercel Hobby: Free
- ✅ MongoDB Atlas M0: Free
- **Total: ₹0/month**

---

## 🏢 Innovality IT Pvt. Ltd.

Professional Real Estate CRM Solution

© 2024 Innovality IT Pvt. Ltd. All rights reserved.

---

## 🆘 Need Help?

See [DEPLOY-NOW.md](DEPLOY-NOW.md) for step-by-step commands.
