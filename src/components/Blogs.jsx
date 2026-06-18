import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSearch, FiCalendar, FiTag, FiX, FiBookOpen, FiTerminal } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

// Simple Custom Markdown Renderer
function MarkdownRenderer({ content }) {
  const lines = content.split('\n');
  let inCodeBlock = false;
  let codeBlockLines = [];

  return (
    <div className="space-y-4 text-gray-300 font-mono text-xs md:text-sm leading-relaxed select-text">
      {lines.map((line, idx) => {
        // Code blocks check
        if (line.trim().startsWith('```')) {
          if (inCodeBlock) {
            inCodeBlock = false;
            const code = codeBlockLines.join('\n');
            codeBlockLines = [];
            return (
              <pre key={idx} className="bg-cyber-darker p-4 rounded-lg border border-cyber-green/20 text-cyber-green text-[11px] overflow-x-auto my-3 font-mono leading-normal shadow-[inset_0_0_10px_rgba(0,255,65,0.02)]">
                <code>{code}</code>
              </pre>
            );
          } else {
            inCodeBlock = true;
            return null;
          }
        }

        if (inCodeBlock) {
          codeBlockLines.push(line);
          return null;
        }

        // Headers
        if (line.startsWith('#### ')) {
          return <h5 key={idx} className="text-white font-bold text-xs uppercase mt-4 mb-2 flex items-center gap-1.5"><span className="text-cyber-green">▶</span> {line.replace('#### ', '')}</h5>;
        }
        if (line.startsWith('### ')) {
          return <h4 key={idx} className="text-white font-display font-semibold text-sm tracking-wider uppercase border-b border-cyber-green/20 pb-1 mt-6 mb-3 text-cyber-green">{line.replace('### ', '')}</h4>;
        }
        if (line.startsWith('## ')) {
          return <h3 key={idx} className="text-white font-display font-bold text-base tracking-widest uppercase border-b border-cyber-green/30 pb-1.5 mt-8 mb-4">{line.replace('## ', '')}</h3>;
        }

        // Bullet lists
        if (line.trim().startsWith('- ')) {
          return (
            <div key={idx} className="flex gap-2 pl-4">
              <span className="text-cyber-green">▸</span>
              <span>{line.trim().replace('- ', '')}</span>
            </div>
          );
        }

        // Empty line
        if (!line.trim()) {
          return <div key={idx} className="h-2" />;
        }

        // Plain paragraph (supporting simple inline backticks `code`)
        const parts = line.split(/(`[^`]+`)/g);
        return (
          <p key={idx}>
            {parts.map((part, pIdx) => {
              if (part.startsWith('`') && part.endsWith('`')) {
                return (
                  <code key={pIdx} className="bg-cyber-green/10 border border-cyber-green/20 px-1.5 py-0.5 rounded text-cyber-green text-xs font-mono">
                    {part.slice(1, -1)}
                  </code>
                );
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}

export default function Blogs() {
  const { data } = usePortfolio();
  const blogs = data.blogs || [];
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [activeBlog, setActiveBlog] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  // Filter computation
  const filtered = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || 
                          b.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !selectedTag || b.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Extract all unique tags
  const allTags = Array.from(new Set(blogs.flatMap(b => b.tags || [])));

  return (
    <section id="blogs" className="py-20 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} cat logs/security_reports.db</p>
            <h2 className="section-title text-3xl sm:text-4xl text-white">CTF Write-ups <span className="text-cyber-green">& Blogs</span></h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3.5 top-3.5 text-gray-600 text-sm" />
            <input
              type="text"
              placeholder="Search payloads / logs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-cyber-darker border border-cyber-green/20 rounded-lg text-gray-300 font-mono text-xs outline-none focus:border-cyber-green transition-all"
            />
          </div>
        </motion.div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded font-mono text-[10px] uppercase border transition-all ${
                !selectedTag 
                  ? 'bg-cyber-green/10 text-cyber-green border-cyber-green/30' 
                  : 'bg-transparent text-gray-500 border-gray-800 hover:text-gray-300'
              }`}
            >
              [ALL_LOGS]
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded font-mono text-[10px] uppercase border transition-all ${
                  selectedTag === tag 
                    ? 'bg-cyber-green/10 text-cyber-green border-cyber-green/30' 
                    : 'bg-transparent text-gray-500 border-gray-800 hover:text-gray-300'
                }`}
              >
                #{tag}
              </button>
            ))}
          </motion.div>
        )}

        {/* Blogs Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.length > 0 ? (
            filtered.map((b, idx) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="cyber-card p-6 cursor-pointer flex flex-col justify-between hover:border-cyber-green/45 group"
                onClick={() => setActiveBlog(b)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-cyber-green/60 uppercase tracking-widest flex items-center gap-1">
                      <FiTerminal /> {b.category || 'CTF Write-up'}
                    </span>
                    <span className="text-[10px] font-mono text-gray-600 flex items-center gap-1">
                      <FiCalendar /> {b.date}
                    </span>
                  </div>
                  <h3 className="text-white font-display text-sm font-bold tracking-wide uppercase group-hover:text-cyber-green transition-colors mb-3 leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-gray-500 font-mono text-[11px] leading-relaxed mb-4 line-clamp-3">
                    {b.excerpt}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-cyber-green/5">
                  {b.tags.map(t => (
                    <span key={t} className="text-[9px] font-mono text-cyber-green/40 border border-cyber-green/10 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 border border-dashed border-cyber-green/10 rounded-lg">
              <p className="font-mono text-gray-500 text-xs">No active logs found matching the filter query.</p>
            </div>
          )}
        </div>
      </div>

      {/* Full-Screen Blog Reader Overlay */}
      <AnimatePresence>
        {activeBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[99999] overflow-y-auto p-4 md:p-10 flex justify-center"
            onClick={e => e.target === e.currentTarget && setActiveBlog(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="bg-cyber-card border border-cyber-green/30 rounded-xl w-full max-w-3xl my-auto p-6 md:p-8 flex flex-col relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveBlog(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <FiX size={18} />
              </button>

              {/* Reader Header */}
              <div className="border-b border-cyber-green/10 pb-4 mb-6">
                <span className="text-[10px] font-mono text-cyber-green/60 uppercase tracking-widest flex items-center gap-1 mb-2">
                  <FiTerminal /> {activeBlog.category || 'Security report'}
                </span>
                <h1 className="text-white font-display text-base md:text-lg font-bold uppercase leading-snug text-cyber-green">
                  {activeBlog.title}
                </h1>
                <div className="flex items-center gap-4 mt-3 text-[10px] font-mono text-gray-500">
                  <span className="flex items-center gap-1"><FiCalendar /> Published: {activeBlog.date}</span>
                  <span className="flex items-center gap-1"><FiBookOpen /> Category: {activeBlog.category}</span>
                </div>
              </div>

              {/* Reader Body */}
              <div className="flex-1 overflow-y-auto pr-2 max-h-[60vh] custom-scrollbar">
                <MarkdownRenderer content={activeBlog.content} />
              </div>

              {/* Reader Footer Tags */}
              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-cyber-green/10">
                {activeBlog.tags.map(t => (
                  <span key={t} className="text-[10px] font-mono text-cyber-green/50 border border-cyber-green/20 px-2 py-0.5 rounded bg-cyber-green/5">
                    #{t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
