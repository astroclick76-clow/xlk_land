const STORAGE_KEY = 'xlk_purchases'

export function savePurchase(ticket) {
  try {
    const existing = getPurchases()
    existing.push(ticket)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  } catch (err) {
    console.error('Error saving purchase to localStorage:', err)
  }
}

export function getPurchases() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}
