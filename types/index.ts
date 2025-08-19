// types/index.ts - Updated with correct interfaces

export interface TranslationKeys {
  [key: string]: string
}

export interface Translations {
  fr: TranslationKeys
  en: TranslationKeys
}

// Activity Types
export interface ActivityCategory {
  id: number
  slug: string
  titleFr: string
  titleEn?: string
  descriptionFr?: string
  descriptionEn?: string
  displayOrder: number
  icon?: string
  color?: string
  subcategories: ActivitySubcategory[]
  activities: Activity[]
  _count?: { activities: number }
}

export interface ActivitySubcategory {
  id: number
  slug: string
  titleFr: string
  titleEn?: string
  displayOrder: number
  activities: Activity[]
}

export interface Activity {
  id: number
  slug: string
  titleFr: string
  titleEn?: string
  shortDescFr?: string
  shortDescEn?: string
  descriptionFr?: string
  descriptionEn?: string
  methodology?: string
  deliverables?: string[]
  duration?: string
  targetAudience?: string
  features?: string[]
  image?: string
  isFeatured: boolean
}

// Project Types
export interface BlogPost {
  id: number
  titleFr: string
  titleEn?: string
  title_fr?: string
  content: string
  category: string
  author?: string
  image?: string
  featured?: boolean
  published?: boolean
  createdAt: string
  updatedAt?: string
}

export interface Project {
  id: number
  titleFr: string
  titleEn?: string
  descriptionFr: string
  descriptionEn?: string
  client: string
  year: string
  status: string
  category?: string
  location?: string
  budget?: string
  duration?: string
  image?: string
  featured?: boolean
  achievements?: string[]
  beneficiaries?: string
  waterTreated?: string
  efficiency?: string
  technicalSpecs?: string
  environmentalImpact?: string
  createdAt: string
  updatedAt?: string
}

export interface Partner {
  id: number
  name: string
  logo?: string
  category: string
  url?: string
  active?: boolean
  partnerOrder?: number
  createdAt: string
}

export interface ProjectCategory {
  title: string
  projects: Project[]
  count: number
}

// Base Component Props
export interface BaseComponentProps {
  currentLang: 'fr' | 'en'
  t: (key: string) => string
}

export interface NavigationProps extends BaseComponentProps {
  setCurrentPage: (page: string) => void
}

export interface SectionProps extends NavigationProps {
  loading?: boolean
}

// Page Component Props
export interface ActivitiesPageProps extends BaseComponentProps {
  categories: ActivityCategory[]  // Fixed: was activityCategories
  selectedCategory?: string
  onBack: () => void
  onActivitySelect: (activity: Activity) => void  // Fixed: proper typing
}

export interface ProjectsPageProps extends BaseComponentProps {
  projects: Project[]
  categories: {[key: string]: ProjectCategory}  // Fixed: matches usage
  selectedCategory?: string
  onBack: () => void
  onProjectSelect: (project: Project) => void  // Fixed: proper typing
}

export interface ActivityDetailPageProps extends BaseComponentProps {
  activity: Activity
  onBack: () => void
}

export interface ProjectDetailPageProps extends BaseComponentProps {
  project: Project
  onBack: () => void
}

export interface BlogDetailPageProps extends BaseComponentProps {
  post: BlogPost
  onBack: () => void
}

// Section Component Props
export interface ActivitiesOverviewProps extends SectionProps {
  categories: ActivityCategory[]
  onActivitySelect?: (activity: Activity) => void
}

export interface ProjectsOverviewProps extends SectionProps {
  projects: Project[]
  categories: {[key: string]: ProjectCategory}
  onProjectSelect: (project: Project) => void
}

export interface BlogSectionProps extends SectionProps {
  posts: BlogPost[]
  onPostSelect: (post: BlogPost) => void
}

export interface PartnersSectionProps extends SectionProps {
  partners: Partner[]
}

export interface ContactSectionProps extends BaseComponentProps {}

// Admin Component Props
export interface AdminSectionProps {
  openModal: (type: string, item?: any) => void
  onDelete: (type: string, id: number) => void
  loading: boolean
}

export interface FormProps<T> {
  item?: T
  onSave: (data: T) => void
  onCancel: () => void
  loading: boolean
}

export interface ActivityFormProps extends FormProps<Activity> {}
export interface ProjectFormProps extends FormProps<Project> {}
export interface PartnerFormProps extends FormProps<Partner> {}
export interface BlogFormProps extends FormProps<BlogPost> {}