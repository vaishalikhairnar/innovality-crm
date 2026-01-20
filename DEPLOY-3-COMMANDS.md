# 🚀 DEPLOY IN 3 COMMANDS

Copy and paste these 3 commands to deploy your CRM:

```bash
# Command 1: Install Vercel
npm install -g vercel

# Command 2: Login
vercel login

# Command 3: Deploy
vercel --prod
```

**DONE! Your CRM is LIVE!** 🎉

You'll get a URL like: `https://innovality-crm.vercel.app`

---

## 📋 What Happens:

1. **Command 1** - Installs deployment tool (30 seconds)
2. **Command 2** - Opens browser to login (30 seconds)
3. **Command 3** - Deploys your CRM (2 minutes)

**Total Time: 3 minutes**

---

## 🔗 Add Database (Optional - 5 more minutes)

After deployment, add MongoDB:

### Quick Steps:
1. Go to https://mongodb.com/cloud/atlas
2. Sign up FREE
3. Create cluster
4. Get connection string
5. Run:
```bash
vercel env add MONGODB_URI
# Paste your connection string when prompted
vercel --prod
```

**Database connected!**

---

## ✨ Your Live URLs

After deployment:

| Page | URL |
|------|-----|
| **Landing** | https://your-app.vercel.app/landing.html |
| **CRM** | https://your-app.vercel.app/index.html |
| **Demo** | https://your-app.vercel.app/demo.html |
| **API** | https://your-app.vercel.app/api |

---

## 🎯 Even Simpler: Use Auto-Deploy Script

Just run:
```bash
./auto-deploy.sh
```

It does EVERYTHING automatically!

---

## 💡 No Deployment Needed for Demo?

Just open `demo.html` in your browser!
- ✅ Works offline
- ✅ Full features
- ✅ Rich sample data
- ✅ Perfect for customer demos

---

**🏢 Innovality IT Pvt. Ltd.**  
Professional Real Estate CRM

**Choose your path:**
- 🎬 Quick demo → Open `demo.html`
- 🚀 Deploy live → Run 3 commands above
- ⚡ Auto-deploy → Run `./auto-deploy.sh`
