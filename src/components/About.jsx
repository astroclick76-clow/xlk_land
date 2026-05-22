import { motion } from 'framer-motion'
import { Shield, Zap, Globe, Layers, Lock, Cpu } from 'lucide-react'

const highlights = [
  {
    icon: Zap,
    title: 'What is XLK?',
    desc: 'XLK is a next-generation decentralized cryptocurrency designed to power the Xelvatika ecosystem, enabling fast, secure, and scalable transactions for a global community.',
  },
  {
    icon: Shield,
    title: 'Secure & Scalable',
    desc: 'Built on cutting-edge blockchain technology, XLK offers enterprise-grade security with sharding for unlimited scalability, ensuring your assets are always safe.',
  },
  {
    icon: Globe,
    title: 'Real-World Utility',
    desc: 'XLK bridges digital and physical ecosystems, enabling frictionless payments, loyalty rewards, and decentralized governance across the Xelvatika network.',
  },
  {
    icon: Layers,
    title: 'Blockchain Technology',
    desc: 'Leveraging a hybrid Proof-of-Stake and Byzantine Fault Tolerance consensus, XLK achieves instant finality with minimal energy consumption.',
  },
  {
    icon: Lock,
    title: 'Security First',
    desc: 'Military-grade encryption, quantum-resistant signatures, and audited smart contracts ensure the highest level of asset protection.',
  },
  {
    icon: Cpu,
    title: 'Future-Ready Infrastructure',
    desc: 'Cross-chain interoperability, Layer-2 solutions, and AI-driven optimization make XLK ready for the next evolution of Web3.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#070712] to-deep-black pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">XLK</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-electric-blue to-neon-purple mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-blue/20 to-neon-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-electric-blue" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
