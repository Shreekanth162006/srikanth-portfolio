import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiShield, FiCode } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

export default function Projects() {
  const { data } = usePortfolio();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="py-20 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} ls -la /projects/</p>
          <h2 className="section-title text-3xl sm:text-4xl text-white">My <span className="text-cyber-green">Projects</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.projects.map((project, index) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: index * 0.2 }} className="cyber-card overflow-hidden group">
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl border flex-shrink-0" style={{ borderColor: `${project.color}33`, backgroundColor: `${project.color}10`, color: project.color }}>
                    {index % 2 === 0 ? <FiCode className="text-2xl" /> : <FiShield className="text-2xl" />}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">{project.title}</h3>
                    <p className="text-cyber-green/50 text-xs font-mono mt-1">// {project.subtitle || 'Security Project'}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.highlights.map((h) => (
                    <span key={h} className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border" style={{ borderColor: `${project.color}30`, color: project.color, backgroundColor: `${project.color}08` }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />{h}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono text-gray-500 bg-gray-800/50 px-2 py-1 rounded">#{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="cyber-btn cyber-btn-primary flex items-center gap-2 text-sm">
                    <FiGithub /> Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
