import { useState, useEffect, useRef, useMemo } from 'react'
import Navbar from './Navbar'
import { Button } from '@/components/ui/button'
import Threads from '@/components/Threads'
import './css/landing.css'

export default function Landing() {
    const sections = useMemo(() => ["Inicio", "Acerca-de", "Pricing", "Contact"], [])
    const [activeIndex, setActiveIndex] = useState(0)
    const [scrollProgress, setScrollProgress] = useState(0)
    const sectionRefs = useRef<(HTMLElement | null)[]>([])

    // Optimizo el manejo de refs
    const setSectionRef = (index: number) => (el: HTMLElement | null) => {
        sectionRefs.current[index] = el
    }

    // Scroll progress para el navbar
    useEffect(() => {
        let ticking = false
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
                    const progress = window.scrollY / scrollHeight
                    setScrollProgress(progress)
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Intersection Observer para secciones activas
    useEffect(() => {
        const validSections = sectionRefs.current.filter(Boolean) as HTMLElement[]
        
        if (validSections.length !== sections.length) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = validSections.findIndex(
                            (sec) => sec.id === entry.target.id
                        )
                        if (idx !== -1) setActiveIndex(idx)
                    }
                })
            },
            { 
                threshold: 0.4,
                rootMargin: '0px'
            }
        )
        
        validSections.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [sections])

    // Intersection Observer para animaciones de entrada
    useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in')
                }
            })
        }, observerOptions)

        // Observar todos los elementos animables
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <>
            <Navbar sections={sections} activeIndex={activeIndex} scrollProgress={scrollProgress} />
            
            {/* HERO SECTION */}
            <section 
                ref={setSectionRef(0)} 
                id="inicio" 
                className='min-h-screen w-full bg-white font-[Roboto_Mono] pt-20 md:pt-8'
            >
                <div className='flex flex-col w-full p-4 md:p-10 pb-8 md:pb-10'>
                    <div className='w-full flex flex-col md:flex-row'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-4xl md:text-6xl font-bold flex items-center gap-10 flex-1 fade-in-up' style={{ animationDelay: '0.1s' }}>
                                Presentamos Chronos
                            </h1>

                            <p className='text-base text-[#666] fade-in-up' style={{ animationDelay: '0.2s' }}>
                                La herramienta definitiva para gestionar tu tiempo y aumentar tu productividad
                            </p>
                        </div>

                        <div className='flex-1 flex justify-end items-end mt-4 md:mt-0 fade-in' style={{ animationDelay: '0.3s' }}>
                            <Button className='bg-black text-white cursor-pointer hover:scale-105 transition-transform'>
                                Quienes somos?
                            </Button>
                        </div>
                    </div>

                    <div className='relative w-full h-64 md:h-120 mt-5 rounded-lg border border-black bg-black overflow-hidden fade-in-up' style={{ animationDelay: '0.4s' }}>
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 fade-in' style={{ animationDelay: '0.8s' }}>
                            <div className='flex flex-col gap-8'>
                                <span className='text-white font-bold text-2xl md:text-3xl text-center'>
                                    Haz tu tiempo infinito
                                </span>
                                <Button className='mx-auto bg-white/10 border border-white/15 backdrop-blur-lg shadow-lg text-white cursor-pointer hover:scale-105 transition-transform'>
                                    Comienza ahora
                                </Button>
                            </div>
                        </div>

                        <Threads
                            amplitude={0.8}
                            distance={0}
                            enableMouseInteraction={false}
                        />
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section 
                ref={setSectionRef(1)} 
                id="acerca-de" 
                className='min-h-screen w-full bg-white font-[Roboto_Mono] flex flex-col items-center'
            >
                <div className='w-full flex flex-col md:flex-row mt-6 md:mt-12'>
                    <div className='flex-1'>
                        <div className='flex flex-col gap-8 p-4 md:p-10'>
                            <h2 className='font-bold text-4xl md:text-5xl animate-on-scroll'>
                                ¿Qué es Chronos?
                            </h2>

                            <div className='max-w-3xl text-[#444] flex flex-col gap-4 text-base pl-0 md:pl-8 animate-on-scroll' style={{ animationDelay: '0.1s' }}>
                                <p>
                                    Chronos es una aplicación de gestión del tiempo donde el diseño y la precisión se encuentran.
                                </p>

                                <p className='text-[#111]'>
                                    Un calendario reinventado:
                                </p>

                                <p>
                                    Líneas de tiempo dinámicas, rutinas visuales y transiciones fluidas que transforman la organización en una experiencia estética.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='flex-1 flex flex-col justify-center items-center gap-3 italic p-4 md:p-0 animate-on-scroll' style={{ animationDelay: '0.2s' }}>
                        <p>Eficiencia, ritmo</p>
                        <p>y control</p>
                        <p>expresados con elegancia</p>
                    </div>
                </div>

                <div className='flex-1 w-full flex flex-col md:flex-row items-center justify-center gap-10 p-4 md:p-10'>
                    <article className='flex flex-col gap-2 items-center border border-black/10 p-4 rounded-lg w-full md:w-auto animate-on-scroll'>
                        <h3 className='font-semibold text-lg'>
                            Gestión del tiempo con estilo
                        </h3>
                        <div className='bg-white rounded-lg'>
                            <p className='p-2 text-[#444] text-sm'>
                                Con Chronos, organizar tus días se vuelve una experiencia visual.
                                Planifica, arrastra y ajusta tus tareas sobre líneas de tiempo animadas
                                que se adaptan a tu ritmo y estilo.
                            </p>
                        </div>
                    </article>

                    <article className='flex flex-col gap-2 items-center border border-black/10 p-4 rounded-lg w-full md:w-auto animate-on-scroll' style={{ animationDelay: '0.1s' }}>
                        <h3 className='font-semibold text-lg'>
                            Rutinas que fluyen contigo
                        </h3>
                        <div className='bg-white rounded-lg'>
                            <p className='p-2 text-[#444] text-sm'>
                                Crea rutinas inteligentes que se ajustan a tus horarios, pausas y hábitos.
                                Chronos te ayuda a mantener el equilibrio entre productividad y bienestar.
                            </p>
                        </div>
                    </article>

                    <article className='flex flex-col gap-2 items-center border border-black/10 p-4 rounded-lg w-full md:w-auto animate-on-scroll' style={{ animationDelay: '0.2s' }}>
                        <h3 className='font-semibold text-lg'>
                            Recordatorios que inspiran acción
                        </h3>
                        <div className='bg-white rounded-lg'>
                            <p className='p-2 text-[#444] text-sm'>
                                Olvídate del estrés de los pendientes.
                                Chronos te avisa con precisión y elegancia cada vez que una tarea se acerca,
                                ayudándote a mantener el control sin perder la calma.
                            </p>
                        </div>
                    </article>
                </div>
            </section>

            {/* PRICING SECTION */}
            <section 
                ref={setSectionRef(2)} 
                id="pricing" 
                className='min-h-screen w-full bg-white font-[Roboto_Mono] flex items-center justify-center'
            >
                <h2 className='text-5xl font-bold text-[#3f4150] animate-on-scroll'>
                    Pricing
                </h2>
            </section>

            {/* CONTACT SECTION */}
            <section 
                ref={setSectionRef(3)} 
                id="contact" 
                className='min-h-screen w-full bg-black font-[Roboto_Mono] text-white flex items-center justify-center'
            >
                <h2 className='text-5xl font-bold animate-on-scroll'>
                    Contact
                </h2>
            </section>
        </>
    )
}