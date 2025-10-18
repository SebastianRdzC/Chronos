import { motion, useScroll } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import { Button } from '@/components/ui/button'
import Threads from '@/components/Threads'

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

export default function Landing() {

    const { scrollYProgress } = useScroll()
    const sections = ["Inicio", "Acerca-de", "Pricing", "Contact"]
    const [activeIndex, setActiveIndex] = useState(0)
    const sectionRefs = useRef<HTMLElement[]>([])

    useEffect(() => {
        if (sectionRefs.current.length === sections.length) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const idx = sectionRefs.current.findIndex(
                                (sec) => sec.id === entry.target.id
                            )
                            setActiveIndex(idx)
                        }
                    })
                },
                { threshold: 0.4 }
            )
            sectionRefs.current.forEach((section) => observer.observe(section))
            return () => observer.disconnect()
        }
    }, [sections.length])
    return (
        <>
            <Navbar sections={sections} activeIndex={activeIndex} scrollYProgress={scrollYProgress} />
            <section ref={(el) => { if (el && !sectionRefs.current.includes(el)) { sectionRefs.current.push(el) } }} id="inicio" className='min-h-screen w-full bg-white font-[Roboto_Mono] pt-20 md:pt-8' >
                <div className='flex flex-col w-full p-4 md:p-10 pb-8 md:pb-10'>
                    <div className='w-full flex flex-col md:flex-row'>
                        <div className='flex flex-col gap-2'>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                className='text-4xl md:text-6xl font-bold flex items-center gap-10 flex-1'
                            >
                                Presentamos Chronos
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                                className='text-base text-[#666]'
                            >
                                La herramienta definitiva para gestionar tu tiempo y aumentar tu productividad
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                            className='flex-1 flex justify-end items-end mt-4 md:mt-0'
                        >
                            <Button className='bg-black text-white cursor-pointer hover:scale-105'>
                                Quienes somos?
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                        className='relative w-full h-64 md:h-120 mt-5 rounded-lg border border-black bg-black'
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'
                        >
                            <div className='flex flex-col gap-8'>
                                <span className='text-white font-bold text-2xl md:text-3xl text-center'>
                                    Haz tu tiempo infinito
                                </span>
                                <Button className='mx-auto bg-white/10 border border-white/15 backdrop-blur-lg shadow-lg text-white cursor-pointer hover:scale-105'>
                                    Comienza ahora
                                </Button>
                            </div>
                        </motion.div>

                        <Threads
                            amplitude={1}
                            distance={0}
                            enableMouseInteraction={true}
                        />
                    </motion.div>
                </div>
            </section>

            <section ref={(el) => { if (el && !sectionRefs.current.includes(el)) { sectionRefs.current.push(el) } }}  id="acerca-de" className='min-h-screen w-full bg-white font-[Roboto_Mono] flex flex-col items-center'>
                <div className='w-full flex flex-col md:flex-row mt-6 md:mt-12'>
                    <div className='flex-1'>
                        <div className='flex flex-col gap-8 p-4 md:p-10'>
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className='font-bold text-4xl md:text-5xl'
                            >
                                ¿Qué es Chronos?
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                className='max-w-3xl text-[#444] flex flex-col gap-4 text-base pl-0 md:pl-8'
                            >
                                <p>
                                    Chronos es una aplicación de gestión del tiempo donde el diseño y la precisión se encuentran.
                                </p>

                                <p className='text-[#111]'>
                                    Un calendario reinventado:
                                </p>

                                <p>
                                    Líneas de tiempo dinámicas, rutinas visuales y transiciones fluidas que transforman la organización en una experiencia estética.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        className='flex-1 flex flex-col justify-center items-center gap-3 italic p-4 md:p-0'
                    >
                        <p>Eficiencia, ritmo</p>
                        <p>y control</p>
                        <p>expresados con elegancia</p>
                    </motion.div>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className='flex-1 w-full flex flex-col md:flex-row items-center justify-center gap-10 p-4 md:p-10'
                >
                    <motion.article
                        variants={fadeInUp}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className='flex flex-col gap-2 items-center border border-black/10 p-4 rounded-lg w-full md:w-auto'
                    >
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
                    </motion.article>

                    <motion.article
                        variants={fadeInUp}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className='flex flex-col gap-2 items-center border border-black/10 p-4 rounded-lg w-full md:w-auto'
                    >
                        <h3 className='font-semibold text-lg'>
                            Rutinas que fluyen contigo
                        </h3>
                        <div className='bg-white rounded-lg'>
                            <p className='p-2 text-[#444] text-sm'>
                                Crea rutinas inteligentes que se ajustan a tus horarios, pausas y hábitos.
                                Chronos te ayuda a mantener el equilibrio entre productividad y bienestar.
                            </p>
                        </div>
                    </motion.article>

                    <motion.article
                        variants={fadeInUp}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className='flex flex-col gap-2 items-center border border-black/10 p-4 rounded-lg w-full md:w-auto'
                    >
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
                    </motion.article>
                </motion.div>
            </section>

            <section ref={(el) => { if (el && !sectionRefs.current.includes(el)) { sectionRefs.current.push(el) } }} id="pricing" className='min-h-screen w-full bg-white font-[Roboto_Mono] flex items-center justify-center'>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className='text-5xl font-bold text-[#3f4150]'
                >
                    Pricing
                </motion.h2>
            </section>

            <section ref={(el) => { if (el && !sectionRefs.current.includes(el)) { sectionRefs.current.push(el) } }}  id="contact" className='min-h-screen w-full bg-black font-[Roboto_Mono] text-white flex items-center justify-center'>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className='text-5xl font-bold'
                >
                    Contact
                </motion.h2>
            </section>
        </>
    )

}