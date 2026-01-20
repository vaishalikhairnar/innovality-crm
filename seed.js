const mongoose = require('mongoose');

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/innovality-crm';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB - Innovality IT Pvt. Ltd.'))
.catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
});

// Schemas (same as in server.js)
const LeadSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    property: String,
    budget: String,
    status: String,
    source: String,
    notes: String,
    createdAt: Date,
    updatedAt: Date,
    lastContact: Date
});

const PropertySchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    location: String,
    address: String,
    city: String,
    state: String,
    propertyType: String,
    bedrooms: Number,
    bathrooms: Number,
    sqft: Number,
    status: String,
    features: [String],
    images: [String],
    createdAt: Date,
    updatedAt: Date
});

const DealSchema = new mongoose.Schema({
    leadId: mongoose.Schema.Types.ObjectId,
    propertyId: mongoose.Schema.Types.ObjectId,
    dealValue: Number,
    status: String,
    probability: Number,
    expectedCloseDate: Date,
    commission: Number,
    notes: String,
    createdAt: Date,
    updatedAt: Date
});

const ActivitySchema = new mongoose.Schema({
    type: String,
    title: String,
    description: String,
    relatedTo: {
        model: String,
        id: mongoose.Schema.Types.ObjectId
    },
    createdAt: Date
});

const Lead = mongoose.model('Lead', LeadSchema);
const Property = mongoose.model('Property', PropertySchema);
const Deal = mongoose.model('Deal', DealSchema);
const Activity = mongoose.model('Activity', ActivitySchema);

