require('dotenv').config();
require('./connection'); // MongoDB connection
const User = require('./models/User');

async function createAdminUser() {
    try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
        
        if (existingAdmin) {
            console.log('Admin user already exists!');
            console.log('Email:', existingAdmin.email);
            console.log('IsAdmin:', existingAdmin.isAdmin);
            
            // Update to make sure isAdmin is set to true
            if (!existingAdmin.isAdmin) {
                existingAdmin.isAdmin = true;
                await existingAdmin.save();
                console.log('✅ Updated existing user to admin');
            }
        } else {
            // Create new admin user
            const admin = new User({
                email: 'admin@gmail.com',
                password: 'Admin@12345', // Note: In production, this should be hashed!
                name: 'Admin',
                isAdmin: true
            });
            
            await admin.save();
            console.log('✅ Admin user created successfully!');
            console.log('Email: admin@gmail.com');
            console.log('Password: Admin@12345');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        process.exit(1);
    }
}

createAdminUser();
