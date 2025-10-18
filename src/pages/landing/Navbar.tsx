import { motion, useTransform, MotionValue } from 'framer-motion'
import { useCallback } from 'react'
import './css/landing.css'
export default function Navbar({ sections, activeIndex, scrollYProgress }: { sections: string[], activeIndex: number, scrollYProgress: MotionValue<number> }) {
    const scrollToSection = useCallback((id: string) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" })
    }, [])
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
    return (
        <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='fixed top-0 w-full h-16 bg-white z-50 px-4 md:px-10 py-5'
        >
            <div className='flex justify-between items-center w-full h-full'>
                <div className='flex items-center gap-2'>
                    <div className='relative w-6 h-6 border border-black/70 rounded-full'>
                        <motion.div
                            className='absolute top-1/2 left-1/2 w-px h-2 bg-black origin-bottom -translate-x-1/2 -translate-y-full will-change-transform'
                            style={{ rotate }}
                        />
                    </div>
                    <span className='font-[Roboto_Mono] text-xl font-medium'>
                        Chronos
                    </span>
                </div>

                <ul className='hidden md:flex gap-8' >
                    {sections.map((section, i) => (
                        <li
                            key={section}
                            className={`relative cursor-pointer transition-all duration-200 hover:scale-105 ${i === activeIndex ? "text-[#3f4150] font-semibold" : "text-[#666]"
                                }`}
                            onClick={() =>
                                scrollToSection(section)}
                        >
                            {section}

                            <div
                                className={`absolute left-0 right-0 -bottom-1 h-[3px] rounded-full transition-all duration-300 ${i === activeIndex ? "bg-[#3f4150] opacity-100" : "opacity-0"
                                    }`}
                            />
                        </li>
                    ))}

                </ul>
            </div>
        </motion.nav>
    )
}