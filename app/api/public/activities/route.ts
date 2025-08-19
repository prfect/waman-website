// app/api/public/activities/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.activityCategory.findMany({
      where: { isActive: true },
      include: {
        subcategories: {
          where: { isActive: true },
          orderBy: { displayOrder: 'asc' },
          include: {
            activities: {
              where: { isActive: true },
              orderBy: { displayOrder: 'asc' },
              select: {
                id: true,
                slug: true,
                titleFr: true,
                titleEn: true,
                shortDescFr: true,
                shortDescEn: true,
                image: true,
                isFeatured: true
              }
            }
          }
        },
        activities: {
          where: { 
            isActive: true,
            subcategoryId: null // Direct category activities
          },
          orderBy: { displayOrder: 'asc' },
          select: {
            id: true,
            slug: true,
            titleFr: true,
            titleEn: true,
            shortDescFr: true,
            shortDescEn: true,
            image: true,
            isFeatured: true
          }
        }
      },
      orderBy: { displayOrder: 'asc' }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('GET Public Activities error:', error)
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 })
  }
}