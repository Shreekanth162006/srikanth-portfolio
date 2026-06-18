import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiGlobe, FiServer, FiTool, FiShield, FiCheckCircle } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

const iconMap = {
  Programming: <FiCode />,
  'Web Technologies': <FiGlobe />,
  'OS & Networking': <FiServer />,
  'Security Tools': <FiTool />,
  Cybersecurity: <FiShield />,
};

export default function Skills() {
  const { data } = usePortfolio();
  const { profile } = data;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="skills" className="py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 hex-pattern" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} nmap -sV skills.{profile.githubUsername || 'srikanth'}</p>
          <h2 className="section-title text-3xl sm:text-4xl text-white">Technical <span className="text-cyber-green">Skills</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.skills.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              className="cyber-card p-6 scan-line"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg border"
                  style={{
                    borderColor: `${category.color}33`,
                    backgroundColor: `${category.color}10`,
                    color: category.color,
                  }}
                >
                  <span className="text-xl">{iconMap[category.title] || <FiCode />}</span>
                </div>
                <h3 className="font-display text-white text-sm font-bold tracking-wide uppercase">
                  {category.title}
                </h3>
              </div>

              {/* Skills as terminal-style tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: catIndex * 0.15 + skillIndex * 0.07 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border font-mono text-xs transition-all duration-300 hover:scale-105 cursor-default"
                    style={{
                      borderColor: `${category.color}25`,
                      backgroundColor: `${category.color}08`,
                      color: category.color,
                    }}
                  >
                    <FiCheckCircle className="text-[10px] opacity-70" />
                    {skill.name}
                  </motion.span>
                ))}
              </div>

              {/* Terminal Footer */}
              <div className="mt-5 pt-4 border-t border-cyber-green/10">
                <p className="text-cyber-green/30 text-xs font-mono">
                  {'>'} {category.skills.length} modules loaded
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
