// Path: test-db.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function testConnection() {
  try {
    const users = await prisma.user.findMany()
    console.log('Database connected! Users:', users.length)
  } catch (error) {
    console.error('Database error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()