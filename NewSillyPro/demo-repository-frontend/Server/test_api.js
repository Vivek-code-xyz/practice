import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const timestamp = Date.now();
// Name updated to comply with validation (no numbers)
const userData = {
    name: `Test User Alpha`,
    email: `test${timestamp}@example.com`,
    password: 'Password123!',
};

async function testFlow() {
    console.log('🚀 Starting API Test Flow...\n');

    try {
        // 1. Health Check
        console.log('1️⃣  Testing Health Check...');
        try {
            const health = await axios.get('http://localhost:5000/api/test');
            console.log('   ✅ Health Check Passed:', health.data.message);
        } catch (e) {
            console.log('   ❌ Health Check Failed:', e.message);
            return;
        }

        // 2. Register
        console.log('\n2️⃣  Registering User...');
        try {
            const registerRes = await axios.post(`${API_URL}/auth/register`, userData);
            console.log('   ✅ Registration Successful:', registerRes.data.message);
        } catch (error) {
            console.error('   ❌ Registration Failed:', error.response ? error.response.data : error.message);
            return;
        }

        // 3. Login
        console.log('\n3️⃣  Logging In...');
        let token;
        try {
            const loginRes = await axios.post(`${API_URL}/auth/login`, {
                email: userData.email,
                password: userData.password
            });

            // Handle different response structures
            token = loginRes.data.token ||
                loginRes.data.accessToken ||
                (loginRes.data.data && loginRes.data.data.accessToken);

            if (token) {
                console.log('   ✅ Login Successful');
                console.log('   🔑 Token received');
            } else {
                console.log('   ❌ Login successful but no token found in response');
                console.log(JSON.stringify(loginRes.data, null, 2));
                return;
            }
        } catch (error) {
            console.error('   ❌ Login Failed:', error.response ? error.response.data : error.message);
            return;
        }

        // 4. Protected Route (Me)
        console.log('\n4️⃣  Testing Protected Route (/api/auth/me)...');
        let userRole = 'user';
        try {
            const meRes = await axios.get(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('   ✅ Protected Route Access Successful');
            const user = meRes.data.data || meRes.data.user;
            console.log(`   👤 User: ${user.name} (${user.email})`);
            console.log(`   🛡️  Role: ${user.role}`);
            userRole = user.role;
        } catch (error) {
            console.error('   ❌ Protected Route Failed:', error.response ? error.response.data : error.message);
        }

        // 5. Admin Route
        console.log('\n5️⃣  Testing Admin Route (/api/users)...');
        try {
            const usersRes = await axios.get(`${API_URL}/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('   ✅ Admin Route Access Successful');
            const count = usersRes.data.count ||
                (usersRes.data.data && usersRes.data.data.users ? usersRes.data.data.users.length : 0);
            console.log(`   👥 Users retrieved: ${count}`);
        } catch (error) {
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                if (userRole !== 'admin') {
                    console.log('   ✅ Admin Route Access Denied (Expected for non-admin user)');
                } else {
                    console.log('   ℹ️  Admin Route Failed (Might require specific permissions or path):', error.response.data.message);
                }
            } else {
                console.error('   ❌ Admin Route Error:', error.response ? error.response.data : error.message);
            }
        }

        console.log('\n✨ API Test Completed');

    } catch (error) {
        console.error('\n❌ Unexpected Error:', error.message);
    }
}

testFlow();
