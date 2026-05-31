import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'
import QueEsXLK from './components/QueEsXLK'
import Proyecto from './components/Proyecto'
import Beneficios from './components/Beneficios'
import Tokenomics from './components/Tokenomics'
import Preventa from './components/Preventa'
import Roadmap from './components/Roadmap'
import MecanismoValor from './components/MecanismoValor'
import VentajasBlockchain from './components/VentajasBlockchain'
import FAQ from './components/FAQ'
import Comunidad from './components/Comunidad'
import PhantomTutorial from './components/PhantomTutorial'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen bg-deep-black overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Hero />
        <Proyecto />
        <QueEsXLK />
        <Beneficios />
        <Tokenomics />
        <Preventa />
        <Roadmap />
        <MecanismoValor />
        <VentajasBlockchain />
        <FAQ />
        <Comunidad />
        <PhantomTutorial />
        <Footer />
      </div>
    </div>
  )
}

export default App
