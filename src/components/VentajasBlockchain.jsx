import { motion } from 'framer-motion'
import { Shield, Globe, Lock, FileSearch, Route, Cpu } from 'lucide-react'

const ventajas = [
  {
    icon: Shield,
    title: 'Transparencia Verificable',
    desc: 'Todas las transacciones son públicas y auditables en la blockchain, garantizando total transparencia.',
    gradient: 'from-electric-blue to-cyan-400',
  },
  {
    icon: Globe,
    title: 'Confianza Distribuida',
    desc: 'Sin autoridades centrales. La red se sostiene mediante consenso descentralizado entre nodos independientes.',
    gradient: 'from-neon-purple to-purple-500',
  },
  {
    icon: Lock,
    title: 'Seguridad',
    desc: 'Criptografía de última generación que protege cada transacción contra fraudes y manipulaciones.',
    gradient: 'from-bright-cyan to-electric-blue',
  },
  {
    icon: FileSearch,
    title: 'Sin Registros Contradictorios',
    desc: 'Un único registro inmutable compartido por todos los participantes elimina discrepancias.',
    gradient: 'from-green-400 to-bright-cyan',
  },
  {
    icon: Route,
    title: 'Trazabilidad Completa',
    desc: 'Cada transacción tiene un historial verificable desde su origen, asegurando procedencia y autenticidad.',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: Cpu,
    title: 'Automatización de Procesos',
    desc: 'Smart contracts que ejecutan acuerdos automáticamente sin intermediarios ni demoras.',
    gradient: 'from-pink-500 to-rose-500',
  },
]

export default function VentajasBlockchain() {
  return (
    <section id="blockchain" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#070710] to-deep-black pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Ventajas de <span className="text-gradient">Blockchain</span>
          </h2>
          <p className="text-gray-400 text-lg">Tecnología que transforma el turismo</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ventajas.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.gradient} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <v.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
