import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What is XLK?',
    a: 'XLK (Xelvatika) is a next-generation decentralized cryptocurrency designed to power the Xelvatika ecosystem. It enables fast, secure, and scalable transactions while offering real-world utility through loyalty rewards, governance, and frictionless payments.',
  },
  {
    q: 'How can I buy XLK?',
    a: 'XLK can be purchased through decentralized exchanges (DEX) after the initial DEX offering. Connect your wallet (MetaMask, Trust Wallet, etc.), swap BNB/ETH for XLK, and the tokens will be credited to your wallet. Detailed guides will be available on our official channels.',
  },
  {
    q: 'Is liquidity locked?',
    a: 'Yes, the liquidity pool will be locked for 5 years using a time-lock smart contract. This ensures the safety of funds and prevents rug-pull scenarios. The lock contract address and verification will be publicly available.',
  },
  {
    q: 'Which blockchain does XLK use?',
    a: 'XLK is built as a multi-chain token, initially launching on BNB Smart Chain (BEP-20) and Ethereum (ERC-20). Cross-chain bridges are planned for future expansion to other major networks.',
  },
  {
    q: 'What is the roadmap?',
    a: 'Our roadmap spans 6 phases: Project Creation, Token Launch, Community Growth, Exchange Listings, Ecosystem Expansion, and Global Adoption. Each phase builds on the previous, bringing us closer to a fully decentralized ecosystem.',
  },
  {
    q: 'Is XLK audited?',
    a: 'Yes, our smart contracts undergo thorough audits by leading third-party security firms. Audit reports will be published on our website and GitHub for full transparency.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#070710] to-deep-black pointer-events-none" />
      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg">Everything you need to know about XLK</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-white/[0.02]"
              >
                <span className="text-white font-semibold text-lg pr-4">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-electric-blue flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-gray-400 leading-relaxed border-t border-dark-border pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
