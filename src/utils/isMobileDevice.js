export function isMobileDevice() {
  if (typeof navigator === 'undefined') return false

  const ua = navigator.userAgent || ''

  const mobilePatterns = [
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /webOS/i,
    /BlackBerry/i,
    /Windows Phone/i,
    /IEMobile/i,
    /Opera Mini/i,
  ]

  if (mobilePatterns.some((p) => p.test(ua))) return true

  if (/Macintosh/i.test(ua) && 'ontouchend' in document) return true

  return false
}

export function getMobileOS() {
  const ua = navigator.userAgent || ''
  if (/iPad/i.test(ua) || (/Macintosh/i.test(ua) && 'ontouchend' in document))
    return 'iPadOS'
  if (/iPhone/i.test(ua)) return 'iOS'
  if (/iPod/i.test(ua)) return 'iOS'
  if (/Android/i.test(ua)) return 'Android'
  return null
}
