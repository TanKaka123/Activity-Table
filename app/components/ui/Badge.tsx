import * as React from 'react'
import { cn } from '@/utils/tailwind'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline'
}

const badgeBase =
  'inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium transition-colors'

const badgeVariants: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  outline: 'border border-gray-300 text-gray-800',
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div className={cn(badgeBase, badgeVariants[variant], className)} {...props} />
  )
}

export { Badge }
