/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Mail, Instagram, ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';
import Lenis from 'lenis';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [pageKey, setPageKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionWord, setTransitionWord] = useState<'menn' | 'maestro'>('menn');

  const triggerTransition = (section: string) => {
    if (section === activeSection || isTransitioning) return;
    
    setIsTransitioning(true);
    setTransitionWord('menn');
    
    // Switch to Maestro after MENN zooms past
    setTimeout(() => {
      setTransitionWord('maestro');
    }, 400);

    // Change page content
    setTimeout(() => {
      setPageKey(prev => prev + 1);
      setActiveSection(section);
      
      // Scroll to section
      if (section === 'hero') {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        }
      }
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }, 800);
  };

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  return (
    <div className="min-h-screen selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-serif text-xl font-medium tracking-tight cursor-pointer" onClick={() => triggerTransition('hero')}>
            MENN <span className="italic opacity-50">Maestro</span>
          </div>
          <div className="hidden md:flex items-center gap-12 text-xs uppercase tracking-[0.2em] font-medium">
            <button onClick={() => triggerTransition('work')} className="hover:opacity-50 transition-opacity uppercase">Work</button>
            <button onClick={() => triggerTransition('about')} className="hover:opacity-50 transition-opacity uppercase">About</button>
            <button onClick={() => triggerTransition('contact')} className="hover:opacity-50 transition-opacity uppercase">Contact</button>
            <button onClick={() => triggerTransition('contact')} className="bg-white text-black px-6 py-2 rounded-full hover:bg-opacity-90 transition-all uppercase">Let's Talk</button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none"
          >
            <div className="relative flex items-center justify-center w-full h-screen overflow-hidden">
              <AnimatePresence mode="popLayout">
                {transitionWord === 'menn' ? (
                  <motion.div
                    key="menn"
                    initial={{ scale: 0.5, opacity: 0, filter: 'blur(10px)' }}
                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ 
                      scale: 15, 
                      opacity: 0, 
                      filter: 'blur(20px)',
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute font-serif text-6xl md:text-9xl tracking-tighter font-medium text-white text-center"
                  >
                    MENN
                  </motion.div>
                ) : (
                  <motion.div
                    key="maestro"
                    initial={{ scale: 0.2, opacity: 0, filter: 'blur(20px)' }}
                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ 
                      scale: 0.8, 
                      opacity: 0,
                      filter: 'blur(10px)',
                      transition: { duration: 0.4 }
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute font-serif text-6xl md:text-9xl tracking-tighter font-medium italic text-white text-center"
                  >
                    Maestro
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grain Overlay */}
      <div className="fixed inset-0 z-[102] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <motion.main
          key={pageKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 1, // Full delay until transition is complete
            duration: 0.8, 
            ease: "easeOut" 
          }}
        >
          {/* Hero Section */}
          <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] mb-8 block opacity-60">Digital Product Designer</span>
          <h1 className="font-serif text-[15vw] md:text-[12vw] leading-[0.8] tracking-tighter mb-8">
            MENN<br />
            <span className="italic opacity-20">Maestro</span>
          </h1>
          <p className="max-w-md mx-auto text-lg md:text-xl font-light opacity-70 leading-relaxed">
            Creating digital products that turn ideas into results.
          </p>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => triggerTransition('work')}
              className="bg-white text-black px-10 py-4 rounded-full font-medium text-sm uppercase tracking-widest"
            >
              View Work
            </motion.button>
            <button 
              onClick={() => triggerTransition('about')}
              className="text-xs uppercase tracking-[0.3em] flex items-center gap-2 hover:opacity-50 transition-opacity"
            >
              The Vision <ArrowUpRight size={14} />
            </button>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <span className="text-[8px] uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-[1px] h-12 bg-white" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="work" className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div {...fadeIn} className="mb-24">
          <span className="text-[10px] uppercase tracking-[0.4em] opacity-50 mb-4 block">Philosophy</span>
          <h2 className="font-serif text-5xl md:text-7xl max-w-2xl leading-tight">
            Simple, functional,<br />
            <span className="italic opacity-50">meaningful.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Digital Product Creator",
              desc: "At just 13, MENN Maestro is already building and selling digital products that provide real value. From idea to execution, each product is practical, functional, and designed to make a tangible impact.",
              img: "https://media.discordapp.net/attachments/1308081652525826178/1481268797850652796/d2e30cca-3589-4134-93c6-d518183677c9.jpg?ex=69b2b292&is=69b16112&hm=d72380d7a023200931907decbab06d2b5435e68e6849cc27c1f60bc7bde0364a&=&format=webp&width=598&height=1073",
              tag: "Creation"
            },
            {
              title: "Vision & Ambition",
              desc: "Driven by curiosity and big goals, MENN approaches every project with focus and purpose. Some aspirations lie a little further ahead—like the precision and performance of a BMW M5 F90—serving as inspiration for everything he creates.",
              img: "https://media.discordapp.net/attachments/1308081652525826178/1481263811641217125/image.png?ex=69b2aded&is=69b15c6d&hm=327cdaa08cd639ce08c8d522febd19c2a5db65955d3702e218220b37fc9c8913&=&format=webp&quality=lossless&width=454&height=630",
              tag: "Mindset"
            },
            {
              title: "Authentic Early Experience",
              desc: "Starting young gives MENN a rare advantage: hands-on experience in digital creation, problem-solving, and entrepreneurship. This early exposure is building a foundation for long-term success, setting him apart from peers.",
              img: "https://media.discordapp.net/attachments/1308081652525826178/1481266090024767568/image.png?ex=69b2b00c&is=69b15e8c&hm=bc305514d35153a58bdaf0933389dfc0e2a5ea41ef9ffb82227f2c9dd371c1b8&=&format=webp&quality=lossless&width=598&height=1073",
              tag: "Advantage"
            }
          ].map((pillar, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.2 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 bg-zinc-900">
                <img 
                  src={pillar.img} 
                  alt={pillar.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Shine Ray Effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div 
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:[animation:shine_1.2s_ease-in-out_infinite] mix-blend-screen transition-opacity duration-300"
                    style={{ width: '200%' }}
                  />
                </div>
              </div>
              <span className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-3 block">{pillar.tag}</span>
              <h3 className="text-xl font-medium mb-4">{pillar.title}</h3>
              <p className="text-sm opacity-60 leading-relaxed font-light">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeIn}>
            <span className="text-[10px] uppercase tracking-[0.4em] opacity-50 mb-6 block">The Story</span>
            <h2 className="font-serif text-5xl md:text-6xl mb-12 leading-tight">
              Practical, impactful, and <span className="italic opacity-50">easy to use.</span>
            </h2>
            <div className="space-y-6 text-lg font-light opacity-70 leading-relaxed">
              <p>
                MENN Maestro started at 13 with a vision: to design digital products that are practical, impactful, and easy to use. Every product is built with focus, clarity, and purpose, ensuring real value for users.
              </p>
              <p>
                Beyond work, MENN is driven by ambition and passion. Some goals lie a little further ahead—like the precision and performance of a BMW M5 F90—serving as inspiration for everything he creates.<br />
                Dream car: Corvette C8 🇺🇸 (not eligible here, but still the goal).
              </p>
              <p className="italic text-sm opacity-50 pt-6 border-t border-white/5">
                "Great products are simple, functional, and meaningful. Each creation is crafted with care, attention to detail, and a commitment to quality that stands the test of time."
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            {...fadeIn}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
          >
            <img 
              src="https://media.discordapp.net/attachments/1308081652525826178/1479041937125408870/image.png?ex=69ae8d25&is=69ad3ba5&hm=9e747766be148080777fa96e35414ab0c636c25b3aa2c358bcc49b64733b8a0a&=&format=webp&quality=lossless&width=772&height=1073" 
              alt="BMW M5 F90 Inspiration"
              referrerPolicy="no-referrer"
              className="w-full h-auto block group-hover:scale-105 transition-all duration-700"
            />
            
            {/* Shine Ray Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div 
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:[animation:shine_1.2s_ease-in-out_infinite] mix-blend-screen transition-opacity duration-300"
                style={{ width: '200%' }}
              />
            </div>
            
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-48 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
        
        <motion.div {...fadeIn} className="relative z-10">
          <span className="text-[10px] uppercase tracking-[0.5em] opacity-50 mb-8 block">Get in touch</span>
          <h2 className="font-serif text-7xl md:text-[10vw] leading-[0.8] tracking-tighter mb-16">
            Let's build<br />
            <span className="italic opacity-20">the future.</span>
          </h2>
          
          <div className="flex flex-col items-center gap-16">
            <a 
              href="mailto:MennHq@gmail.com" 
              className="font-serif text-4xl md:text-7xl hover:opacity-50 transition-opacity border-b border-white/10 pb-4"
            >
              MennHq@gmail.com
            </a>
            
            <a 
              href="https://instagram.com/menn_maestro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-sans text-sm md:text-base tracking-[0.5em] uppercase opacity-40 hover:opacity-100 transition-all duration-500"
            >
              @MENN_MAESTRO
            </a>

            <div className="flex gap-8 mt-4">
              <Twitter size={20} className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
              <Linkedin size={20} className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
              <Github size={20} className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
              <Mail size={20} className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
            </div>
          </div>
        </motion.div>
      </section>
    </motion.main>

    {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] opacity-40">
          <div className="font-serif text-sm cursor-pointer" onClick={() => triggerTransition('hero')}>MENN <span className="italic">Maestro</span></div>
          <div>© 2024 MENN Maestro. All rights reserved.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:opacity-100">Privacy</a>
            <a href="#" className="hover:opacity-100">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
