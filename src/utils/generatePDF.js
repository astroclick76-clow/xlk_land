import { jsPDF } from 'jspdf'
import QRCode from 'qrcode'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export async function generatePDF(ticket) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()

  const qrTxData = await QRCode.toDataURL(ticket.txHash, {
    width: 120,
    margin: 1,
  })
  const qrSolscanData = await QRCode.toDataURL(
    `https://solscan.io/tx/${ticket.txHash}`,
    { width: 120, margin: 1 }
  )

  doc.setFillColor(5, 5, 5)
  doc.rect(0, 0, pageW, doc.internal.pageSize.getHeight(), 'F')

  doc.setFillColor(10, 10, 15)
  doc.rect(0, 0, pageW, 50, 'F')

  doc.setFontSize(22)
  doc.setTextColor(0, 212, 255)
  doc.setFont('helvetica', 'bold')
  doc.text('XLK', 20, 24)
  doc.setFontSize(10)
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'normal')
  doc.text('Comprobante de Participación Preventa XLK', 20, 34)

  const ticketId = ticket.idCompra
  doc.setFontSize(9)
  doc.setTextColor(123, 46, 255)
  doc.text(`ID: ${ticketId}`, pageW - 20, 20, { align: 'right' })
  doc.setTextColor(150, 150, 150)
  doc.text(`Fecha: ${formatDate(ticket.fecha)}`, pageW - 20, 30, { align: 'right' })
  doc.text('Estado: Confirmada', pageW - 20, 40, { align: 'right' })

  let y = 64

  doc.setDrawColor(0, 212, 255, 0.2)
  doc.line(20, y, pageW - 20, y)
  y += 8

  doc.setFontSize(10)
  doc.setTextColor(150, 150, 150)
  doc.setFont('helvetica', 'normal')
  const fields = [
    { label: 'ID de Compra', value: ticket.idCompra },
    { label: 'Wallet Comprador', value: ticket.walletComprador },
    { label: 'Wallet Tesorería', value: ticket.walletTesorería },
    { label: 'Monto USD', value: `$${ticket.montoUSD.toLocaleString()} USD` },
    { label: 'Monto SOL', value: `${ticket.montoSOL.toFixed(6)} SOL` },
    { label: 'XLK Estimados', value: `${ticket.xlkEstimados.toLocaleString()} XLK` },
    ...(ticket.couponCode
      ? [
          { label: 'Cupón', value: ticket.couponCode },
          { label: 'Descuento', value: `${ticket.discountPercent}%` },
          { label: 'Ahorro', value: `$${ticket.discountAmount.toLocaleString()} USD` },
          { label: 'Pago realizado', value: `$${ticket.montoUSD.toLocaleString()} USD` },
          { label: 'XLK asignados', value: `${ticket.xlkEstimados.toLocaleString()} XLK` },
        ]
      : []),
    { label: 'Hash Blockchain', value: ticket.txHash },
  ]

  fields.forEach((f) => {
    doc.setTextColor(150, 150, 150)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text(f.label, 20, y)
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    const display =
      f.value.length > 50 ? `${f.value.slice(0, 20)}...${f.value.slice(-10)}` : f.value
    doc.text(display, pageW - 20, y, { align: 'right' })
    y += 7
  })

  y += 6
  doc.setDrawColor(0, 212, 255, 0.15)
  doc.line(20, y, pageW - 20, y)
  y += 10

  const qrSize = 36
  const qrY = y

  doc.setFontSize(9)
  doc.setTextColor(150, 150, 150)
  doc.setFont('helvetica', 'normal')
  doc.text('Código QR del Hash', 20, qrY - 3)
  doc.addImage(qrTxData, 'PNG', 20, qrY, qrSize, qrSize)

  doc.text('Código QR Solscan', pageW - 20 - qrSize, qrY - 3)
  doc.addImage(qrSolscanData, 'PNG', pageW - 20 - qrSize, qrY, qrSize, qrSize)

  y += qrSize + 18

  doc.setDrawColor(0, 212, 255, 0.2)
  doc.line(20, y, pageW - 20, y)
  y += 8

  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'normal')
  doc.text(
    'La asignación y entrega de XLK será gestionada según el proceso oficial de la preventa.',
    20,
    y
  )
  y += 5
  doc.text('Conserve este comprobante como respaldo de su operación.', 20, y)
  y += 5
  doc.setTextColor(123, 46, 255)
  doc.text(`Ver en Solscan: https://solscan.io/tx/${ticket.txHash}`, 20, y)

  return doc.output('blob')
}
