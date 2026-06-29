import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isNavLinkActive(pathname: string, href: string): boolean {
  if (!href.startsWith('/') || href.startsWith('/#')) return false
  const base = '/' + href.split('/')[1]
  return pathname.startsWith(base)
}

export function getCookie(name: string) {
  if (typeof document === 'undefined') {
    return undefined
  }

  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')
    .slice(1)
    .join('=')
}
