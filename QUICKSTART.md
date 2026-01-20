# 🚀 Quick Start Guide - PropertyFlow CRM

Get your real estate CRM running in 5 minutes!

## ⚡ Super Quick Start (Local Demo)

1. **Open the frontend**
   - Simply open `index.html` in your web browser
   - The app will work with mock data (no backend required)
   - Perfect for testing the UI and features

## 🔧 Full Setup with Backend (10 minutes)

### Prerequisites
- Node.js 16+ installed
- MongoDB installed OR MongoDB Atlas account

### Steps

1. **Navigate to project folder**
   ```bash
   cd realestate-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB** (skip if using MongoDB Atlas)
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```

4. **Create .env file**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/propertyflow-crm
   PORT=3000
   ```

5. **Seed database** (adds sample data)
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   npm start
   ```

7. **Open the app**
   - Open `index.html` in your browser
   - Backend API: http://localhost:3000/api

## 🌐 Deploy to Vercel (15 minutes)

### Quick Deploy

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set MongoDB Connection**
   - Set up MongoDB Atlas (see DEPLOYMENT.md)
   - Add environment variable in Vercel dashboard:
     - Name: `MONGODB_URI`
     - Value: Your MongoDB Atlas connection string

5. **Done!** 🎉
   - Your CRM is live at: `https://your-app.vercel.app`

## 📖 Detailed Instructions

For complete deployment instructions, see:
- **DEPLOYMENT.md** - Step-by-step Vercel deployment
- **README.md** - Full documentation

## 🎯 What You Get

✅ Complete lead management system
✅ Property listing management
✅ Deal pipeline tracking
✅ Analytics dashboard
✅ Activity feed
✅ RESTful API
✅ Responsive design
✅ Modern UI

## 📞 Test the API

```bash
# Health check
curl http://localhost:3000/api/health

# Get all leads
curl http://localhost:3000/api/leads

# Get statistics
curl http://localhost:3000/api/stats
```

## 🐛 Troubleshooting

**Can't connect to MongoDB?**
- Make sure MongoDB is running
- Check your MONGODB_URI in .env

**Port already in use?**
- Change PORT in .env to 3001 or another port

**No data showing?**
- Run: `npm run seed`

## 📚 Learn More

- Frontend: `index.html` - Single-page React app
- Backend: `server.js` - Express API with MongoDB
- Database: MongoDB - NoSQL database
- Deploy: Vercel - Serverless hosting

---

Need help? Check README.md or DEPLOYMENT.md for detailed guides!
