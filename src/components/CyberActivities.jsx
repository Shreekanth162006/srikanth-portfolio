import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiUsers, FiAward, FiCalendar, FiMapPin, FiExternalLink } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

export default function CyberActivities() {
  const { data } = usePortfolio();
  const hackathons = data.hackathons || [];
  const leadership = data.leadership || [];
  const achievementsText = data.achievementsText || [];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const renderCard = (item, defaultIcon) => {
    const displayIcon = item.icon || defaultIcon;
    return (
      <div key={item.id} className="bg-cyber-darker/60 border border-cyber-green/10 hover:border-cyber-green/30 p-5 rounded-xl transition-all duration-300 relative group overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-3xl opacity-5 pointer-events-none" style={{ background: item.color }} />
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1.5">
            <FiCalendar /> {item.year}
          </span>
          {item.organization && (
            <span className="text-[10px] font-mono text-cyber-green/50 flex items-center gap-1">
              <FiMapPin /> {item.organization}
            </span>
          )}
        </div>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg border text-base shrink-0 overflow-hidden" style={{ borderColor: `${item.color}30`, backgroundColor: `${item.color}10`, color: item.color }}>
            {displayIcon && (typeof displayIcon === 'string' && (displayIcon.startsWith('data:') || displayIcon.startsWith('http') || displayIcon.includes('/') || displayIcon.includes('.'))) ? (
              <img src={displayIcon} alt="" className="w-full h-full object-cover" />
            ) : (
              displayIcon
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-bold text-xs tracking-wide uppercase group-hover:text-cyber-green group-hover:glow-text transition-all leading-snug">{item.title}</h4>
            {item.role && <p className="text-cyber-green/80 font-mono text-[10px] mt-0.5">{item.role}</p>}
            <p className="text-gray-400 font-mono text-[10px] md:text-xs leading-relaxed mt-3">{item.desc}</p>
            {item.certUrl && (
              <a
                href={item.certUrl.startsWith('data:') ? undefined : item.certUrl}
                onClick={(e) => {
                  if (item.certUrl.startsWith('data:')) {
                    e.preventDefault();
                    try {
                      const parts = item.certUrl.split(',');
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
                      window.open(item.certUrl, '_blank');
                    }
                  }
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn py-1 px-2.5 mt-3 inline-flex items-center gap-1.5 text-[9px] border-cyber-green/35 text-cyber-green hover:bg-cyber-green/10 transition-all"
              >
                <FiExternalLink size={10} /> View Certificate
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="activities" className="py-20 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 hex-pattern opacity-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} query --filter hackathons,leadership,achievements</p>
          <h2 className="section-title text-3xl sm:text-4xl text-white">Activities <span className="text-cyber-green">& Honors</span></h2>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Hackathons */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-cyber-green glow-text font-display text-sm sm:text-base tracking-wider uppercase border-b border-cyber-green/40 pb-2 flex items-center gap-2">
              <span className="text-cyber-green font-mono">/</span> HACKATHONS
            </h3>
            <div className="space-y-4">
              {hackathons.map(h => renderCard(h, <FiCode />))}
              {hackathons.length === 0 && <p className="text-gray-600 font-mono text-xs">No entries loaded.</p>}
            </div>
          </motion.div>

          {/* Leadership & Volunteering */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-cyber-green glow-text font-display text-sm sm:text-base tracking-wider uppercase border-b border-cyber-green/40 pb-2 flex items-center gap-2">
              <span className="text-cyber-green font-mono">/</span> LEADERSHIP & VOLUNTEERING
            </h3>
            <div className="space-y-4">
              {leadership.map(l => renderCard(l, <FiUsers />))}
              {leadership.length === 0 && <p className="text-gray-600 font-mono text-xs">No entries loaded.</p>}
            </div>
          </motion.div>

          {/* Detailed Achievements */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-cyber-green glow-text font-display text-sm sm:text-base tracking-wider uppercase border-b border-cyber-green/40 pb-2 flex items-center gap-2">
              <span className="text-cyber-green font-mono">/</span> ACADEMIC HONORS & AWARDS
            </h3>
            <div className="space-y-4">
              {achievementsText.map(a => renderCard(a, <FiAward />))}
              {achievementsText.length === 0 && <p className="text-gray-600 font-mono text-xs">No entries loaded.</p>}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
