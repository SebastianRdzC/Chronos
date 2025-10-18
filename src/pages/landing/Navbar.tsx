import { useEffect, useRef, useCallback, memo } from 'react'
import './css/landing.css'

interface NavbarProps {
    sections: string[]
    activeIndex: number
    scrollProgress: number
}

const Navbar = memo(function Navbar({ sections, activeIndex, scrollProgress }: NavbarProps) {
    const lineRef = useRef<HTMLDivElement>(null)
    
    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id.toLowerCase())
        element?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, [])

    useEffect(() => {
        if (lineRef.current) {
            const rotation = scrollProgress * 360
            lineRef.current.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`
        }
    }, [scrollProgress])

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
                            className={`relative cursor-pointer transition-all duration-200 hover:scale-105 ${
                                i === activeIndex ? "text-[#3f4150] font-semibold" : "text-[#666]"
                            }`}
                            onClick={() => scrollToSection(section)}
                        >
                            {section}
                            <div
                                className={`absolute left-0 right-0 -bottom-1 h-[3px] rounded-full transition-all duration-300 ${
                                    i === activeIndex ? "bg-[#3f4150] opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                                }`}
                                style={{ transformOrigin: 'center' }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
})

export default Navbar