// lib/db-utils.ts
import { prisma } from './prisma'

export async function withRetry<T>(
  operation: () => Promise<T>, 
  maxRetries: number = 3
): Promise<T> {
  let lastError: any
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error: any) {
      lastError = error
      console.log(`Attempt ${attempt} failed:`, error.message)
      
      // If it's a prepared statement error, disconnect and retry
      if (error.message?.includes('prepared statement') && attempt < maxRetries) {
        await prisma.$disconnect()
        // Wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 100 * attempt))
        continue
      }
      
      // For other errors, throw immediately
      if (attempt === maxRetries) {
        throw error
      }
    }
  }
  
  throw lastError
}