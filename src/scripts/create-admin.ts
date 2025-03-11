// Este script pode ser executado uma vez para criar o usuário admin inicial
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import UserModel from '../models/user';

async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }
  
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
}

async function createAdminUser() {
  try {
    await connectToDatabase();
    
    const adminEmail = 'admin@fhresolve.com';
    
    // Verifica se já existe um usuário admin
    const existingAdmin = await UserModel.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }
    
    // Cria a senha com hash
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Cria o usuário admin
    const adminUser = new UserModel({
      name: 'Administrador',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });
    
    await adminUser.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createAdminUser();