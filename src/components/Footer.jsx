import { motion } from 'framer-motion'

const links = [
  { label: 'Whitepaper', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms', href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-dark-border">
      <div className="absolute inset-0 bg-gradient-to-t from-deep-black to-deep-black/50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-electric-blue to-neon-purple flex items-center justify-center">
              <span className="text-lg font-black text-white">XLK</span>
            </div>
            <div>
              <span className="text-white font-bold text-lg">Xelvatika</span>
              <span className="text-electric-blue ml-1">(XLK)</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-electric-blue transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 pt-8 border-t border-dark-border text-center"
        >
          <p className="text-gray-500 text-sm">
            &copy; 2026 Xelvatika (XLK). All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
