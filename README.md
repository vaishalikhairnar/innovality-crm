# PropertyFlow CRM 🏠

A comprehensive Real Estate CRM platform for managing leads, properties, deals, and client relationships. Built with modern web technologies and ready for deployment on Vercel.

![PropertyFlow CRM](https://img.shields.io/badge/Real%20Estate-CRM-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

### Lead Management
- 📊 **Complete Lead Tracking** - Capture and manage all your property leads
- 🔄 **Status Pipeline** - Track leads through New → Contacted → Qualified → Negotiation → Closed
- 📧 **Contact Management** - Store emails, phones, and communication history
- 🏷️ **Lead Segmentation** - Filter and organize leads by status, property interest, and value

### Property Listings
- 🏠 **Property Database** - Manage your entire property inventory
- 💰 **Pricing & Details** - Track prices, bedrooms, bathrooms, square footage
- 📍 **Location Management** - Organize properties by location and type
- ✅ **Status Tracking** - Available, Pending, Sold, Rented statuses
- 🖼️ **Visual Cards** - Beautiful property cards with gradient backgrounds

### Deal Pipeline
- 💼 **Deal Tracking** - Monitor all active deals and negotiations
- 📈 **Probability Scoring** - Track likelihood of deal closure
- 💵 **Revenue Forecasting** - Calculate expected revenue and commissions
- 📅 **Timeline Management** - Set expected and actual close dates

### Analytics Dashboard
- 📊 **Real-time Statistics** - Total leads, active deals, revenue metrics
- 📈 **Trend Analysis** - Month-over-month growth tracking
- 🎯 **Performance Metrics** - Conversion rates and sales analytics
- 📋 **Activity Feed** - Recent activities and team actions

### Modern UI/UX
- 🎨 **Professional Design** - Clean, modern interface with Manrope & Clash Display fonts
- 🌈 **Visual Hierarchy** - Color-coded status badges and stat cards
- ⚡ **Smooth Animations** - Hover effects and transitions
- 📱 **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- 🔍 **Search & Filter** - Quick search across all entities

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vanilla CSS** - Custom styling with CSS variables
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Deployment
- **Vercel** - Serverless deployment platform
- **MongoDB Atlas** - Cloud database (recommended for production)

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- MongoDB (local or Atlas)
- npm or yarn

### Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd realestate-crm
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB connection string:
```env
MONGODB_URI=mongodb://localhost:27017/propertyflow-crm
PORT=3000
```

4. **Start MongoDB** (if using local MongoDB)
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
```

5. **Seed the database** (optional - adds sample data)
```bash
npm run seed
```

6. **Start the development server**
```bash
npm run dev
```

7. **Open the application**
- Frontend: Open `index.html` in your browser
- Backend API: http://localhost:3000/api
- API Health Check: http://localhost:3000/api/health

## 📦 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

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

Follow the prompts to configure your deployment.

### Option 2: Deploy via Vercel Dashboard

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Import on Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Configure environment variables

3. **Set Environment Variables**
In Vercel Dashboard → Project Settings → Environment Variables, add:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/propertyflow-crm
```

4. **Deploy**
Click "Deploy" and wait for the build to complete.

### Setting up MongoDB Atlas (Recommended for Production)

1. **Create MongoDB Atlas Account**
- Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Sign up for a free account

2. **Create a Cluster**
- Choose the free tier (M0)
- Select your preferred region
- Create cluster

3. **Create Database User**
- Go to Database Access
- Add a new database user with password

4. **Whitelist IP Addresses**
- Go to Network Access
- Add IP: `0.0.0.0/0` (allow all - for Vercel serverless)

5. **Get Connection String**
- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy the connection string
- Replace `<password>` with your database user password

6. **Update Environment Variable**
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/propertyflow-crm?retryWrites=true&w=majority
```

7. **Seed Production Database** (optional)
```bash
MONGODB_URI="your-atlas-connection-string" npm run seed
```

## 📚 API Documentation

### Base URL
```
Local: http://localhost:3000/api
Production: https://your-app.vercel.app/api
```

### Endpoints

#### Leads
- `GET /api/leads` - Get all leads
- `GET /api/leads/:id` - Get single lead
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

#### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

#### Deals
- `GET /api/deals` - Get all deals
- `POST /api/deals` - Create new deal
- `PUT /api/deals/:id` - Update deal

#### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create new activity

#### Stats
- `GET /api/stats` - Get dashboard statistics

### Example Requests

**Create a Lead**
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 234-567-8900",
    "property": "Skyline Apartments",
    "budget": "$500,000",
    "status": "new"
  }'
```

**Get All Properties**
```bash
curl http://localhost:3000/api/properties
```

**Update Property Status**
```bash
curl -X PUT http://localhost:3000/api/properties/12345 \
  -H "Content-Type: application/json" \
  -d '{"status": "sold"}'
```

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `index.html`:
```css
:root {
    --primary: #0F172A;
    --accent: #10B981;
    --warning: #F59E0B;
    /* ... etc */
}
```

### Adding New Features
1. Update the schema in `server.js`
2. Create new API endpoints
3. Add frontend components in `index.html`

## 📁 Project Structure

```
realestate-crm/
├── index.html          # Frontend application (React)
├── server.js           # Backend API (Express)
├── seed.js            # Database seeding script
├── package.json       # Dependencies and scripts
├── vercel.json        # Vercel deployment config
├── .env.example       # Environment variables template
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🔒 Security Notes

- Never commit `.env` file to version control
- Use environment variables for sensitive data
- Implement authentication for production use
- Add rate limiting to API endpoints
- Validate and sanitize all user inputs
- Use HTTPS in production

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check network access rules in MongoDB Atlas
- Verify username and password in connection string

### Vercel Deployment Issues
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify `vercel.json` configuration

### API Not Responding
- Check if server is running: `curl http://localhost:3000/api/health`
- Verify port is not in use
- Check console for error messages

## 📝 Future Enhancements

- [ ] User authentication and authorization
- [ ] Email notifications and reminders
- [ ] Document management and file uploads
- [ ] Advanced reporting and analytics
- [ ] Calendar integration
- [ ] Task management
- [ ] SMS notifications
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Dark mode

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 💬 Support

For support, email support@propertyflow.com or open an issue in the repository.

## 🎉 Acknowledgments

- Built with modern web technologies
- Inspired by industry-leading CRM platforms
- Designed for real estate professionals

---

**PropertyFlow CRM** - Streamline Your Real Estate Business 🚀
