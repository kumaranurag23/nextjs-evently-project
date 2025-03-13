import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import qs from 'query-string'

interface UrlQueryParams {
  params: string
  key: string
  value: string | null
}

interface RemoveUrlQueryParams {
  params: string
  keysToRemove: string[]
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateTime = (dateString: Date | string) => {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date')
    }

    const dateTimeOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }

    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    }

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }

    return {
      dateTime: date.toLocaleString('en-US', dateTimeOptions),
      dateOnly: date.toLocaleString('en-US', dateOptions),
      timeOnly: date.toLocaleString('en-US', timeOptions),
    }
  } catch (error) {
    console.error('Date formatting error:', error)
    return {
      dateTime: 'Invalid date',
      dateOnly: 'Invalid date',
      timeOnly: 'Invalid date',
    }
  }
}

export const convertFileToUrl = (file: File): string => {
  try {
    return URL.createObjectURL(file)
  } catch (error) {
    console.error('File conversion error:', error)
    throw new Error('Failed to convert file to URL')
  }
}

export const formatPrice = (price: string | number): string => {
  try {
    const amount = typeof price === 'string' ? parseFloat(price) : price
    if (isNaN(amount)) throw new Error('Invalid price value')
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  } catch (error) {
    console.error('Price formatting error:', error)
    return 'Invalid price'
  }
}

export function formUrlQuery({ params, key, value }: UrlQueryParams): string {
  try {
    const currentUrl = qs.parse(params)
    currentUrl[key] = value

    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  } catch (error) {
    console.error('URL query formation error:', error)
    return window.location.pathname
  }
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams): string {
  try {
    const currentUrl = qs.parse(params)
    keysToRemove.forEach(key => {
      delete currentUrl[key]
    })

    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  } catch (error) {
    console.error('URL query removal error:', error)
    return window.location.pathname
  }
}

export const handleError = (error: unknown): never => {
  console.error('Error:', error)
  
  let errorMessage: string
  if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    try {
      errorMessage = JSON.stringify(error)
    } catch {
      errorMessage = 'An unknown error occurred'
    }
  }
  
  throw new Error(errorMessage)
}