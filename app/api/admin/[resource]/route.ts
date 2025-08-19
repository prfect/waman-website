// Path: app\api\admin\[resource]\route.ts
// Fixed version with better error handling and connection management

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Helper function to handle Prisma connection issues
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
          await prisma.$connect()
        } catch (resetError) {
          console.log('Connection reset failed:', resetError)
        }
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 100 * (i + 1)))
    }
  }
}

// Define model mapping
const getModel = (resource: string) => {
  switch (resource) {
    case 'services': return prisma.service
    case 'projects': return prisma.project
    case 'partners': return prisma.partner
    case 'blog_posts': return prisma.blogPost
    case 'contacts': return prisma.contact
    default: return null
  }
}

// Field mapping for database compatibility
const mapFields = (resource: string, data: any, toDatabase = false) => {
  if (resource === 'services') {
    if (toDatabase) {
      // Send data to database - use actual database field names
      const cleanData: any = {
        titleFr: data.titleFr,
        titleEn: data.titleEn,
        descriptionFr: data.descriptionFr,
        descriptionEn: data.descriptionEn,
        category: data.category,
        icon: data.icon,
        active: data.active ?? true,
        order: data.serviceOrder ?? 0  // Use 'order' not 'serviceOrder'
      }
      
      // Only add image if it's not empty
      if (data.image && data.image.trim() !== '') {
        cleanData.image = data.image
      }
      
      // Only add features if provided
      if (data.features && Array.isArray(data.features)) {
        cleanData.features = data.features
      }
      
      return cleanData
    } else {
      // Return data from database - convert to frontend format
      return {
        id: data.id,
        titleFr: data.titleFr,
        titleEn: data.titleEn,
        descriptionFr: data.descriptionFr,
        descriptionEn: data.descriptionEn,
        category: data.category,
        icon: data.icon,
        image: data.image,
        features: data.features,
        active: data.active,
        serviceOrder: data.order, // Convert 'order' to 'serviceOrder' for frontend
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }
    }
  }

  if (resource === 'projects') {
    if (toDatabase) {
      const cleanData: any = {
        titleFr: data.titleFr,
        titleEn: data.titleEn,
        descriptionFr: data.descriptionFr,
        descriptionEn: data.descriptionEn,
        client: data.client,
        year: data.year,
        status: data.status,
        featured: data.featured ?? false
      }
      
      // Add optional fields only if they exist
      if (data.category) cleanData.category = data.category
      if (data.location) cleanData.location = data.location
      if (data.budget) cleanData.budget = data.budget
      if (data.duration) cleanData.duration = data.duration
      if (data.image && data.image.trim() !== '') cleanData.image = data.image
      if (data.achievements && Array.isArray(data.achievements)) cleanData.achievements = data.achievements
      
      return cleanData
    } else {
      return {
        id: data.id,
        titleFr: data.titleFr,
        titleEn: data.titleEn,
        descriptionFr: data.descriptionFr,
        descriptionEn: data.descriptionEn,
        client: data.client,
        year: data.year,
        status: data.status,
        category: data.category,
        location: data.location,
        budget: data.budget,
        duration: data.duration,
        image: data.image,
        featured: data.featured,
        achievements: data.achievements,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }
    }
  }

  if (resource === 'partners') {
    if (toDatabase) {
      const cleanData: any = {
        name: data.name,
        logo: data.logo,
        category: data.category,
        active: data.active ?? true,
        order: data.partnerOrder ?? 0  // Use 'order' not 'partnerOrder'
      }
      
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
        partnerOrder: data.order, // Convert 'order' to 'partnerOrder' for frontend
        createdAt: data.createdAt
      }
    }
  }

  if (resource === 'blog_posts') {
    if (toDatabase) {
      const cleanData: any = {
        titleFr: data.titleFr,
        content: data.content,
        category: data.category,
        featured: data.featured ?? false,
        published: data.published ?? true
      }
      
      // Add optional fields only if they exist
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

  // Default case - return as is
  return data
}

export async function GET(
  request: NextRequest,
  { params }: { params: { resource: string } }
) {
  try {
    const { resource } = await params
    console.log(`GET request for resource: ${resource}`)

    const operation = async () => {
      let data = null

      // Direct model access with correct field names
      switch (resource) {
        case 'services':
          data = await prisma.service.findMany({
            orderBy: { createdAt: 'desc' }
          })
          break
        case 'projects':
          data = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' }
          })
          break
        case 'partners':
          data = await prisma.partner.findMany({
            orderBy: { createdAt: 'desc' }
          })
          break
        case 'blog_posts':
          data = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' }
          })
          break
        case 'contacts':
          data = await prisma.contact.findMany({
            orderBy: { createdAt: 'desc' }
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
    console.error(`GET Error:`, error)
    
    return NextResponse.json({ 
      error: 'Failed to fetch data',
      details: error.message
    }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { resource: string } }
) {
  try {
    const { resource } = await params
    const body = await request.json()
    
    console.log(`POST request for resource: ${resource}`)
    console.log('Request body:', body)

    // Map and clean data for database
    const itemData = mapFields(resource, body, true)
    
    // Remove undefined/null values
    Object.keys(itemData).forEach(key => {
      if (itemData[key] === undefined || itemData[key] === null || itemData[key] === '') {
        delete itemData[key]
      }
    })

    console.log('Creating item with data:', itemData)

    let created = null

    // Direct model access to avoid union type issues
    switch (resource) {
      case 'services':
        created = await prisma.service.create({ data: itemData })
        break
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
        return NextResponse.json({ error: 'Invalid resource' }, { status: 404 })
    }

    // Map back for response
    const response = mapFields(resource, created, false)
    
    console.log(`Successfully created ${resource} with id:`, created.id)
    return NextResponse.json(response)

  } catch (error: any) {
    console.error(`POST Error:`, error)
    return NextResponse.json({ 
      error: 'Failed to create item',
      details: error.message
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { resource: string } }
) {
  try {
    const { resource } = await params
    const body = await request.json()
    
    console.log(`PUT request for resource: ${resource}`)
    console.log('Request body:', body)

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

    console.log('Updating item with data:', updateData)

    let updated = null

    // Direct model access to avoid union type issues
    switch (resource) {
      case 'services':
        updated = await prisma.service.update({
          where: { id: body.id },
          data: updateData
        })
        break
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
        return NextResponse.json({ error: 'Invalid resource' }, { status: 404 })
    }

    // Map back for response
    const response = mapFields(resource, updated, false)
    
    console.log(`Successfully updated ${resource} with id:`, body.id)
    return NextResponse.json(response)

  } catch (error: any) {
    console.error(`PUT Error:`, error)
    return NextResponse.json({ 
      error: 'Failed to update item',
      details: error.message
    }, { status: 500 })
  }
}

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

    // Direct model access to avoid union type issues
    switch (resource) {
      case 'services':
        await prisma.service.delete({
          where: { id: numericId }
        })
        break
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
        return NextResponse.json({ error: 'Invalid resource' }, { status: 404 })
    }

    console.log(`Successfully deleted ${resource} with id:`, id)
    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error(`DELETE Error:`, error)
    return NextResponse.json({ 
      error: 'Failed to delete item',
      details: error.message
    }, { status: 500 })
  }
}