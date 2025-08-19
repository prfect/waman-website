// app/api/admin/activity-categories/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.activityCategory.findMany({
      include: {
        subcategories: {
          orderBy: { displayOrder: 'asc' },
          include: {
            activities: {
              where: { isActive: true },
              orderBy: { displayOrder: 'asc' }
            }
          }
        },
        activities: {
          where: { isActive: true },
          orderBy: { displayOrder: 'asc' }
        },
        _count: {
          select: {
            activities: {
              where: { isActive: true }
            }
          }
        }
      },
      orderBy: { displayOrder: 'asc' }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('GET Categories error:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

