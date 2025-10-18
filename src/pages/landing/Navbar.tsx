import { useEffect, useRef, useCallback, memo } from 'react'
import { MotionValue } from 'framer-motion'
import './css/landing.css'

interface NavbarProps {
    sections: string[]
    activeIndex: number
    scrollYProgress: MotionValue<number>
}

// Memo para evitar re-renders innecesarios
const Navbar = memo(function Navbar({ sections, activeIndex, scrollYProgress }: NavbarProps) {
    const lineRef = useRef<HTMLDivElement>(null)

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id.toLowerCase())
        element?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, [])

    useEffect(() => {
        // Throttle para reducir actualizaciones
        let rafId: number | null = null

        const updateRotation = (latest: number) => {
            if (rafId !== null) return

            rafId = requestAnimationFrame(() => {
                const rotation = latest * 360
                if (lineRef.current) {
                    // Uso willChange para mejor performance
                    lineRef.current.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`
                }
                rafId = null
            })
        }

        const unsubscribe = scrollYProgress.on('change', updateRotation)

        return () => {
            unsubscribe()
            if (rafId !== null) {
                cancelAnimationFrame(rafId)
            }
        }
    }, [scrollYProgress])

    return (
        <nav className='fixed top-0 w-full h-16 bg-white z-50 px-4 md:px-10 py-5 border-b border-black/5'>
            <div className='flex justify-between items-center w-full h-full'>
                <div className='flex items-center gap-2'>
                    <div className='relative w-6 h-6 border border-black/70 rounded-full'>
                        <div
                            ref={lineRef}
                            className='absolute top-1/2 left-1/2 w-px h-2 bg-black origin-bottom'
                            style={{
                                transform: 'translate(-50%, -100%) rotate(0deg)',
                                willChange: 'transform'
                            }}
                        />
                    </div>
                    <span className='font-[Roboto_Mono] text-xl font-medium'>
                        Chronos
                    </span>
                </div>

                <ul className='hidden md:flex gap-8'>
                    {sections.map((section, i) => (
                        <li
                            key={section}
                            className={`relative cursor-pointer transition-all duration-200 hover:scale-105 ${i === activeIndex ? "text-[#3f4150] font-semibold" : "text-[#666]"
                                }`}
                            onClick={() => scrollToSection(section)}
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
        </nav>
    )
})

export default Navbar