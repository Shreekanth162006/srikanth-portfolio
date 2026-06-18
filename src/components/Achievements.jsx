import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiFolder, FiShield, FiTerminal, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

const iconMap = { Certifications: <FiAward />, 'Security Projects': <FiFolder />, 'Cybersecurity Student': <FiShield />, 'Linux Enthusiast': <FiTerminal /> };

function AnimatedCounter({ target, suffix, inView, isText }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView || isText) return;
    let start = 0;
    const increment = Math.max(target / 40, 0.1);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 50);
    return () => clearInterval(timer);
  }, [inView, target, isText]);
  if (isText) return <span className="font-display text-4xl sm:text-5xl font-bold">✓</span>;
  return <span className="font-display text-4xl sm:text-5xl font-bold">{count}{suffix}</span>;
}

export default function Achievements() {
  const { data } = usePortfolio();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedImage, setSelectedImage] = useState(null);

  // Use all gallery items directly
  const filteredGallery = data.gallery || [];

  const handlePrev = () => {
    const galleryList = data.gallery || [];
    if (!galleryList.length || !selectedImage) return;
    const currentIndex = galleryList.findIndex(item => item.id === selectedImage.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + galleryList.length) % galleryList.length;
    setSelectedImage(galleryList[prevIndex]);
  };

  const handleNext = () => {
    const galleryList = data.gallery || [];
    if (!galleryList.length || !selectedImage) return;
    const currentIndex = galleryList.findIndex(item => item.id === selectedImage.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % galleryList.length;
    setSelectedImage(galleryList[nextIndex]);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, data.gallery]);

  return (
    <section id="gallery" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Counter Metrics Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} echo $ACHIEVEMENTS</p>
          <h2 className="section-title text-3xl sm:text-4xl text-white mx-auto">Key <span className="text-cyber-green">Achievements</span></h2>
        </motion.div>

        {/* Counter Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {data.achievements.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: index * 0.15 }} className="cyber-card p-6 sm:p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-10" style={{ background: item.color }} />
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl border text-xl" style={{ borderColor: `${item.color}30`, backgroundColor: `${item.color}10`, color: item.color }}>
                {iconMap[item.label] || <FiAward />}
              </div>
              <div style={{ color: item.color }}>
                <AnimatedCounter target={item.number} suffix={item.suffix} inView={inView} isText={item.isText} />
              </div>
              <p className="text-gray-400 text-sm font-mono mt-3">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Gallery Section Divider */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-10 text-center">
          <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} ls assets/gallery/</p>
          <h3 className="section-title text-2xl sm:text-3xl text-white mx-auto">Achievements & Events <span className="text-cyber-green">Gallery</span></h3>
        </motion.div>

        {/* Gallery Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="cyber-card group cursor-pointer overflow-hidden border border-white/5 hover:border-cyber-green/30"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-cyber-green/30 font-mono text-[10px]">
                      <FiAward size={28} className="mb-2 animate-pulse" />
                      NO IMAGE PROVIDED
                    </div>
                  )}

                </div>
                <div className="p-5 relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-mono text-gray-500">{item.date}</span>
                  </div>
                  <h4 className="text-white font-semibold text-sm group-hover:text-cyber-green transition-colors line-clamp-1">{item.title}</h4>
                  <p className="text-gray-400 text-xs mt-2 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-16 border border-dashed border-cyber-green/15 rounded-xl bg-cyber-darker/20">
            <FiAward className="mx-auto text-cyber-green/30 text-3xl mb-3 animate-pulse" />
            <p className="text-gray-500 font-mono text-xs">No gallery items found</p>
          </div>
        )}
      </div>

      {/* Immersive Lightbox Modal Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[50000] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            {/* Top Bar Actions */}
            <div className="absolute top-4 right-4 flex items-center gap-3 z-[50002]">
              {selectedImage.imageUrl && !selectedImage.imageUrl.startsWith('data:') && (
                <a
                  href={selectedImage.imageUrl}
                  download={selectedImage.title}
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-400 hover:text-cyber-green transition-colors font-mono text-[10px] bg-cyber-darker/80 border border-cyber-green/20 rounded px-2.5 py-1.5 uppercase tracking-wider"
                  title="Download Image File"
                >
                  Download
                </a>
              )}
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-400 hover:text-white transition-colors bg-cyber-darker/80 border border-cyber-green/20 rounded p-1.5 text-xl"
              >
                <FiX />
              </button>
            </div>

            {/* Prev / Next navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-2 sm:p-3.5 rounded-full transition-all z-[50001] text-xl sm:text-2xl"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-2 sm:p-3.5 rounded-full transition-all z-[50001] text-xl sm:text-2xl"
            >
              <FiChevronRight />
            </button>

            {/* Lightbox Content Container */}
            <div
              className="w-full max-w-4xl max-h-[85vh] flex flex-col items-center gap-5"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.93, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative max-h-[58vh] overflow-hidden rounded-lg border border-white/10 shadow-2xl"
              >
                {selectedImage.imageUrl ? (
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.title}
                    className="max-w-full max-h-[58vh] object-contain mx-auto"
                  />
                ) : (
                  <div className="w-[320px] h-[240px] flex flex-col items-center justify-center bg-cyber-darker text-cyber-green/30 font-mono text-xs">
                    <FiAward size={48} className="mb-2" />
                    NO IMAGE AVAILABLE
                  </div>
                )}
              </motion.div>

              {/* Lightbox Description */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-2xl text-center px-4"
              >
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  <span className="text-xs font-mono text-gray-500">{selectedImage.date}</span>
                </div>
                <h3 className="text-white font-bold text-lg sm:text-2xl mb-2.5 font-display">{selectedImage.title}</h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                  {selectedImage.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
