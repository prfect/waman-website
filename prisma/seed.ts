// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create main activity categories
  const servicesIngenierie = await prisma.activityCategory.upsert({
    where: { slug: 'services-ingenierie' },
    update: {},
    create: {
      slug: 'services-ingenierie',
      titleFr: 'Services & Ingénierie',
      titleEn: 'Services & Engineering',
      descriptionFr: 'Solutions techniques complètes en ingénierie de l\'eau et de l\'environnement',
      descriptionEn: 'Complete technical solutions in water and environmental engineering',
      displayOrder: 1,
      icon: 'Wrench',
      color: 'from-blue-500 to-blue-600',
      isActive: true
    }
  })

  const conseilsEtudes = await prisma.activityCategory.upsert({
    where: { slug: 'conseils-etudes' },
    update: {},
    create: {
      slug: 'conseils-etudes',
      titleFr: 'Conseils et Études',
      titleEn: 'Consulting & Studies',
      descriptionFr: 'Expertise conseil et études spécialisées pour vos projets stratégiques',
      descriptionEn: 'Expert consulting and specialized studies for your strategic projects',
      displayOrder: 2,
      icon: 'Target',
      color: 'from-green-500 to-green-600',
      isActive: true
    }
  })

  const ingenierieGeomatique = await prisma.activityCategory.upsert({
    where: { slug: 'ingenierie-geomatique' },
    update: {},
    create: {
      slug: 'ingenierie-geomatique',
      titleFr: 'Ingénierie Géomatique',
      titleEn: 'Geomatics Engineering',
      descriptionFr: 'SIG, télédétection et analyse spatiale pour la gestion des ressources',
      descriptionEn: 'GIS, remote sensing and spatial analysis for resource management',
      displayOrder: 3,
      icon: 'Globe',
      color: 'from-purple-500 to-purple-600',
      isActive: true
    }
  })

  const formation = await prisma.activityCategory.upsert({
    where: { slug: 'formation' },
    update: {},
    create: {
      slug: 'formation',
      titleFr: 'Formation',
      titleEn: 'Training',
      descriptionFr: 'Renforcement des capacités et formation technique spécialisée',
      descriptionEn: 'Capacity building and specialized technical training',
      displayOrder: 4,
      icon: 'Users',
      color: 'from-orange-500 to-orange-600',
      isActive: true
    }
  })

  console.log('✅ Activity categories created')

  // Create subcategories for Services & Ingénierie
  const serviceSubcategories = [
    {
      slug: 'alimentation-eau-potable',
      titleFr: 'Alimentation en Eau Potable',
      titleEn: 'Water Supply',
      categoryId: servicesIngenierie.id,
      displayOrder: 1
    },
    {
      slug: 'assainissement',
      titleFr: 'Assainissement',
      titleEn: 'Sanitation',
      categoryId: servicesIngenierie.id,
      displayOrder: 2
    },
    {
      slug: 'gestion-ressources-eau',
      titleFr: 'Gestion des Ressources en Eau',
      titleEn: 'Water Resources Management',
      categoryId: servicesIngenierie.id,
      displayOrder: 3
    },
    {
      slug: 'amenagement-bassins',
      titleFr: 'Aménagement de Bassins Versants',
      titleEn: 'Watershed Management',
      categoryId: servicesIngenierie.id,
      displayOrder: 4
    }
  ]

  for (const subcat of serviceSubcategories) {
    await prisma.activitySubcategory.upsert({
      where: { slug: subcat.slug },
      update: {},
      create: {
        ...subcat,
        isActive: true
      }
    })
  }

  // Create subcategories for Conseils et Études
  const conseilSubcategories = [
    {
      slug: 'etudes-faisabilite',
      titleFr: 'Études de Faisabilité',
      titleEn: 'Feasibility Studies',
      categoryId: conseilsEtudes.id,
      displayOrder: 1
    },
    {
      slug: 'etudes-impact-environnemental',
      titleFr: 'Études d\'Impact Environnemental',
      titleEn: 'Environmental Impact Studies',
      categoryId: conseilsEtudes.id,
      displayOrder: 2
    },
    {
      slug: 'conseil-strategique',
      titleFr: 'Conseil Stratégique',
      titleEn: 'Strategic Consulting',
      categoryId: conseilsEtudes.id,
      displayOrder: 3
    },
    {
      slug: 'assistance-maitrise-ouvrage',
      titleFr: 'Assistance Maîtrise d\'Ouvrage',
      titleEn: 'Project Management Assistance',
      categoryId: conseilsEtudes.id,
      displayOrder: 4
    }
  ]

  for (const subcat of conseilSubcategories) {
    await prisma.activitySubcategory.upsert({
      where: { slug: subcat.slug },
      update: {},
      create: {
        ...subcat,
        isActive: true
      }
    })
  }

  // Create subcategories for Ingénierie Géomatique
  const geomatiqueSubcategories = [
    {
      slug: 'systemes-information-geographique',
      titleFr: 'Systèmes d\'Information Géographique',
      titleEn: 'Geographic Information Systems',
      categoryId: ingenierieGeomatique.id,
      displayOrder: 1
    },
    {
      slug: 'teledetection-imagerie',
      titleFr: 'Télédétection et Imagerie',
      titleEn: 'Remote Sensing & Imagery',
      categoryId: ingenierieGeomatique.id,
      displayOrder: 2
    },
    {
      slug: 'cartographie-numerique',
      titleFr: 'Cartographie Numérique',
      titleEn: 'Digital Mapping',
      categoryId: ingenierieGeomatique.id,
      displayOrder: 3
    },
    {
      slug: 'modelisation-spatiale',
      titleFr: 'Modélisation Spatiale',
      titleEn: 'Spatial Modeling',
      categoryId: ingenierieGeomatique.id,
      displayOrder: 4
    }
  ]

  for (const subcat of geomatiqueSubcategories) {
    await prisma.activitySubcategory.upsert({
      where: { slug: subcat.slug },
      update: {},
      create: {
        ...subcat,
        isActive: true
      }
    })
  }

  // Create subcategories for Formation
  const formationSubcategories = [
    {
      slug: 'formation-sig',
      titleFr: 'Formation SIG',
      titleEn: 'GIS Training',
      categoryId: formation.id,
      displayOrder: 1
    },
    {
      slug: 'formation-gestion-eau',
      titleFr: 'Formation Gestion de l\'Eau',
      titleEn: 'Water Management Training',
      categoryId: formation.id,
      displayOrder: 2
    },
    {
      slug: 'renforcement-capacites',
      titleFr: 'Renforcement des Capacités',
      titleEn: 'Capacity Building',
      categoryId: formation.id,
      displayOrder: 3
    },
    {
      slug: 'certification-professionnelle',
      titleFr: 'Certification Professionnelle',
      titleEn: 'Professional Certification',
      categoryId: formation.id,
      displayOrder: 4
    }
  ]

  for (const subcat of formationSubcategories) {
    await prisma.activitySubcategory.upsert({
      where: { slug: subcat.slug },
      update: {},
      create: {
        ...subcat,
        isActive: true
      }
    })
  }

  console.log('✅ Activity subcategories created')
  console.log('🎉 Seed completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

// package.json script addition:
// "scripts": {
//   "seed": "tsx prisma/seed.ts"
// }