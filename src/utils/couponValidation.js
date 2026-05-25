const VALID_COUPONS = {
  'XLK-2026-50': { discountPercent: 50 },
}

export function validateCoupon(code) {
  if (!code || typeof code !== 'string') return { valid: false }
  const normalized = code.trim().toUpperCase()
  const coupon = VALID_COUPONS[normalized]
  if (coupon) {
    return { valid: true, code: normalized, ...coupon }
  }
  return { valid: false }
}

export function getValidCoupons() {
  return Object.entries(VALID_COUPONS).map(([code, data]) => ({
    code,
    ...data,
  }))
}
