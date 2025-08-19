// app/api/admin/[resource]/route.ts - Optimized with query performance
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Helper function to handle Prisma connection issues with retry logic
const withRetry = async (operation: () => Promise<any>, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation()
    } catch (error: any) {
      console.log(`Attempt ${i + 1} failed:`, error.message)
      
      if (i === retries - 1) throw error
      
      // Reset connection on certain errors
      if (error.message.includes('prepared statement') || error.message.includes('connection')) {
        try {
          await prisma.$disconnect()
          await new Promise(resolve => setTimeout(resolve, 100))
        } catch (resetError) {
          console.log('Connection reset failed:', resetError)
        }
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 100 * (i + 1)))
    }
  }
}

// Optimized field mapping for database compatibility
const mapFields = (resource: string, data: any, toDatabase = false) => {
  // For partners resource
  if (resource === 'partners') {
    if (toDatabase) {
      const cleanData: any = {
        name: data.name,
        category: data.category,
        active: data.active ?? true,
        order: data.partnerOrder ?? 0
      }
      
      if (data.logo && data.logo.trim() !== '') cleanData.logo = data.logo
      if (data.url && data.url.trim() !== '') cleanData.url = data.url
      
      return cleanData
    } else {
      return {
        id: data.id,
        name: data.name,
        logo: data.logo,
        category: data.category,
        url: data.url,
        active: data.active,
        partnerOrder: data.order,
        createdAt: data.createdAt
      }
    }
  }

  // For blog_posts resource
  if (resource === 'blog_posts') {
    if (toDatabase) {
      const cleanData: any = {
        titleFr: data.titleFr,
        content: data.content,
        category: data.category,
        featured: data.featured ?? false,
        published: data.published ?? true
      }
      
      if (data.titleEn && data.titleEn.trim() !== '') cleanData.titleEn = data.titleEn
      if (data.author && data.author.trim() !== '') cleanData.author = data.author
      if (data.image && data.image.trim() !== '') cleanData.image = data.image
      
      return cleanData
    } else {
      return {
        id: data.id,
        titleFr: data.titleFr,
        titleEn: data.titleEn,
        content: data.content,
        category: data.category,
        author: data.author,
        image: data.image,
        featured: data.featured,
        published: data.published,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }
    }
  }

  // For projects resource
  if (resource === 'projects') {
    if (toDatabase) {
      const cleanData: any = {
        titleFr: data.titleFr,
        descriptionFr: data.descriptionFr,
        client: data.client,
        year: data.year,
        status: data.status,
        featured: data.featured ?? false
      }
      
      // Add optional fields only if they exist
      if (data.titleEn && data.titleEn.trim() !== '') cleanData.titleEn = data.titleEn
      if (data.descriptionEn && data.descriptionEn.trim() !== '') cleanData.descriptionEn = data.descriptionEn
      if (data.category && data.category.trim() !== '') cleanData.category = data.category
      if (data.location && data.location.trim() !== '') cleanData.location = data.location
      if (data.budget && data.budget.trim() !== '') cleanData.budget = data.budget
      if (data.duration && data.duration.trim() !== '') cleanData.duration = data.duration
      if (data.image && data.image.trim() !== '') cleanData.image = data.image
      if (Array.isArray(data.achievements)) cleanData.achievements = data.achievements
      
      return cleanData
    }
  }

  // For contacts resource
  if (resource === 'contacts') {
    if (toDatabase) {
      return {
        name: data.name,
        email: data.email,
        company: data.company || null,
        projectType: data.projectType || null,
        message: data.message,
        status: data.status || 'nouveau'
      }
    }
  }

  // Default case - return as is
  return data
}

// OPTIMIZED GET REQUEST with selective field fetching
export async function GET(
  request: NextRequest,
  { params }: { params: { resource: string } }
) {
  try {
    const { resource } = await params
    console.log(`GET request for resource: ${resource}`)

    const operation = async () => {
      let data = null

      // Optimized queries with selective field fetching
      switch (resource) {
        case 'projects':
          data = await prisma.project.findMany({
            select: {
              id: true,
              titleFr: true,
              titleEn: true,
              descriptionFr: true,
              descriptionEn: true,
              client: true,
              year: true,
              status: true,
              category: true,
              location: true,
              budget: true,
              duration: true,
              image: true,
              featured: true,
              achievements: true,
              createdAt: true,
              updatedAt: true
            },
            orderBy: { createdAt: 'desc' },
            take: 100 // Limit to last 100 projects
          })
          break

        case 'partners':
          data = await prisma.partner.findMany({
            select: {
              id: true,
              name: true,
              logo: true,
              category: true,
              url: true,
              active: true,
              order: true,
              createdAt: true
            },
            orderBy: { order: 'asc' },
            take: 100 // Limit to 100 partners
          })
          break

        case 'blog_posts':
          data = await prisma.blogPost.findMany({
            select: {
              id: true,
              titleFr: true,
              titleEn: true,
              content: true,
              category: true,
              author: true,
              image: true,
              featured: true,
              published: true,
              createdAt: true,
              updatedAt: true
            },
            orderBy: { createdAt: 'desc' },
            take: 50 // Limit to last 50 blog posts
          })
          break

        case 'contacts':
          data = await prisma.contact.findMany({
            select: {
              id: true,
              name: true,
              email: true,
              company: true,
              projectType: true,
              message: true,
              status: true,
              createdAt: true,
              updatedAt: true
            },
            orderBy: { createdAt: 'desc' },
            take: 200 // Limit to last 200 contacts
          })
          break

        default:
          throw new Error(`Invalid resource: ${resource}`)
      }

      return data
    }

    const data = await withRetry(operation)
    console.log(`Successfully fetched ${data?.length || 0} records for ${resource}`)

    // Map fields for response
    const mappedData = data?.map((item: any) => mapFields(resource, item, false)) || []
    
    return NextResponse.json(mappedData)

  } catch (error: any) {
    console.error(`GET Error for ${await params.resource}:`, error)
    
    return NextResponse.json({ 
      error: 'Failed to fetch data',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 })
  }
}

