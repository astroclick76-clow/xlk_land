import { motion } from 'framer-motion'
import { Zap, Shield, Users, Globe, DollarSign, Rocket } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Fast Transactions',
    desc: 'Operaciones rápidas con confirmación en segundos.',
    gradient: 'from-electric-blue to-cyan-400',
  },
  {
    icon: Shield,
    title: 'Secure Ecosystem',
    desc: 'Seguridad avanzada con cifrado de grado militar.',
    gradient: 'from-neon-purple to-purple-500',
  },
  {
    icon: Users,
    title: 'Community Driven',
    desc: 'Gobernanza descentralizada impulsada por la comunidad.',
    gradient: 'from-electric-blue to-neon-purple',
  },
  {
    icon: Globe,
    title: 'Global Access',
    desc: 'Acceso mundial sin fronteras ni restricciones.',
    gradient: 'from-bright-cyan to-electric-blue',
  },
  {
    icon: DollarSign,
    title: 'Low Fees',
    desc: 'Comisiones reducidas para microtransacciones.',
    gradient: 'from-green-400 to-bright-cyan',
  },
  {
    icon: Rocket,
    title: 'Future Ready',
    desc: 'Preparada para la próxima generación de Web3.',
    gradient: 'from-neon-purple to-pink-500',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#080815] to-deep-black pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Core <span className="text-gradient">Features</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built for performance, security, and mass adoption.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="glass-card rounded-2xl p-8 h-full cursor-default relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-3 mb-5 group-hover:scale-110 transition-transform duration-300 neon-glow-blue`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-0.5 bg-gradient-to-r ${feature.gradient} transition-all duration-500 rounded-full`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
