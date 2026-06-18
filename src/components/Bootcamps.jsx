import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiCalendar, FiMapPin } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

export default function Bootcamps() {
  const { data } = usePortfolio();
  const bootcamps = data.bootcamps || [];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  if (bootcamps.length === 0) return null;

  return (
    <section id="bootcamps" className="py-20 lg:py-28 relative font-sans" ref={ref}>
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} query --type bootcamps,workshops</p>
          <h2 className="section-title text-3xl sm:text-4xl text-white">Bootcamps <span className="text-cyber-green">& Workshops</span></h2>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bootcamps.map((bc, index) => {
            const displayIcon = bc.icon || '💻';
            const isCustomIcon = displayIcon.startsWith('data:') || displayIcon.startsWith('http') || displayIcon.includes('/') || displayIcon.includes('.');

            return (
              <motion.div 
                key={bc.id} 
                initial={{ opacity: 0, y: 45 }} 
                animate={inView ? { opacity: 1, y: 0 } : {}} 
                transition={{ duration: 0.6, delay: index * 0.15 }} 
                className="bg-cyber-darker/60 border border-cyber-green/10 hover:border-cyber-green/30 p-6 rounded-xl transition-all duration-300 relative group overflow-hidden animate-fade-in-up"
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-5 pointer-events-none" style={{ background: bc.color || 'var(--cyber-primary)' }} />
                
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1.5">
                    <FiCalendar className="text-xs" /> {bc.year}
                  </span>
                  {bc.organizer && (
                    <span className="text-[10px] font-mono text-cyber-green/60 flex items-center gap-1">
                      <FiMapPin className="text-[9px]" /> {bc.organizer}
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-4">
                  <div 
                    className="w-10 h-10 flex items-center justify-center rounded-lg border text-lg shrink-0 overflow-hidden" 
                    style={{ borderColor: `${bc.color || 'var(--cyber-primary)'}30`, backgroundColor: `${bc.color || 'var(--cyber-primary)'}10`, color: bc.color || 'var(--cyber-primary)' }}
                  >
                    {isCustomIcon ? (
                      <img src={displayIcon} alt="" className="w-full h-full object-cover" />
                    ) : (
                      displayIcon
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide uppercase group-hover:text-cyber-green group-hover:glow-text transition-all leading-snug">
                      {bc.title}
                    </h4>
                    <p className="text-gray-400 font-mono text-[10px] md:text-xs leading-relaxed mt-3">
                      {bc.desc}
                    </p>
                    
                    {bc.certUrl && (
                      <a
                        href={bc.certUrl.startsWith('data:') ? undefined : bc.certUrl}
                        onClick={(e) => {
                          if (bc.certUrl.startsWith('data:')) {
                            e.preventDefault();
                            try {
                              const parts = bc.certUrl.split(',');
                              const mime = parts[0].match(/:(.*?);/)[1] || 'application/pdf';
                              const bstr = atob(parts[1]);
                              let n = bstr.length;
                              const u8arr = new Uint8Array(n);
                              while (n--) {
                                u8arr[n] = bstr.charCodeAt(n);
                              }
                              const blob = new Blob([u8arr], { type: mime });
                              const blobUrl = URL.createObjectURL(blob);
                              window.open(blobUrl, '_blank');
                            } catch (err) {
                              console.error(err);
                              window.open(bc.certUrl, '_blank');
                            }
                          }
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cyber-btn py-1 px-2.5 mt-4 inline-flex items-center gap-1.5 text-[9px] border-cyber-green/35 text-cyber-green hover:bg-cyber-green/10 transition-all"
                      >
                        <FiExternalLink size={10} /> View Certificate
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
