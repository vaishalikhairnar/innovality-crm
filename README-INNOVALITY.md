# Innovality Real Estate CRM 🏢

<div align="center">

![Innovality CRM](https://img.shields.io/badge/Innovality-Real%20Estate%20CRM-green?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

**Professional Real Estate CRM Platform**  
*by Innovality IT Pvt. Ltd.*

[Live Demo](https://innovality-crm.vercel.app) | [Documentation](#documentation) | [Support](#support)

</div>

---

## 🏢 About Innovality IT Pvt. Ltd.

Innovality IT Pvt. Ltd. is a leading technology solutions provider specializing in custom software development, CRM systems, and digital transformation services. Our mission is to empower businesses with innovative technology solutions that drive growth and efficiency.

This Real Estate CRM is a flagship product demonstrating our capability to build enterprise-grade applications with modern web technologies.

---

## 🌟 Product Overview

**Innovality Real Estate CRM** is a comprehensive customer relationship management platform specifically designed for real estate businesses. It provides a complete solution for managing leads, properties, deals, and client relationships in one centralized system.

### Key Capabilities

🎯 **Lead Management** - Capture, track, and nurture property leads through your sales pipeline  
🏠 **Property Listings** - Manage your entire real estate inventory with rich details  
💼 **Deal Pipeline** - Monitor negotiations and close deals faster  
📊 **Analytics Dashboard** - Get real-time insights into your business performance  
📱 **Responsive Design** - Access from any device, anywhere, anytime  
⚡ **Cloud-Based** - Serverless architecture for maximum scalability

---

## ✨ Features

### 1. Lead Management System
- **Complete Lead Tracking** - Store contact information, preferences, and communication history
- **Status Pipeline** - Visual pipeline from New → Contacted → Qualified → Negotiation → Closed
- **Smart Filtering** - Quick search and filter by status, property interest, or budget
- **Activity Logging** - Track all interactions with leads automatically

### 2. Property Management
- **Rich Property Listings** - Store comprehensive property details
- **Visual Property Cards** - Beautiful cards with gradient backgrounds
- **Multi-Status Tracking** - Available, Pending, Sold, Rented
- **Location Organization** - Categorize by neighborhoods and cities
- **Price Management** - Track pricing history and adjustments

### 3. Deal Pipeline
- **Deal Stages** - Initial → Negotiation → Contract → Closed
- **Revenue Forecasting** - Calculate expected revenue and commissions
- **Probability Tracking** - Assess likelihood of deal closure
- **Timeline Management** - Set and track expected close dates

### 4. Analytics & Reporting
- **Real-time Dashboard** - Live statistics and key metrics
- **Performance Metrics** - Track conversions, revenue, and growth
- **Trend Analysis** - Month-over-month comparisons
- **Activity Feed** - Recent team activities and updates

### 5. Modern User Interface
- **Professional Design** - Clean, modern aesthetic with custom fonts
- **Smooth Animations** - Delightful hover effects and transitions
- **Color-Coded System** - Status badges and visual hierarchy
- **Search Functionality** - Quick search across all data

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **Vanilla CSS** - Custom styling with CSS variables for theming
- **Google Fonts** - Manrope (body) and Clash Display (headings)
- **Responsive Design** - Mobile-first approach with flexbox/grid

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling

### Infrastructure
- **Vercel** - Serverless deployment platform
- **MongoDB Atlas** - Cloud-hosted database
- **Git** - Version control system
- **GitHub** - Code repository and collaboration

### Development Tools
- **npm** - Package manager
- **Nodemon** - Development server with hot reload
- **ESLint** - Code quality and consistency

---

## 🚀 Quick Start

### For Live Demo
Simply visit: **[https://innovality-crm.vercel.app](https://innovality-crm.vercel.app)**

### For Local Development

#### Prerequisites
- Node.js 16.x or higher
- MongoDB (local or Atlas account)
- Git
- npm or yarn

#### Installation

1. **Clone the repository**
```bash
git clone https://github.com/innovality-it/innovality-real-estate-crm.git
cd innovality-real-estate-crm
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/innovality-crm
PORT=3000
```

4. **Seed database** (optional - adds sample data)
```bash
npm run seed
```

5. **Start development server**
```bash
npm run dev
```

6. **Open the application**
- Frontend: Open `index.html` in your browser
- API: http://localhost:3000/api
- Health Check: http://localhost:3000/api/health

---

## 📦 Deployment

### Deploy to Vercel (Production)

Complete step-by-step guide: **[INNOVALITY-DEPLOYMENT.md](INNOVALITY-DEPLOYMENT.md)**

**Quick Deploy:**

1. Push to GitHub
2. Import to Vercel
3. Add `MONGODB_URI` environment variable
4. Deploy!

Your CRM will be live at: `https://your-app.vercel.app`

---

## 📚 API Documentation

### Base URL
```
Production: https://innovality-crm.vercel.app/api
Local: http://localhost:3000/api
```

### Endpoints

#### Health Check
```http
GET /api/health
```

Response:
```json
{
  "status": "OK",
  "message": "Innovality Real Estate CRM API is running",
  "company": "Innovality IT Pvt. Ltd."
}
```

#### Leads Management

**Get All Leads**
```http
GET /api/leads?status=new&limit=50
```

**Get Single Lead**
```http
GET /api/leads/:id
```

**Create Lead**
```http
POST /api/leads
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "property": "Skyline Apartments",
  "budget": "₹5,00,000",
  "status": "new"
}
```

**Update Lead**
```http
PUT /api/leads/:id
Content-Type: application/json

{
  "status": "qualified",
  "notes": "Ready for property viewing"
}
```

**Delete Lead**
```http
DELETE /api/leads/:id
```

#### Properties Management

**Get All Properties**
```http
GET /api/properties?status=available&minPrice=500000&maxPrice=1000000
```

**Create Property**
```http
POST /api/properties
Content-Type: application/json

{
  "title": "Luxury Villa",
  "price": 7500000,
  "location": "Mumbai",
  "bedrooms": 4,
  "bathrooms": 3,
  "sqft": 2500,
  "status": "available"
}
```

#### Deals Management

**Get All Deals**
```http
GET /api/deals?status=negotiation
```

**Create Deal**
```http
POST /api/deals
Content-Type: application/json

{
  "leadId": "lead_id_here",
  "propertyId": "property_id_here",
  "dealValue": 7500000,
  "status": "initial",
  "probability": 60
}
```

#### Analytics

**Get Dashboard Statistics**
```http
GET /api/stats
```

Response:
```json
{
  "success": true,
  "data": {
    "leads": {
      "total": 127,
      "new": 34,
      "qualified": 28
    },
    "properties": {
      "total": 45,
      "available": 32,
      "sold": 8
    },
    "deals": {
      "total": 56,
      "active": 23,
      "closed": 18
    },
    "revenue": 42500000
  }
}
```

For complete API documentation, see: [API.md](API.md)

---

## 🗂️ Project Structure

```
innovality-real-estate-crm/
├── index.html              # Main CRM dashboard (React SPA)
├── landing.html            # Professional landing page
├── server.js               # Express.js API server
├── seed.js                 # Database seeding script
├── package.json            # Project dependencies
├── vercel.json             # Vercel deployment config
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── README.md               # This file
├── INNOVALITY-DEPLOYMENT.md # Deployment guide
└── QUICKSTART.md           # Quick start guide
```

---

## 🎨 Customization

### Changing Brand Colors

Edit CSS variables in `index.html`:

```css
:root {
    --primary: #0F172A;        /* Dark blue-gray */
    --accent: #10B981;         /* Emerald green */
    --warning: #F59E0B;        /* Amber */
    --danger: #EF4444;         /* Red */
    --info: #3B82F6;           /* Blue */
}
```

### Adding New Features

1. Update database schema in `server.js`
2. Create API endpoints
3. Add frontend components in `index.html`
4. Update documentation

---

## 🔒 Security

### Best Practices Implemented
- ✅ Environment variables for sensitive data
- ✅ MongoDB connection string encryption
- ✅ CORS configuration
- ✅ Input validation
- ✅ Error handling

### Recommended Enhancements
- [ ] Add user authentication (JWT)
- [ ] Implement role-based access control
- [ ] Add API rate limiting
- [ ] Enable CSRF protection
- [ ] Add request logging
- [ ] Implement data encryption at rest

---

## 📊 Database Schema

### Leads Collection
```javascript
{
  name: String,           // Lead name
  email: String,          // Contact email
  phone: String,          // Contact phone
  property: String,       // Property interest
  budget: String,         // Budget range
  status: String,         // Pipeline status
  source: String,         // Lead source
  notes: String,          // Additional notes
  createdAt: Date,        // Creation timestamp
  updatedAt: Date,        // Last update
  lastContact: Date       // Last contact date
}
```

### Properties Collection
```javascript
{
  title: String,          // Property title
  description: String,    // Full description
  price: Number,          // Price in ₹
  location: String,       // City/area
  address: String,        // Full address
  propertyType: String,   // Type (apartment/house/villa)
  bedrooms: Number,       // Number of bedrooms
  bathrooms: Number,      // Number of bathrooms
  sqft: Number,          // Square footage
  status: String,         // Availability status
  features: [String],     // Feature list
  images: [String],       // Image URLs
  createdAt: Date,
  updatedAt: Date
}
```

### Deals Collection
```javascript
{
  leadId: ObjectId,       // Reference to Lead
  propertyId: ObjectId,   // Reference to Property
  dealValue: Number,      // Deal amount
  status: String,         // Deal stage
  probability: Number,    // Close probability (0-100)
  expectedCloseDate: Date,
  actualCloseDate: Date,
  commission: Number,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing

### Run Tests Locally

```bash
# Test API endpoints
node test-api.js

# Manual testing
npm start
# Then open index.html in browser
```

### Test Production

```bash
# Health check
curl https://innovality-crm.vercel.app/api/health

# Get leads
curl https://innovality-crm.vercel.app/api/leads

# Get statistics
curl https://innovality-crm.vercel.app/api/stats
```

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Verify `MONGODB_URI` in environment variables
- Check Network Access in MongoDB Atlas
- Ensure database user has correct permissions

**API Returns 404**
- Check `vercel.json` configuration
- Verify API routes in `server.js`
- Redeploy the application

**No Data Showing**
- Run seed script: `npm run seed`
- Check MongoDB Atlas for data
- Verify API connection in browser console

**Port Already in Use**
- Change `PORT` in `.env` file
- Kill process: `lsof -ti:3000 | xargs kill`

---

## 📈 Roadmap

### Version 1.1 (Q1 2025)
- [ ] User authentication system
- [ ] Email notification integration
- [ ] Document upload functionality
- [ ] Advanced search filters
- [ ] Export to Excel/PDF

### Version 1.2 (Q2 2025)
- [ ] Calendar integration
- [ ] Task management
- [ ] SMS notifications
- [ ] Mobile app (React Native)
- [ ] Multi-language support

### Version 2.0 (Q3 2025)
- [ ] AI-powered lead scoring
- [ ] Automated email campaigns
- [ ] Integration with property portals
- [ ] Advanced analytics and reporting
- [ ] Team collaboration features

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💼 Support

### For Technical Support
- **Email:** tech@innovality.com
- **Phone:** +91 XXXXX XXXXX
- **Website:** www.innovality.com

### For Sales Inquiries
- **Email:** sales@innovality.com
- **Phone:** +91 XXXXX XXXXX

### Documentation
- [Quick Start Guide](QUICKSTART.md)
- [Deployment Guide](INNOVALITY-DEPLOYMENT.md)
- [API Documentation](API.md)

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by industry-leading CRM platforms
- Designed specifically for real estate professionals
- Developed by the talented team at Innovality IT Pvt. Ltd.

---

## 📱 Connect With Us

- **Website:** [www.innovality.com](https://www.innovality.com)
- **LinkedIn:** [Innovality IT](https://www.linkedin.com/company/innovality-it)
- **Twitter:** [@InovalityIT](https://twitter.com/InovalityIT)
- **GitHub:** [Innovality IT](https://github.com/innovality-it)

---

<div align="center">

**Innovality Real Estate CRM**  
*Streamline Your Real Estate Business*

© 2024 Innovality IT Pvt. Ltd. All rights reserved.

Made with ❤️ in India

</div>
