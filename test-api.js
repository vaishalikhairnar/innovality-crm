// API Testing Script
// Run with: node test-api.js

const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
    console.log('🧪 Testing PropertyFlow CRM API\n');
    
    try {
        // Test 1: Health Check
        console.log('1️⃣ Testing health endpoint...');
        const healthRes = await fetch(`${API_BASE}/health`);
        const health = await healthRes.json();
        console.log('✅ Health check:', health);
        console.log('');
        
        // Test 2: Get Stats
        console.log('2️⃣ Testing stats endpoint...');
        const statsRes = await fetch(`${API_BASE}/stats`);
        const stats = await statsRes.json();
        console.log('✅ Stats:', JSON.stringify(stats, null, 2));
        console.log('');
        
        // Test 3: Get Leads
        console.log('3️⃣ Testing leads endpoint...');
        const leadsRes = await fetch(`${API_BASE}/leads`);
        const leads = await leadsRes.json();
        console.log(`✅ Found ${leads.count} leads`);
        if (leads.data && leads.data.length > 0) {
            console.log('   Sample lead:', leads.data[0].name);
        }
        console.log('');
        
        // Test 4: Get Properties
        console.log('4️⃣ Testing properties endpoint...');
        const propsRes = await fetch(`${API_BASE}/properties`);
        const props = await propsRes.json();
        console.log(`✅ Found ${props.count} properties`);
        if (props.data && props.data.length > 0) {
            console.log('   Sample property:', props.data[0].title);
        }
        console.log('');
        
        // Test 5: Create Lead
        console.log('5️⃣ Testing create lead...');
        const newLead = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '+1 999-999-9999',
            property: 'Test Property',
            budget: '$300,000',
            status: 'new'
        };
        const createRes = await fetch(`${API_BASE}/leads`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newLead)
        });
        const created = await createRes.json();
        console.log('✅ Created lead:', created.data.name);
        console.log('');
        
        // Test 6: Get Activities
        console.log('6️⃣ Testing activities endpoint...');
        const activitiesRes = await fetch(`${API_BASE}/activities`);
        const activities = await activitiesRes.json();
        console.log(`✅ Found ${activities.count} activities`);
        console.log('');
        
        console.log('🎉 All tests passed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Make sure the server is running: npm start');
    }
}

// Run tests
testAPI();
