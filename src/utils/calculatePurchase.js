export function calculatePurchase(usdAmount, couponInfo) {
  const originalAmount = usdAmount
  let discountPercent = 0
  let discountAmount = 0
  let finalAmount = usdAmount

  if (couponInfo?.valid) {
    discountPercent = couponInfo.discountPercent
    discountAmount = usdAmount * (discountPercent / 100)
    finalAmount = usdAmount - discountAmount
  }

  return {
    originalAmount,
    couponCode: couponInfo?.valid ? couponInfo.code : null,
    discountPercent,
    discountAmount,
    finalAmount,
    xlkAmount: usdAmount,
  }
}
