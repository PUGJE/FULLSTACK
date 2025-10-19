const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testBankingAPI() {
    console.log('🧪 Testing Banking API with JWT Authentication\n');

    try {
        // Step 1: Login to get token
        console.log('1️⃣ Logging in...');
        const loginResponse = await axios.post(`${BASE_URL}/login`, {
            username: 'user1',
            password: 'password123'
        });
        
        const token = loginResponse.data.token;
        console.log('✅ Login successful!');
        console.log(`Token: ${token.substring(0, 50)}...\n`);

        // Set up headers for authenticated requests
        const authHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        // Step 2: Check balance
        console.log('2️⃣ Checking account balance...');
        const balanceResponse = await axios.get(`${BASE_URL}/balance`, {
            headers: authHeaders
        });
        console.log(`✅ Current balance: $${balanceResponse.data.balance}\n`);

        // Step 3: Deposit money
        console.log('3️⃣ Depositing $250...');
        const depositResponse = await axios.post(`${BASE_URL}/deposit`, {
            amount: 250
        }, {
            headers: authHeaders
        });
        console.log(`✅ ${depositResponse.data.message}`);
        console.log(`New balance: $${depositResponse.data.newBalance}\n`);

        // Step 4: Withdraw money
        console.log('4️⃣ Withdrawing $150...');
        const withdrawResponse = await axios.post(`${BASE_URL}/withdraw`, {
            amount: 150
        }, {
            headers: authHeaders
        });
        console.log(`✅ ${withdrawResponse.data.message}`);
        console.log(`New balance: $${withdrawResponse.data.newBalance}\n`);

        // Step 5: Test insufficient balance
        console.log('5️⃣ Testing insufficient balance (trying to withdraw $2000)...');
        try {
            await axios.post(`${BASE_URL}/withdraw`, {
                amount: 2000
            }, {
                headers: authHeaders
            });
        } catch (error) {
            console.log(`✅ Expected error: ${error.response.data.message}`);
            console.log(`Current balance: $${error.response.data.currentBalance}\n`);
        }

        // Step 6: Test without token
        console.log('6️⃣ Testing access without token...');
        try {
            await axios.get(`${BASE_URL}/balance`);
        } catch (error) {
            console.log(`✅ Expected error: ${error.response.data.message}\n`);
        }

        console.log('🎉 All tests completed successfully!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    testBankingAPI();
}

module.exports = testBankingAPI;
