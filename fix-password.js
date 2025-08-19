// fix-password.js - Run this to reset your admin password
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixPassword() {
  const email = 'admin@wamanconsulting.com';
  const newPassword = 'admin123'; // Set this to whatever you want
  
  try {
    // Generate new hash
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('🔐 New hash generated:', hashedPassword);
    
    // Update the password
    const result = await prisma.user.updateMany({
      where: { email: email },
      data: { password: hashedPassword }
    });
    
    console.log('✅ Password updated successfully!');
    console.log('📧 Email:', email);
    console.log('🔑 New Password:', newPassword);
    console.log('👤 Users updated:', result.count);
    
    // Test the new hash
    const isValid = await bcrypt.compare(newPassword, hashedPassword);
    console.log('🧪 Hash test:', isValid ? 'PASSED' : 'FAILED');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixPassword();