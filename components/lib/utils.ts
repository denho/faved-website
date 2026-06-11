import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isNavLinkActive(pathname: string, href: string): boolean {
  if (!href.startsWith('/') || href.startsWith('/#')) return false
  const base = '/' + href.split('/')[1]
  return pathname.startsWith(base)
}
