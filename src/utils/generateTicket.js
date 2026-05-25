export function generateTicketId(signature) {
  const year = new Date().getFullYear()
  const partialHash = (signature || '').slice(0, 4).toUpperCase()
  const random = Math.random().toString(16).slice(2, 6).toUpperCase()
  return `XLK-${year}-${partialHash}${random}`
}

export function createTicketData(result) {
  return {
    idCompra: generateTicketId(result.signature),
    fecha: new Date().toISOString(),
    walletComprador: result.wallet,
    walletTesorería: result.treasuryWallet,
    montoUSD: result.usdAmount,
    montoSOL: result.solAmount,
    xlkEstimados: result.xlkAmount,
    txHash: result.signature,
    estado: 'Confirmada',
  }
}
