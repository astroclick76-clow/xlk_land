import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Repeat2, Droplets, TrendingUp, Globe } from 'lucide-react'

const stats = [
  { icon: Users, label: 'Holders', value: 15000, suffix: '+' },
  { icon: Repeat2, label: 'Transactions', value: 250000, suffix: '+' },
  { icon: Droplets, label: 'Liquidity', value: 5, prefix: '$', suffix: 'M+' },
  { icon: TrendingUp, label: 'Market Cap', value: 50, prefix: '$', suffix: 'M+' },
  { icon: Globe, label: 'Community Members', value: 45000, suffix: '+' },
]

function Counter({ target, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section id="stats" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#060612] to-deep-black pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            XLK by the <span className="text-gradient">Numbers</span>
          </h2>
          <p className="text-gray-400 text-lg">Real-time ecosystem statistics</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center group hover:border-electric-blue/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-blue/20 to-neon-purple/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-6 h-6 text-electric-blue" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-white mb-1">
                <Counter target={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''} />
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
