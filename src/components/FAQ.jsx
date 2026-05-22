import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: '¿Qué es XLK?',
    a: 'XLK (Xelvatika) es el token utilitario oficial del ecosistema turístico Xelvatika en Yucatán. Permite obtener descuentos exclusivos, cashback, acceso a eventos VIP, gobernanza, staking y operaciones dentro del mercado P2P interno. Cada XLK equivale a 1 USD de crédito interno dentro del ecosistema.',
  },
  {
    q: '¿Cómo puedo comprar XLK?',
    a: 'Puedes participar en nuestra preventa privada o preventa comunitaria con descuentos especiales. Conéctate con tu wallet (MetaMask, Trust Wallet), intercambia BNB/ETH por XLK y recibe tus tokens. Pronto estará disponible en exchanges descentralizados.',
  },
  {
    q: '¿La liquidez está bloqueada?',
    a: 'Sí, la liquidez estará bloqueada mediante un contrato inteligente time-lock. Esto garantiza la seguridad de los fondos y protege contra cualquier escenario de rug-pull. La dirección del contrato y la verificación serán públicas.',
  },
  {
    q: '¿En qué blockchain opera XLK?',
    a: 'XLK es un token multi-chain, lanzándose inicialmente en BNB Smart Chain (BEP-20) y Ethereum (ERC-20). Se planean puentes cross-chain para futura expansión a otras redes principales.',
  },
  {
    q: '¿Cuál es la hoja de ruta?',
    a: 'Nuestra hoja de ruta tiene 4 fases principales: Venta Privada y Preventa, Wallet XLK y Staking, Marketplace y Fidelización, y finalmente DAO y Expansión Global. Cada fase acerca a Xelvatika a un ecosistema completamente descentralizado.',
  },
  {
    q: '¿XLK está auditado?',
    a: 'Sí, nuestros contratos inteligentes son auditados por firmas de seguridad líderes. Los informes de auditoría se publicarán en nuestro sitio web y GitHub para total transparencia.',
  },
  {
    q: '¿Qué valor tiene cada XLK?',
    a: 'Cada XLK equivale a 1 USD de crédito interno dentro del ecosistema Xelvatika. Esto significa que puedes usar tus tokens para pagar servicios en el complejo turístico al mismo valor que el dólar estadounidense.',
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
            Preguntas <span className="text-gradient">Frecuentes</span>
          </h2>
          <p className="text-gray-400 text-lg">Todo lo que necesitas saber sobre XLK</p>
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
