export function getPhantomDeepLink() {
  const url = encodeURIComponent(window.location.href)
  return `https://phantom.app/ul/browse/${url}`
}

export function isInPhantomApp() {
  return (
    typeof window !== 'undefined' &&
    window.phantom?.solana?.isPhantom === true
  )
}
