import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Tokenomics from './components/Tokenomics'
import Roadmap from './components/Roadmap'
import Gallery from './components/Gallery'
import Stats from './components/Stats'
import FAQ from './components/FAQ'
import Community from './components/Community'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen bg-deep-black overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Hero />
        <About />
        <Features />
        <Tokenomics />
        <Roadmap />
        <Gallery />
        <Stats />
        <FAQ />
        <Community />
        <Footer />
      </div>
    </div>
  )
}

export default App
