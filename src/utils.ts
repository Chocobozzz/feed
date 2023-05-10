export function sanitize(url: string | undefined | null): string | undefined | null {
  if (typeof url === 'string') {
    return url.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }
  return url
}
