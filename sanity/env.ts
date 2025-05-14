// Hard-coded values with fallbacks to environment variables
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mzxjl6sk'
export const useCdn = false

// Modified assertValue function to use fallbacks instead of throwing errors
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    // Instead of throwing an error, return a default value
    console.warn(`Warning: ${errorMessage}. Using fallback value.`)
    return '' as unknown as T
  }
  return v
}