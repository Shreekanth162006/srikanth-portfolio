import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiMenu, FiX } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Bootcamps', href: '#bootcamps' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { data, theme, setTheme } = usePortfolio();
  const { profile } = data;
  const [scrolled, setScrolled] = useState(false);

  const nameParts = (profile.name || '').trim().split(' ');
  const lastName = nameParts[nameParts.length - 1] || '';
  const firstName = nameParts.slice(0, -1).join(' ') || '';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visible, setVisible] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Sync with initial loading screen boot transition delay
    const timer = setTimeout(() => setHasLoaded(true), 4800);
    return () => clearTimeout(timer);
  }, []);

  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    setMobileOpen(false);

    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const navbarOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        window.history.pushState(null, '', `#${targetId}`);
        setActiveSection(targetId);
      }
    }, 150);
  };


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      // Auto Hide logic: hide when scrolling down past a threshold, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Scroll Spy Logic
      let currentSection = 'home';
      for (const link of navLinks) {
        const sectionId = link.href.substring(1);
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, x: '-50%', borderRadius: '28px' }}
      animate={{ 
        y: visible || mobileOpen ? 0 : -120, 
        x: '-50%',
        borderRadius: mobileOpen ? '16px' : '28px'
      }}
      transition={hasLoaded ? { duration: 0.3, ease: 'easeInOut' } : { duration: 0.8, delay: 4 }}
      className="fixed top-4 left-1/2 z-[1000] w-[95%] xl:w-[92%] max-w-7xl bg-cyber-darker/50 backdrop-blur-[30px] border border-white/12 shadow-lg shadow-cyber-green/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavLinkClick(e, 'home')}
            className="flex items-center gap-2 group"
          >
            <FiShield className="text-cyber-green text-2xl group-hover:rotate-12 transition-transform" />
            <span className="font-display text-cyber-green text-sm sm:text-base tracking-wider font-semibold">
              {firstName.toUpperCase()}<span className="text-white">.{lastName ? lastName.substring(0, 1).toUpperCase() : ''}</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-6">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, sectionId)}
                  className={`nav-link flex items-center gap-1.5 transition-colors duration-300 py-1 ${
                    isActive ? 'text-cyber-green font-semibold' : 'text-cyber-text/80'
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-green shadow-[0_0_8px_var(--cyber-primary)] animate-pulse" />
                  )}
                  {link.name}
                </a>
              );
            })}

            {/* Theme Selector */}
            <div className="flex items-center gap-1.5 border-l border-cyber-green/20 pl-4 h-6">
              {['green', 'purple', 'blue', 'red'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    theme === t 
                      ? 'scale-125 border-white shadow-[0_0_8px_currentColor]' 
                      : 'border-transparent opacity-50 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{
                    backgroundColor: t === 'green' ? '#00ff41' : t === 'purple' ? '#a855f7' : t === 'blue' ? '#00e5ff' : '#ff073a',
                    color: t === 'green' ? '#00ff41' : t === 'purple' ? '#a855f7' : t === 'blue' ? '#00e5ff' : '#ff073a'
                  }}
                  title={`Switch to ${t} theme`}
                />
              ))}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-cyber-green text-2xl p-2"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-white/10 mt-1"
          >
            <div className="px-6 pb-6 pt-3 flex flex-col gap-3">
              {navLinks.map((link) => {
                const sectionId = link.href.substring(1);
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, sectionId)}
                    className={`nav-link py-1.5 flex items-center gap-2 ${
                      isActive ? 'text-cyber-green font-semibold' : 'text-cyber-text/85'
                    }`}
                  >
                    <span className="text-cyber-green/50">{'>'}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-green shadow-[0_0_8px_var(--cyber-primary)] animate-pulse" />
                    )}
                    {link.name}
                  </a>
                );
              })}

              {/* Mobile Theme Selector */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/10 mt-1">
                <span className="text-gray-500 font-mono text-[10px] uppercase">Theme:</span>
                <div className="flex gap-2">
                  {['green', 'purple', 'blue', 'red'].map((t) => (
                    <button
                      key={t}
                      onClick={() => { setTheme(t); setMobileOpen(false); }}
                      className={`w-5 h-5 rounded-full border transition-all ${
                        theme === t 
                          ? 'border-white scale-110 shadow-[0_0_8px_currentColor]' 
                          : 'border-transparent opacity-65'
                      }`}
                      style={{
                        backgroundColor: t === 'green' ? '#00ff41' : t === 'purple' ? '#a855f7' : t === 'blue' ? '#00e5ff' : '#ff073a',
                        color: t === 'green' ? '#00ff41' : t === 'purple' ? '#a855f7' : t === 'blue' ? '#00e5ff' : '#ff073a'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