// OPTIMIZED POST REQUEST
export async function POST(
  request: NextRequest,
  { params }: { params: { resource: string } }
) {
  try {
    const { resource } = await params
    const body = await request.json()
    
    console.log(`POST request for resource: ${resource}`)

    // Map and clean data for database
    const itemData = mapFields(resource, body, true)
    
    // Remove undefined/null values
    Object.keys(itemData).forEach(key => {
      if (itemData[key] === undefined || itemData[key] === null || itemData[key] === '') {
        delete itemData[key]
      }
    })

    const operation = async () => {
      let created = null

      // Direct model access to avoid union type issues
      switch (resource) {
        case 'projects':
          created = await prisma.project.create({ data: itemData })
          break
        case 'partners':
          created = await prisma.partner.create({ data: itemData })
          break
        case 'blog_posts':
          created = await prisma.blogPost.create({ data: itemData })
          break
        case 'contacts':
          created = await prisma.contact.create({ data: itemData })
          break
        default:
          throw new Error(`Invalid resource: ${resource}`)
      }

      return created
    }

    const created = await withRetry(operation)

    // Map back for response
    const response = mapFields(resource, created, false)
    
    console.log(`Successfully created ${resource} with id:`, created.id)
    return NextResponse.json(response)

  } catch (error: any) {
    console.error(`POST Error for ${await params.resource}:`, error)
    return NextResponse.json({ 
      error: 'Failed to create item',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 })
  }
}

// OPTIMIZED PUT REQUEST
export async function PUT(
  request: NextRequest,
  { params }: { params: { resource: string } }
) {
  try {
    const { resource } = await params
    const body = await request.json()
    
    console.log(`PUT request for resource: ${resource}`)

    if (!body.id) {
      return NextResponse.json({ error: 'ID is required for update' }, { status: 400 })
    }

    // Map and clean data for database
    const updateData = mapFields(resource, body, true)
    delete updateData.id // Don't update the ID
    delete updateData.createdAt // Don't update creation time

    // Remove undefined/null values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined || updateData[key] === null || updateData[key] === '') {
        delete updateData[key]
      }
    })

    const operation = async () => {
      let updated = null

      // Direct model access to avoid union type issues
      switch (resource) {
        case 'projects':
          updated = await prisma.project.update({
            where: { id: body.id },
            data: updateData
          })
          break
        case 'partners':
          updated = await prisma.partner.update({
            where: { id: body.id },
            data: updateData
          })
          break
        case 'blog_posts':
          updated = await prisma.blogPost.update({
            where: { id: body.id },
            data: updateData
          })
          break
        case 'contacts':
          updated = await prisma.contact.update({
            where: { id: body.id },
            data: updateData
          })
          break
        default:
          throw new Error(`Invalid resource: ${resource}`)
      }

      return updated
    }

    const updated = await withRetry(operation)

    // Map back for response
    const response = mapFields(resource, updated, false)
    
    console.log(`Successfully updated ${resource} with id:`, body.id)
    return NextResponse.json(response)

  } catch (error: any) {
    console.error(`PUT Error for ${await params.resource}:`, error)
    return NextResponse.json({ 
      error: 'Failed to update item',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 })
  }
}

// OPTIMIZED DELETE REQUEST
export async function DELETE(
  request: NextRequest,
  { params }: { params: { resource: string } }
) {
  try {
    const { resource } = await params
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    console.log(`DELETE request for resource: ${resource}, id: ${id}`)

    if (!id) {
      return NextResponse.json({ error: 'ID is required for delete' }, { status: 400 })
    }

    const numericId = parseInt(id)

    const operation = async () => {
      // Direct model access to avoid union type issues
      switch (resource) {
        case 'projects':
          await prisma.project.delete({
            where: { id: numericId }
          })
          break
        case 'partners':
          await prisma.partner.delete({
            where: { id: numericId }
          })
          break
        case 'blog_posts':
          await prisma.blogPost.delete({
            where: { id: numericId }
          })
          break
        case 'contacts':
          await prisma.contact.delete({
            where: { id: numericId }
          })
          break
        default:
          throw new Error(`Invalid resource: ${resource}`)
      }
    }

    await withRetry(operation)

    console.log(`Successfully deleted ${resource} with id:`, id)
    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error(`DELETE Error for ${await params.resource}:`, error)
    return NextResponse.json({ 
      error: 'Failed to delete item',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    }, { status: 500 })
  }
}