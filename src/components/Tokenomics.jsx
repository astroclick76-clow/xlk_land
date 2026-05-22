import { motion } from 'framer-motion'

const TOKENOMICS = {
  totalSupply: '1,000,000,000',
  symbol: 'XLK',
  distribution: [
    { label: 'Liquidity', value: 35, color: 'bg-electric-blue' },
    { label: 'Community Rewards', value: 25, color: 'bg-neon-purple' },
    { label: 'Development', value: 15, color: 'bg-bright-cyan' },
    { label: 'Marketing', value: 12, color: 'bg-blue-500' },
    { label: 'Burn', value: 8, color: 'bg-purple-500' },
    { label: 'Team', value: 5, color: 'bg-gray-500' },
  ],
}

const quickStats = [
  { label: 'Total Supply', value: '1B XLK' },
  { label: 'Liquidity Locked', value: '5 Years' },
  { label: 'Contract Type', value: 'BEP-20 / ERC-20' },
  { label: 'Tax Buy/Sell', value: '0% / 0%' },
]

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#060610] to-deep-black pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Tokenomics</span>
          </h2>
          <p className="text-gray-400 text-lg">Transparent & sustainable token distribution</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Distribution</h3>
            <div className="space-y-5">
              {TOKENOMICS.distribution.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 font-medium">{item.label}</span>
                    <span className="text-white font-bold">{item.value}%</span>
                  </div>
                  <div className="w-full h-3 bg-dark-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                      className={`h-full rounded-full ${item.color} relative`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            {quickStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-xl p-5 flex justify-between items-center group hover:border-electric-blue/30 transition-colors"
              >
                <span className="text-gray-400">{stat.label}</span>
                <span className="text-white font-bold text-lg group-hover:text-electric-blue transition-colors">
                  {stat.value}
                </span>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glass rounded-2xl p-8 mt-4 text-center"
            >
              <p className="text-gray-400 mb-2">Total Supply</p>
              <p className="text-3xl md:text-4xl font-black text-gradient mb-2">
                {TOKENOMICS.totalSupply}
              </p>
              <p className="text-gray-500 text-sm">{TOKENOMICS.symbol}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
