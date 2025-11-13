require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/database');

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const adminExists = await User.findOne({ username: 'hameda9795' });

    if (adminExists) {
      console.log('⚠️  Admin user already exists');
      process.exit(0);
    }

    // Create admin user with credentials from .env
    const admin = await User.create({
      username: process.env.ADMIN_USERNAME || 'hameda9795',
      email: process.env.ADMIN_EMAIL || 'hameda9795@gmail.com',
      password: process.env.ADMIN_PASSWORD || '102067438Gerd.com',
      role: 'admin',
      isActive: true,
    });

    console.log('✅ Admin user created successfully');
    console.log('📧 Email:', admin.email);
    console.log('👤 Username:', admin.username);
    console.log('🔐 Password:', process.env.ADMIN_PASSWORD || '102067438Gerd.com');
    console.log('🎯 Role:', admin.role);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
