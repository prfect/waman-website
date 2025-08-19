// components/ui/Button.tsx
import React from 'react'
import { LucideIcon } from 'lucide-react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'professional' | 'premium'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  loading?: boolean
  className?: string
  href?: string
  target?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  href,
  target
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-xl
    transition-all duration-300 transform hover:scale-105 active:scale-95
    focus:outline-none focus:ring-4 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    shadow-lg hover:shadow-xl
  `

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
      text-white border-2 border-transparent
      focus:ring-blue-500/50 shadow-blue-500/25
    `,
    secondary: `
      bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800
      text-white border-2 border-transparent
      focus:ring-green-500/50 shadow-green-500/25
    `,
    outline: `
      bg-transparent border-2 border-blue-600 text-blue-600
      hover:bg-blue-600 hover:text-white hover:border-blue-700
      focus:ring-blue-500/50
    `,
    ghost: `
      bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900
      border-2 border-transparent hover:border-gray-200
      focus:ring-gray-500/50
    `,
    professional: `
      bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black
      text-white border-2 border-slate-700 hover:border-slate-600
      focus:ring-slate-500/50 shadow-slate-500/25
    `,
    premium: `
      bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 
      hover:from-purple-700 hover:via-blue-700 hover:to-teal-700
      text-white border-2 border-transparent
      focus:ring-purple-500/50 shadow-purple-500/25
      relative overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-white/0 before:via-white/10 before:to-white/0
      before:translate-x-[-100%] hover:before:translate-x-[100%]
      before:transition-transform before:duration-700
    `
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.trim()

  const content = (
    <>
      {loading && (
        <div className={`animate-spin rounded-full border-2 border-white border-t-transparent ${iconSizes[size]} ${Icon ? 'mr-2' : ''}`} />
      )}
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className={`${iconSizes[size]} ${children ? 'mr-2' : ''}`} />
      )}
      {children && <span className="relative z-10">{children}</span>}
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className={`${iconSizes[size]} ${children ? 'ml-2' : ''}`} />
      )}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={classes}
        onClick={onClick}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  )
}