// Sample Data
const sampleLeads = [
    {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 234-567-8900',
        status: 'new',
        property: 'Skyline Apartments',
        budget: '$450,000',
        source: 'Website',
        notes: 'Interested in 2BR apartments in downtown area',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastContact: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
        name: 'Michael Chen',
        email: 'mchen@email.com',
        phone: '+1 234-567-8901',
        status: 'contacted',
        property: 'Riverside Villa',
        budget: '$780,000',
        source: 'Referral',
        notes: 'Looking for family home with garden',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
        lastContact: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
        name: 'Emily Davis',
        email: 'emily.d@email.com',
        phone: '+1 234-567-8902',
        status: 'qualified',
        property: 'Downtown Loft',
        budget: '$320,000',
        source: 'Social Media',
        notes: 'First-time buyer, pre-approved for loan',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
        lastContact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
        name: 'James Wilson',
        email: 'jwilson@email.com',
        phone: '+1 234-567-8903',
        status: 'contacted',
        property: 'Garden Heights',
        budget: '$590,000',
        source: 'Walk-in',
        notes: 'Interested in properties with parking',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        updatedAt: new Date(),
        lastContact: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
        name: 'Lisa Anderson',
        email: 'l.anderson@email.com',
        phone: '+1 234-567-8904',
        status: 'new',
        property: 'Oceanview Estate',
        budget: '$1,250,000',
        source: 'Website',
        notes: 'Looking for luxury beachfront property',
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        updatedAt: new Date(),
        lastContact: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
        name: 'Robert Martinez',
        email: 'rmartinez@email.com',
        phone: '+1 234-567-8905',
        status: 'negotiation',
        property: 'Skyline Apartments',
        budget: '$425,000',
        source: 'Referral',
        notes: 'In final negotiation stage',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
        lastContact: new Date(Date.now() - 12 * 60 * 60 * 1000)
    },
    {
        name: 'Jennifer Lee',
        email: 'jlee@email.com',
        phone: '+1 234-567-8906',
        status: 'qualified',
        property: 'Garden Heights',
        budget: '$600,000',
        source: 'Website',
        notes: 'Very interested, scheduled viewing',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
        lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
];

const sampleProperties = [
    {
        title: 'Skyline Apartments',
        description: 'Modern luxury apartments with stunning city views',
        price: 450000,
        location: 'Downtown',
        address: '123 Main Street',
        city: 'Metro City',
        state: 'CA',
        propertyType: 'apartment',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        status: 'available',
        features: ['Parking', 'Gym', 'Pool', 'Balcony', 'Smart Home'],
        images: [],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Riverside Villa',
        description: 'Spacious family home with beautiful garden',
        price: 780000,
        location: 'Riverside',
        address: '456 River Road',
        city: 'Metro City',
        state: 'CA',
        propertyType: 'villa',
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2400,
        status: 'available',
        features: ['Garden', 'Garage', 'Fireplace', 'River View'],
        images: [],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Downtown Loft',
        description: 'Chic urban loft in the heart of the city',
        price: 320000,
        location: 'City Center',
        address: '789 Center Ave',
        city: 'Metro City',
        state: 'CA',
        propertyType: 'apartment',
        bedrooms: 1,
        bathrooms: 1,
        sqft: 850,
        status: 'sold',
        features: ['High Ceilings', 'Open Plan', 'Renovated'],
        images: [],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Garden Heights',
        description: 'Comfortable suburban home with private garden',
        price: 590000,
        location: 'Suburb',
        address: '321 Garden Lane',
        city: 'Metro City',
        state: 'CA',
        propertyType: 'house',
        bedrooms: 3,
        bathrooms: 2.5,
        sqft: 1800,
        status: 'available',
        features: ['Garden', 'Patio', 'Updated Kitchen', 'Garage'],
        images: [],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Oceanview Estate',
        description: 'Luxury beachfront property with panoramic ocean views',
        price: 1250000,
        location: 'Beachfront',
        address: '555 Ocean Drive',
        city: 'Coastal City',
        state: 'CA',
        propertyType: 'villa',
        bedrooms: 5,
        bathrooms: 4,
        sqft: 3500,
        status: 'available',
        features: ['Ocean View', 'Private Beach', 'Pool', 'Wine Cellar', 'Home Theater'],
        images: [],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Mountain Retreat',
        description: 'Peaceful mountain cabin with scenic views',
        price: 395000,
        location: 'Mountain View',
        address: '888 Pine Trail',
        city: 'Mountain Town',
        state: 'CA',
        propertyType: 'house',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1400,
        status: 'available',
        features: ['Fireplace', 'Deck', 'Mountain View', 'Ski Access'],
        images: [],
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const sampleActivities = [
    {
        type: 'call',
        title: 'Called Sarah Johnson',
        description: 'Discussed property viewing schedule for Skyline Apartments',
        createdAt: new Date(Date.now() - 10 * 60 * 1000)
    },
    {
        type: 'email',
        title: 'Email sent to Michael Chen',
        description: 'Sent property brochure and pricing details for Riverside Villa',
        createdAt: new Date(Date.now() - 60 * 60 * 1000)
    },
    {
        type: 'meeting',
        title: 'Meeting scheduled with Emily Davis',
        description: 'Site visit for Downtown Loft scheduled for tomorrow',
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
        type: 'deal',
        title: 'Deal progressing with Robert Martinez',
        description: 'Final negotiations for Skyline Apartments unit',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
        type: 'note',
        title: 'Follow-up required for James Wilson',
        description: 'Schedule property viewing for Garden Heights',
        createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000)
    }
];

// Seed function
async function seedDatabase() {
    try {
        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await Lead.deleteMany({});
        await Property.deleteMany({});
        await Deal.deleteMany({});
        await Activity.deleteMany({});
        
        // Insert sample data
        console.log('📝 Inserting sample leads...');
        const leads = await Lead.insertMany(sampleLeads);
        console.log(`✅ Inserted ${leads.length} leads`);
        
        console.log('🏠 Inserting sample properties...');
        const properties = await Property.insertMany(sampleProperties);
        console.log(`✅ Inserted ${properties.length} properties`);
        
        console.log('💼 Creating sample deals...');
        const deals = [];
        
        // Create a few sample deals
        if (leads.length > 0 && properties.length > 0) {
            deals.push(await Deal.create({
                leadId: leads[0]._id,
                propertyId: properties[0]._id,
                dealValue: 450000,
                status: 'negotiation',
                probability: 75,
                expectedCloseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                commission: 13500,
                notes: 'Strong interest, moving to contract soon',
                createdAt: new Date(),
                updatedAt: new Date()
            }));
            
            deals.push(await Deal.create({
                leadId: leads[2]._id,
                propertyId: properties[2]._id,
                dealValue: 320000,
                status: 'closed',
                probability: 100,
                expectedCloseDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                actualCloseDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                commission: 9600,
                notes: 'Successfully closed',
                createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                updatedAt: new Date()
            }));
        }
        console.log(`✅ Created ${deals.length} deals`);
        
        console.log('📋 Inserting sample activities...');
        const activities = await Activity.insertMany(sampleActivities);
        console.log(`✅ Inserted ${activities.length} activities`);
        
        console.log('\n🎉 Database seeded successfully!');
        console.log('📊 Summary:');
        console.log(`   - Leads: ${leads.length}`);
        console.log(`   - Properties: ${properties.length}`);
        console.log(`   - Deals: ${deals.length}`);
        console.log(`   - Activities: ${activities.length}`);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedDatabase();
