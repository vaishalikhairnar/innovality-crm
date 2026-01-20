const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/innovality-crm';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB - Innovality IT Pvt. Ltd.'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Schemas
const LeadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    property: String,
    budget: String,
    status: { 
        type: String, 
        enum: ['new', 'contacted', 'qualified', 'negotiation', 'closed', 'lost'],
        default: 'new'
    },
    source: String,
    assignedTo: String,
    notes: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastContact: { type: Date, default: Date.now }
});

const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    location: { type: String, required: true },
    address: String,
    city: String,
    state: String,
    zipCode: String,
    propertyType: { 
        type: String, 
        enum: ['apartment', 'house', 'villa', 'condo', 'townhouse', 'land'],
        default: 'apartment'
    },
    bedrooms: Number,
    bathrooms: Number,
    sqft: Number,
    yearBuilt: Number,
    status: {
        type: String,
        enum: ['available', 'pending', 'sold', 'rented'],
        default: 'available'
    },
    features: [String],
    images: [String],
    virtualTour: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const DealSchema = new mongoose.Schema({
    leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    dealValue: { type: Number, required: true },
    status: {
        type: String,
        enum: ['initial', 'negotiation', 'contract', 'closed', 'lost'],
        default: 'initial'
    },
    probability: { type: Number, min: 0, max: 100, default: 50 },
    expectedCloseDate: Date,
    actualCloseDate: Date,
    commission: Number,
    notes: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const ActivitySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['call', 'email', 'meeting', 'note', 'task', 'deal'],
        required: true
    },
    title: { type: String, required: true },
    description: String,
    relatedTo: {
        model: { type: String, enum: ['Lead', 'Property', 'Deal'] },
        id: mongoose.Schema.Types.ObjectId
    },
    performedBy: String,
    createdAt: { type: Date, default: Date.now }
});

// Models
const Lead = mongoose.model('Lead', LeadSchema);
const Property = mongoose.model('Property', PropertySchema);
const Deal = mongoose.model('Deal', DealSchema);
const Activity = mongoose.model('Activity', ActivitySchema);

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Innovality Real Estate CRM API is running', company: 'Innovality IT Pvt. Ltd.' });
});

// ========== LEADS ENDPOINTS ==========

// Get all leads
app.get('/api/leads', async (req, res) => {
    try {
        const { status, search, limit = 100 } = req.query;
        let query = {};
        
        if (status) query.status = status;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }
        
        const leads = await Lead.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));
        
        res.json({ success: true, data: leads, count: leads.length });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get single lead
app.get('/api/leads/:id', async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ success: false, error: 'Lead not found' });
        }
        res.json({ success: true, data: lead });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create lead
