export function withBaseUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path
  const baseUrl = import.meta.env.BASE_URL

  if (baseUrl === '/') {
    return `/${normalizedPath}`
  }

  return `${baseUrl}${normalizedPath}`
}
