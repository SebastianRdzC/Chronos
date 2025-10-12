import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { Button } from './components/ui/button'
import Particles from './components/Particles'
import { Clock3, Star } from 'lucide-react'

function App() {
  const { scrollYProgress } = useScroll()
  const sections = ["Home", "Features", "Pricing", "Contact"]

  // --- NUEVO: estado para el indicador de la sección activa
  const [activeIndex, setActiveIndex] = useState(0)

  // --- NUEVO: detecta el progreso del scroll y cambia el índice activo
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(sections.length - 1, Math.floor(v * sections.length))
    setActiveIndex(idx)
  })

  return (
    <>
      <nav className='w-screen h-16 fixed top-0 p-5 px-10 bg-white z-50'>
        <div className='flex justify-between items-center w-full h-full'>
          <span className='font-[Roboto_Mono] font-md text-xl'>
            Chronos
          </span>

          <ul className='flex gap-8'>
            {sections.map((section, i) => (
              <li
                key={section}
                className='cursor-pointer hover:scale-105 transition-all duration-200 relative'
                onClick={() =>
                  document
                    .getElementById(section.toLowerCase())
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {section}

                {/* --- NUEVO: indicador animado debajo del link activo */}
                {i === activeIndex && (
                  <motion.div
                    layoutId="indicator"
                    className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[#3f4150] rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* --- Tus secciones originales más los IDs (necesarios para scroll suave) --- */}
      <div id="home" className='min-h-screen w-screen bg-[#fff] font-[Roboto_Mono] mt-8'>
        <div className='flex flex-col h-screen w-full p-10 pr-10'>
          <div className='w-full flex'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-6xl font-bold flex items-center gap-10 flex-1'>
                Presentamos Chronos
                {/* La shit de aca es para ver como queda mejor a futuro */}
                {/* <span className='text-[#48182f]'>
                  Chronos
                </span> */}
              </h1>

              <p className='text-[#666] text-md'>
                La herramienta definitiva para gestionar tu tiempo y aumentar tu productividad
              </p>
            </div>

            <div className='w-full h-full flex flex-1'>
              <div className='w-10 h-full flex-1 flex justify-end items-end'>
                <Button className='bg-black text-white cursor-pointer hover:scale-105'>
                  Nosotros
                </Button>
              </div>
            </div>
          </div>

          <div className='border rounded-lg border-black bg-black w-full h-120 mt-5 relative'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
              <div className='flex flex-col gap-4'>
                <span className='text-white font-bold text-3xl'>
                  Haz tu tiempo infinito
                </span>
                <Button className='bg-white/10 border border-white/15 backdrop-blur-lg shadow-lg 
                 text-white cursor-pointer hover:scale-105 mx-auto'>
                  Comienza ahora
                </Button>
              </div>
            </div>

            <Particles
              particleColors={['#ffffff', '#ffffff']}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
            />

          </div>
        </div>
      </div>

      {/* --- Secciones siguientes para probar el scroll spy --- */}
      <div id="features" className='min-h-screen w-screen bg-gray-100 font-[Roboto_Mono] flex items-center justify-center'>
        <h1 className='text-5xl font-bold text-[#3f4150]'>Features</h1>
      </div>

      <div id="pricing" className='min-h-screen w-screen bg-gray-200 font-[Roboto_Mono] flex items-center justify-center'>
        <h1 className='text-5xl font-bold text-[#3f4150]'>Pricing</h1>
      </div>

      <div id="contact" className='min-h-screen w-screen bg-black font-[Roboto_Mono] text-white flex items-center justify-center'>
        <h1 className='text-5xl font-bold'>Contact</h1>
      </div>
    </>
  )
}

export default App
