import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const StartedNav = () => {

    const [active, setActive] = useState('login')
    const [hovered, setHovered] = useState(false)
    const [docHovered, setdocHovered] = useState(false)
    const [supportHovered, setSupportHovered] = useState(false)
    const [pressHovered, setPressHovered] = useState(false)
    const [releasesHovered, setReleasesHovered] = useState(false)
    const [changeLogHovered, setChangeLogHovered] = useState(false)

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function hover() {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setHovered(true)
    }

    function hoverleave() {
        timeoutRef.current = setTimeout(() => {
            setHovered(false)
        }, 200)
    }

    const [displayText, setDisplayText] = useState('')
    const [currentWord, setCurrentWord] = useState(0)
    const [isTyping, setIsTyping] = useState(true)

    const words = ['Learn', 'Practice', 'Gr0w']

    useEffect(() => {
        let timeout

        if (isTyping) {
            if (displayText !== words[currentWord]) {
                timeout = setTimeout(() => {
                    setDisplayText(words[currentWord].slice(0, displayText.length + 1))
                }, 150)
            } else timeout = setTimeout(() => setIsTyping(false), 1500)
        } else {
            if (displayText !== '') {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1))
                }, 80)
            } else {
                setIsTyping(true)
                setCurrentWord((currentWord + 1) % words.length)
            }
        }
        return () => clearTimeout(timeout)
    }, [displayText, currentWord, isTyping])

    const renderWord = () => {
        switch (displayText) {

            case "Learn":
                return (
                    <>
                        Le <span className="text-blue-400"> a </span> rn
                    </>);
            case "Practice":
                return (
                    <>
                        Pra <span className="text-yellow-400"> c </span> tice
                    </>);

            case "Gr0w":
                return (
                    <>
                        Gr <span className="text-green-400"> 0 </span> w
                    </>);
            default: return displayText;
        }
    };


    return (
        <>
            <nav className="relative z-50">
                <div className="w-full flex h-14 items-center justify-between px-4 bg-black " >
                    <div className="flex justify-center items-center w-auto">
                        <img src="vectorink-vectorizer-result.svg" alt="Phluxo Logo" className="h-9 w-9 ml-4" />
                        <div className="orbitron-font font-bold text-xl p-1 bg-gradient-to-t from-black via-gray-300 via-gray-100 to-white bg-clip-text text-transparent">PHLUX0</div>
                    </div>
                    <div className="w-auto text-[18px] flex items-center gap-4  font-semibold bg-gradient-to-t from-black via-gray-300 via-gray-100 to-white text-transparent bg-clip-text rajdhani-font ">
                        <div className="hover:bg-gray-700 rounded-lg bg-opacity-20 px-4 py-0.5 hover:text-white hover:bg-white/10 transition-all duration-200">Blog</div>
                        <div className="hover:bg-gray-700 rounded-lg bg-opacity-20 px-4 py-0.5 hover:bg-white/10 hover:text-white transition-all duration-200">Plateforms</div>
                        <div className="flex flex-column justify-between items-center gap-0.5 hover:bg-white/10 rounded-lg bg-opacity-20 px-4 py-0.5 hover:text-white transition-all duration-200 cursor-pointCustom" onMouseEnter={hover} onMouseLeave={hoverleave}>
                            <p>Resources</p>
                            <img src="dropdown-arrow-svgrepo-com.svg " alt="" className={`h-8 w-7 invert transition-transform duration-300 ease-in-out ${hovered ? 'rotate-180' : ''}`} />
                        </div>
                        <div className="hover:bg-gray-700 rounded-lg bg-opacity-20 px-4 py-0.5 hover:bg-white/10 hover:text-white transition-all duration-200">Pricing</div>
                        <div className="hover:bg-gray-700 rounded-lg bg-opacity-20 px-4 py-0.5 hover:bg-white/10 hover:text-white transition-all duration-200">Team</div>
                    </div>
                    <div className='box flex justify-center items-center w-auto gap-2 mr-10'>
                        <button onMouseEnter={() => setActive('signup')} style={{ backgroundColor: (active === 'signup' ? 'white' : 'transparent'), color: (active === 'signup' ? 'green' : 'white') }} className="px-5 py-2 text-sm rounded-2xl font-semibold hover:text-green-400 transition-all duration-500 cursor-pointCustom">Sign Up</button>
                        <button onMouseEnter={() => setActive('login')} style={{ backgroundColor: (active === 'login' ? 'white' : 'transparent'), color: (active === 'login' ? 'black' : 'white') }} className="px-5 py-2 text-sm rounded-2xl font-semibold text-white bg-transparent transition-all duration-500 transition-colors duration-300 relative z-10 cursor-pointCustom">Login</button>
                    </div>
                </div>
                <div onMouseEnter={hover} onMouseLeave={hoverleave} className={`pt-5 absolute w-full bg-black top-full -mt-[10px] left-0 overflow-hidden transition-all duration-500 ease-in-out shadow-2xl ${hovered ? 'max-h-[350px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`} >
                    <div className="flex">
                        <div className="ml-8 flex-col items-center gap-4 p-4 text-white max-w-10xl min-w-[350px] transition-all duration-500 ease-in-out delay-100" >
                            <div className="font-monserrat text-lg text-gray-300 mb-3">Everything you need to</div>
                            <div className="font-gravitas text-xl md:text-3xl lg:text-5xl flex items-center">
                                {renderWord()}
                                <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="ml-2 inline-block w-1.5 h-11 md:h-16 lg:h-14 bg-purple-400" />
                            </div>
                        </div>
                        <div className={`pl-28 flex flex-col items-center gap-4 p-4 text-white max-w-5xl transition-all duration-500 ease-in-out delay-300 ${hovered ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                            <motion.div initial="hidden" animate={hovered ? "visible" : "hidden"}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.15,
                                            delayChildren: 0.4
                                        }
                                    }
                                }}
                                className="flex flex-col gap-2 text-sm">
                                <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex px-2 py-1 rounded-md transition" onMouseEnter={() => setdocHovered(true)} onMouseLeave={() => setdocHovered(false)} > Documentation
                                    <img src="icons8-right-arrow-24.png" alt="right arrow" className={`transition-transform duration-200 ease-in-out ${docHovered ? 'translate-x-[14px]' : 'translate-x-0'}`} />
                                </motion.div>
                                <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex px-2 py-1 rounded-md transition" onMouseEnter={() => setSupportHovered(true)} onMouseLeave={() => setSupportHovered(false)} > Support
                                    <img src="icons8-right-arrow-24.png" alt="right arrow" className={`transition-transform duration-200 ease-in-out ${supportHovered ? 'translate-x-[14px]' : 'translate-x-0'}`} />
                                </motion.div>
                                <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex px-2 py-1 rounded-md transition" onMouseEnter={() => setPressHovered(true)} onMouseLeave={() => setPressHovered(false)} > Press
                                    <img src="icons8-right-arrow-24.png" alt="right arrow" className={`transition-transform duration-200 ease-in-out ${pressHovered ? 'translate-x-[14px]' : 'translate-x-0'}`} />
                                </motion.div>
                                <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex px-2 py-1 rounded-md transition" onMouseEnter={() => setReleasesHovered(true)} onMouseLeave={() => setReleasesHovered(false)} > Releases
                                    <img src="icons8-right-arrow-24.png" alt="right arrow" className={`transition-transform duration-200 ease-in-out ${releasesHovered ? 'translate-x-[14px]' : 'translate-x-0'}`} />
                                </motion.div>
                                <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex px-2 py-1 rounded-md transition" onMouseEnter={() => setChangeLogHovered(true)} onMouseLeave={() => setChangeLogHovered(false)} >Changelog
                                    <img src="icons8-right-arrow-24.png" alt="right arrow" className={`transition-transform duration-200 ease-in-out ${changeLogHovered ? 'translate-x-[14px]' : 'translate-x-0'}`} />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default StartedNav;