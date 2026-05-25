import { useState, useCallback, useMemo } from 'react'
import {
  getSOLPrice,
  getUserBalance,
  buildTransferTransaction,
  signAndSendTx,
  confirmTx,
} from '../utils/solanaTransaction'
import { createTicketData } from '../utils/generateTicket'
import { savePurchase } from '../utils/localStorage'
import { validateCoupon } from '../utils/couponValidation'
import { calculatePurchase } from '../utils/calculatePurchase'

export default function usePurchaseXLK() {
  const [step, setStep] = useState('idle')
  const [amount, setAmount] = useState('')
  const [ticket, setTicket] = useState(null)
  const [error, setError] = useState(null)
  const [solPrice, setSolPrice] = useState(null)
  const [balance, setBalance] = useState(null)

  const [couponInput, setCouponInput] = useState('')
  const [couponInfo, setCouponInfo] = useState(null)
  const [couponError, setCouponError] = useState(null)
  const [couponApplied, setCouponApplied] = useState(false)

  const usdNum = useMemo(() => {
    const num = parseFloat(amount)
    return isNaN(num) || num < 0 ? 0 : num
  }, [amount])

  const purchaseCalc = useMemo(
    () => calculatePurchase(usdNum, couponInfo),
    [usdNum, couponInfo]
  )

  const applyCoupon = useCallback(() => {
    const result = validateCoupon(couponInput)
    if (result.valid) {
      setCouponInfo(result)
      setCouponApplied(true)
      setCouponError(null)
    } else {
      setCouponError('Código promocional inválido')
      setCouponInfo(null)
      setCouponApplied(false)
    }
  }, [couponInput])

  const removeCoupon = useCallback(() => {
    setCouponInput('')
    setCouponInfo(null)
    setCouponApplied(false)
    setCouponError(null)
  }, [])

  const startPurchase = useCallback(
    async (publicKey) => {
      if (!amount || isNaN(usdNum) || usdNum <= 0) {
        setError('Ingresa un monto válido')
        return
      }

      if (usdNum < 10) {
        setError('El monto mínimo de compra es 10 USD')
        return
      }

      setStep('preparing')
      setError(null)

      try {
        const solPrice = await getSOLPrice()
        const solAmount = purchaseCalc.finalAmount / solPrice

        const balance = await getUserBalance(publicKey)
        const lamportsNeeded = Math.floor(solAmount * 1e9)
        if (balance * 1e9 < lamportsNeeded + 5000) {
          throw new Error('INSUFFICIENT_FUNDS')
        }

        const { transaction, lamports } = await buildTransferTransaction(
          publicKey,
          solAmount
        )

        setStep('awaiting_confirmation')

        const signature = await signAndSendTx(transaction)

        setStep('sending')

        await confirmTx(signature)

        const txData = {
          signature,
          solAmount: lamports / 1e9,
          solPrice,
          usdAmount: purchaseCalc.originalAmount,
          xlkAmount: purchaseCalc.xlkAmount,
          finalUsdAmount: purchaseCalc.finalAmount,
          treasuryWallet: '8DrjcuEzciWwaV5xP3qdYQdA8JqJ9mK8garm3rVPcrbz',
          wallet: publicKey,
          ...(purchaseCalc.couponCode && {
            couponCode: purchaseCalc.couponCode,
            discountPercent: purchaseCalc.discountPercent,
            discountAmount: purchaseCalc.discountAmount,
          }),
        }

        const ticketData = createTicketData(txData)
        savePurchase(ticketData)

        setTicket(ticketData)
        setStep('success')
      } catch (err) {
        if (err.message === 'INSUFFICIENT_FUNDS') {
          setError('Fondos insuficientes para completar la compra')
        } else if (err.code === 4001) {
          setError('Transacción cancelada por el usuario')
        } else {
          console.error('Purchase error:', err)
          setError('No fue posible procesar la operación. Intente nuevamente.')
        }
        setStep('error')
      }
    },
    [amount, usdNum, purchaseCalc]
  )

  const reset = useCallback(() => {
    setStep('idle')
    setAmount('')
    setTicket(null)
    setError(null)
    setSolPrice(null)
    setBalance(null)
    setCouponInput('')
    setCouponInfo(null)
    setCouponError(null)
    setCouponApplied(false)
  }, [])

  return {
    step,
    amount,
    setAmount,
    usdNum,
    purchaseCalc,
    ticket,
    error,
    solPrice,
    balance,
    couponInput,
    setCouponInput,
    couponError,
    couponApplied,
    applyCoupon,
    removeCoupon,
    startPurchase,
    reset,
  }
}