app.post('/api/leads', async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        
        // Create activity
        await Activity.create({
            type: 'note',
            title: `New lead created: ${lead.name}`,
            description: `Lead added to the system`,
            relatedTo: { model: 'Lead', id: lead._id }
        });
        
        res.status(201).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Update lead
app.put('/api/leads/:id', async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        
        if (!lead) {
            return res.status(404).json({ success: false, error: 'Lead not found' });
        }
        
        res.json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Delete lead
app.delete('/api/leads/:id', async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        if (!lead) {
            return res.status(404).json({ success: false, error: 'Lead not found' });
        }
        res.json({ success: true, message: 'Lead deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ========== PROPERTIES ENDPOINTS ==========

// Get all properties
app.get('/api/properties', async (req, res) => {
    try {
        const { status, minPrice, maxPrice, bedrooms, location, limit = 100 } = req.query;
        let query = {};
        
        if (status) query.status = status;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseInt(minPrice);
            if (maxPrice) query.price.$lte = parseInt(maxPrice);
        }
        if (bedrooms) query.bedrooms = parseInt(bedrooms);
        if (location) query.location = { $regex: location, $options: 'i' };
        
        const properties = await Property.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));
        
        res.json({ success: true, data: properties, count: properties.length });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get single property
app.get('/api/properties/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ success: false, error: 'Property not found' });
        }
        res.json({ success: true, data: property });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create property
app.post('/api/properties', async (req, res) => {
    try {
        const property = new Property(req.body);
        await property.save();
        
        // Create activity
        await Activity.create({
            type: 'note',
            title: `New property listed: ${property.title}`,
            description: `Property added at ${property.location}`,
            relatedTo: { model: 'Property', id: property._id }
        });
        
        res.status(201).json({ success: true, data: property });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Update property
app.put('/api/properties/:id', async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        
        if (!property) {
            return res.status(404).json({ success: false, error: 'Property not found' });
        }
        
        res.json({ success: true, data: property });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Delete property
app.delete('/api/properties/:id', async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({ success: false, error: 'Property not found' });
        }
        res.json({ success: true, message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ========== DEALS ENDPOINTS ==========

// Get all deals
app.get('/api/deals', async (req, res) => {
    try {
        const { status, limit = 100 } = req.query;
        let query = {};
        
        if (status) query.status = status;
        
        const deals = await Deal.find(query)
            .populate('leadId')
            .populate('propertyId')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));
        
        res.json({ success: true, data: deals, count: deals.length });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create deal
app.post('/api/deals', async (req, res) => {
    try {
        const deal = new Deal(req.body);
        await deal.save();
        
        // Create activity
        await Activity.create({
            type: 'deal',
            title: `New deal created`,
            description: `Deal value: $${deal.dealValue}`,
            relatedTo: { model: 'Deal', id: deal._id }
        });
        
        res.status(201).json({ success: true, data: deal });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Update deal
app.put('/api/deals/:id', async (req, res) => {
    try {
        const deal = await Deal.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        
        if (!deal) {
            return res.status(404).json({ success: false, error: 'Deal not found' });
        }
        
        res.json({ success: true, data: deal });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// ========== ACTIVITIES ENDPOINTS ==========

// Get all activities
app.get('/api/activities', async (req, res) => {
    try {
        const { type, limit = 50 } = req.query;
        let query = {};
        
        if (type) query.type = type;
        
        const activities = await Activity.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));
        
        res.json({ success: true, data: activities, count: activities.length });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create activity
app.post('/api/activities', async (req, res) => {
    try {
        const activity = new Activity(req.body);
        await activity.save();
        res.status(201).json({ success: true, data: activity });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// ========== ANALYTICS/STATS ENDPOINTS ==========

app.get('/api/stats', async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments();
        const newLeads = await Lead.countDocuments({ status: 'new' });
        const qualifiedLeads = await Lead.countDocuments({ status: 'qualified' });
        
        const totalProperties = await Property.countDocuments();
        const availableProperties = await Property.countDocuments({ status: 'available' });
        const soldProperties = await Property.countDocuments({ status: 'sold' });
        
        const totalDeals = await Deal.countDocuments();
        const activeDeals = await Deal.countDocuments({ 
            status: { $in: ['initial', 'negotiation', 'contract'] }
        });
        const closedDeals = await Deal.countDocuments({ status: 'closed' });
        
        // Calculate revenue
        const closedDealsData = await Deal.find({ status: 'closed' });
        const revenue = closedDealsData.reduce((sum, deal) => sum + (deal.dealValue || 0), 0);
        
        // Get recent activities
        const recentActivities = await Activity.find()
            .sort({ createdAt: -1 })
            .limit(10);
        
        res.json({
            success: true,
            data: {
                leads: {
                    total: totalLeads,
                    new: newLeads,
                    qualified: qualifiedLeads
                },
                properties: {
                    total: totalProperties,
                    available: availableProperties,
                    sold: soldProperties
                },
                deals: {
                    total: totalDeals,
                    active: activeDeals,
                    closed: closedDeals
                },
                revenue: revenue,
                recentActivities: recentActivities
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        error: 'Something went wrong!',
        message: err.message 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Innovality Real Estate CRM API running on port ${PORT}`);
    console.log(`📍 API URL: http://localhost:${PORT}/api`);
    console.log(`🏢 Innovality IT Pvt. Ltd.`);
});

module.exports = app;
