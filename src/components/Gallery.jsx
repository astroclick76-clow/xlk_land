import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const images = import.meta.glob('/public/assets/images/*.png', { eager: true, query: '?url' })

export default function Gallery() {
  const [imageList, setImageList] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const keys = Object.keys(images)
    const urls = keys.map(k => images[k].default || images[k])
    setImageList(urls)
  }, [])

  const next = () => {
    if (selected === null) return
    setSelected((selected + 1) % imageList.length)
  }
  const prev = () => {
    if (selected === null) return
    setSelected((selected - 1 + imageList.length) % imageList.length)
  }

  if (imageList.length === 0) return null

  return (
    <section id="gallery" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#080812] to-deep-black pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-gray-400 text-lg">Explore the Xelvatika ecosystem</p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {imageList.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => setSelected(i)}
            >
              <div className="relative rounded-2xl overflow-hidden border border-dark-border group-hover:border-electric-blue/40 transition-all duration-500">
                <img
                  src={src}
                  alt={`XLK Gallery ${i + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-deep-black/95 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setSelected(null) }}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
            >
              <ChevronRight size={40} />
            </button>

            <motion.img
              key={selected}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={imageList[selected]}
              alt="Gallery full view"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
