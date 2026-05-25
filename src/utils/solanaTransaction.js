import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js'

export const TREASURY_WALLET = '8DrjcuEzciWwaV5xP3qdYQdA8JqJ9mK8garm3rVPcrbz'

const SOLANA_RPC = 'https://api.mainnet-beta.solana.com'
const JUPITER_PRICE_API = 'https://api.jup.ag/price/v2?ids=SOL'

let connection

function getConnection() {
  if (!connection) {
    connection = new Connection(SOLANA_RPC, 'confirmed')
  }
  return connection
}

export async function getSOLPrice() {
  const response = await fetch(JUPITER_PRICE_API)
  const data = await response.json()
  const price = data.data?.SOL?.price
  if (!price) {
    throw new Error('No fue posible obtener el precio de SOL')
  }
  return price
}

export async function getUserBalance(publicKey) {
  const conn = getConnection()
  const balance = await conn.getBalance(new PublicKey(publicKey))
  return balance / LAMPORTS_PER_SOL
}

export async function buildTransferTransaction(senderPublicKey, solAmount) {
  const conn = getConnection()
  const sender = new PublicKey(senderPublicKey)
  const treasury = new PublicKey(TREASURY_WALLET)
  const lamports = Math.floor(solAmount * LAMPORTS_PER_SOL)

  const { blockhash } = await conn.getLatestBlockhash()

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender,
      toPubkey: treasury,
      lamports,
    })
  )
  transaction.recentBlockhash = blockhash
  transaction.feePayer = sender

  return { transaction, lamports }
}

export async function signAndSendTx(transaction) {
  const { signature } = await window.phantom.solana.signAndSendTransaction(
    transaction
  )
  return signature
}

export async function confirmTx(signature) {
  const conn = getConnection()
  await conn.confirmTransaction(signature, 'confirmed')
}
