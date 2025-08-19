// app/api/admin/activities/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withRetry } from '@/lib/db-utils'

export async function GET() {
  try {
    const activities = await withRetry(async () => {
      return await prisma.activity.findMany({
        include: {
          category: true,
          subcategory: true
        },
        orderBy: { displayOrder: 'asc' }
      })
    })
    
    return Response.json(activities)
  } catch (error) {
    console.error('GET Activities error:', error)
    return Response.json({ error: 'Failed to fetch activities' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const activity = await prisma.activity.create({
      data: {
        slug: body.slug,
        titleFr: body.titleFr,
        titleEn: body.titleEn || null,
        shortDescFr: body.shortDescFr || null,
        shortDescEn: body.shortDescEn || null,
        descriptionFr: body.descriptionFr || '',
        descriptionEn: body.descriptionEn || null,
        methodology: body.methodology || null,
        deliverables: body.deliverables || [],
        duration: body.duration || null,
        targetAudience: body.targetAudience || null,
        prerequisites: body.prerequisites || null,
        technologies: body.technologies || [],
        dataTypes: body.dataTypes || [],
        outputFormats: body.outputFormats || [],
        features: body.features || [],
        certifications: body.certifications || [],
        displayOrder: body.displayOrder || 0,
        isActive: body.isActive ?? true,
        isFeatured: body.isFeatured ?? false,
        image: body.image || null,
        categoryId: body.categoryId,
        subcategoryId: body.subcategoryId || null
      },
      include: {
        category: true,
        subcategory: true
      }
    })

    return NextResponse.json(activity)
  } catch (error) {
    console.error('POST Activity error:', error)
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.id) {
      return NextResponse.json({ error: 'ID is required for update' }, { status: 400 })
    }

    const activity = await prisma.activity.update({
      where: { id: body.id },
      data: {
        slug: body.slug,
        titleFr: body.titleFr,
        titleEn: body.titleEn || null,
        shortDescFr: body.shortDescFr || null,
        shortDescEn: body.shortDescEn || null,
        descriptionFr: body.descriptionFr || '',
        descriptionEn: body.descriptionEn || null,
        methodology: body.methodology || null,
        deliverables: body.deliverables || [],
        duration: body.duration || null,
        targetAudience: body.targetAudience || null,
        prerequisites: body.prerequisites || null,
        technologies: body.technologies || [],
        dataTypes: body.dataTypes || [],
        outputFormats: body.outputFormats || [],
        features: body.features || [],
        certifications: body.certifications || [],
        displayOrder: body.displayOrder || 0,
        isActive: body.isActive ?? true,
        isFeatured: body.isFeatured ?? false,
        image: body.image || null,
        categoryId: body.categoryId,
        subcategoryId: body.subcategoryId || null
      },
      include: {
        category: true,
        subcategory: true
      }
    })

    return NextResponse.json(activity)
  } catch (error) {
    console.error('PUT Activity error:', error)
    return NextResponse.json({ error: 'Failed to update activity' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required for delete' }, { status: 400 })
    }

    await prisma.activity.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE Activity error:', error)
    return NextResponse.json({ error: 'Failed to delete activity' }, { status: 500 })
  }
}

