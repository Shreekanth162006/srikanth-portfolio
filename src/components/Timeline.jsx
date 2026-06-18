import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

function renderDescription(desc) {
  if (!desc) return null;
  if (typeof desc !== 'string') return desc;
  
  // Highlight "CGPA of 7.71 / 10" or "CGPA of [anything]"
  const cgpaRegex = /(CGPA of [0-9.]+(?:\s*\/\s*[0-9.]+)?)/gi;
  const parts = desc.split(cgpaRegex);
  
  return parts.map((part, i) => {
    if (part.match(cgpaRegex)) {
      return <strong key={i} className="text-cyber-green glow-dynamic font-bold">{part}</strong>;
    }
    return part;
  });
}

export default function Timeline() {
  const { data } = usePortfolio();
  const experiences = data.experiences || [];
  const educationMilestones = data.educationList || [];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const renderTimeline = (title, items) => (
    <div className="flex-1">
      <h4 className="text-cyber-green font-display text-xs tracking-wider uppercase mb-6 flex items-center gap-2">
        <span className="text-cyber-green/50">▶</span> {title}
      </h4>
      <div className="relative border-l border-cyber-green/20 ml-2 pl-8 space-y-6">
        {/* Glow Line indicator */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-cyber-green to-transparent opacity-40 pointer-events-none" />
        
        {items.map((m, i) => (
          <motion.div
            key={m.id || i}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative group"
          >
            {/* Timeline Circle with Icon */}
            <span
              className="absolute -left-[52px] top-1 w-10 h-10 rounded-full border border-cyber-darker flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_8px_var(--primary)] text-lg z-10 bg-cyber-darker overflow-hidden"
              style={{
                borderColor: m.color || 'var(--cyber-primary)',
                color: m.color || 'var(--cyber-primary)',
                '--primary': m.color || 'var(--cyber-primary)'
              }}
            >
              {m.icon && (m.icon.startsWith('data:') || m.icon.startsWith('http') || m.icon.includes('/') || m.icon.includes('.')) ? (
                <img src={m.icon} alt="" className="w-full h-full object-cover" />
              ) : (
                m.icon || '📍'
              )}
            </span>
            
            {/* Card wrapper */}
            <div className="cyber-card p-4 border-cyber-green/10 hover:border-cyber-green/25 transition-all bg-cyber-darker/50 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
                <div>
                  <h5 className="text-white font-bold text-xs group-hover:text-cyber-green group-hover:glow-dynamic transition-all leading-tight">{m.title}</h5>
                  <div className="text-gray-400 text-[10px] font-mono mt-0.5">
                    {m.company ? (
                      <span>
                        <strong className="text-cyber-green glow-dynamic">{m.company}</strong>
                        {m.details && ` | ${m.details}`}
                      </span>
                    ) : m.school ? (
                      <span>
                        <strong className="text-cyber-green glow-dynamic">{m.school}</strong>
                      </span>
                    ) : m.subtitle}
                  </div>
                </div>
                <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-cyber-green/35 bg-cyber-green/5 text-cyber-green glow-dynamic shrink-0 self-start sm:self-auto" style={{ color: m.color || 'var(--cyber-primary)', borderColor: `${m.color || 'var(--cyber-primary)'}35`, backgroundColor: `${m.color || 'var(--cyber-primary)'}08` }}>
                  {m.year}
                </span>
              </div>
              <div className="text-gray-500 text-[10px] md:text-xs leading-relaxed font-mono">
                {renderDescription(m.desc)}
              </div>
              {m.certUrl && (
                <a
                  href={m.certUrl.startsWith('data:') ? undefined : m.certUrl}
                  onClick={(e) => {
                    if (m.certUrl.startsWith('data:')) {
                      e.preventDefault();
                      try {
                        const parts = m.certUrl.split(',');
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
                        window.open(m.certUrl, '_blank');
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
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-12" ref={ref}>
      <h3 className="text-white font-display text-sm tracking-wider uppercase mb-8 flex items-center gap-2">
        <span className="text-cyber-green">{'>'}</span> Operator Chronology (Experience & Academics)
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {renderTimeline('Internship Experience', experiences)}
        {renderTimeline('Education History', educationMilestones)}
      </div>
    </div>
  );
}
