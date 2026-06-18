import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiUser, FiBook, FiMapPin, FiEdit } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';
import Timeline from './Timeline';

export default function About() {
  const { data, isAdmin, setAdminPanelOpen, setAdminPanelTab } = usePortfolio();
  const { profile, education, roles } = data;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const terminalUser = profile.githubUsername || 'srikanth';
  const displayRole = roles && roles.length > 0 ? roles[0] : 'Cybersecurity Student';

  const nameParts = (profile.name || '').trim().split(' ');
  const lastName = nameParts[nameParts.length - 1] || '';
  const firstName = nameParts.slice(0, -1).join(' ') || '';

  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 cyber-grid-bg opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-16"
        >
          <div>
            <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} cat about_me.txt</p>
            <h2 className="section-title text-3xl sm:text-4xl text-white">About <span className="text-cyber-green">Me</span></h2>
          </div>
          {isAdmin && (
            <button
              onClick={() => {
                setAdminPanelTab('Profile');
                setAdminPanelOpen(true);
              }}
              className="cyber-btn border-cyber-green/50 text-cyber-green hover:bg-cyber-green/10 flex items-center gap-1.5 text-xs py-1.5 px-3.5 h-fit font-mono self-start sm:self-auto"
              title="Edit About Me Info"
            >
              <FiEdit size={12} /> [EDIT ABOUT]
            </button>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="terminal-window glow-box">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="text-cyber-green/50 text-xs font-mono ml-2">
                  <span className="inline sm:hidden">sri</span>
                  <span className="hidden sm:inline">{terminalUser}</span>
                  @kali:~/about
                </span>
              </div>
              <div className="terminal-body">
                <p className="mb-4">
                  <span className="text-cyber-green">{terminalUser}@kali</span><span className="text-white">:</span>
                  <span className="text-cyber-cyan">~</span><span className="text-white">$ </span>
                  <span className="text-gray-300">whoami</span>
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">{profile.aboutBio || profile.bio}</p>
                <p className="mb-3">
                  <span className="text-cyber-green">{terminalUser}@kali</span><span className="text-white">:</span>
                  <span className="text-cyber-cyan">~</span><span className="text-white">$ </span>
                  <span className="text-gray-300">cat interests.txt</span>
                </p>
                <ul className="space-y-2 text-gray-400 text-sm">
                  {(profile.interests || [
                    'Penetration Testing & Red Teaming',
                    'Web Application Security',
                    'Network Security & Forensics',
                    'Linux Administration & Hardening',
                    'Secure Software Development'
                  ]).map((interest, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-cyber-green">▸</span> {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="space-y-5">
            <div className="cyber-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-cyber-green/10 rounded-lg border border-cyber-green/20">
                  <FiBook className="text-cyber-green text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Education</h3>
                  <p className="text-cyber-text text-sm font-medium">{education.degree}</p>
                  <p className="text-cyber-green glow-dynamic font-semibold text-sm mt-1">{education.college}</p>
                  <p className="text-gray-500 text-xs mt-1">{education.university}</p>
                  <div className="mt-3 inline-flex items-center gap-2 bg-cyber-green/10 px-3 py-1 rounded-full border border-cyber-green/20">
                    <span className="text-cyber-green glow-dynamic font-mono text-sm font-bold">CGPA: {education.cgpa}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="cyber-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-cyber-green/10 rounded-lg border border-cyber-green/20">
                  <FiUser className="text-cyber-green text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-3">Quick Info</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-cyber-green/60 font-mono text-xs">NAME:</span>
                      <p className="text-white font-semibold">
                        {firstName} <span className="text-cyber-green glow-dynamic">{lastName}</span>
                      </p>
                    </div>
                    <div><span className="text-cyber-green/60 font-mono text-xs">ROLE:</span><p className="text-gray-300">{displayRole}</p></div>
                    <div><span className="text-cyber-green/60 font-mono text-xs">FOCUS:</span><p className="text-gray-300">{profile.focus || 'VAPT & Ethical Hacking'}</p></div>
                    <div><span className="text-cyber-green/60 font-mono text-xs">STATUS:</span><p className="text-cyber-green">{profile.status || '● Active'}</p></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cyber-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-cyber-green/10 rounded-lg border border-cyber-green/20">
                  <FiMapPin className="text-cyber-green text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Location</h3>
                  <p className="text-cyber-green glow-dynamic font-semibold text-sm">{profile.location}</p>
                  <p className="text-cyber-green/50 text-xs font-mono mt-1">[TIMEZONE] {profile.timezone || 'IST (UTC+5:30)'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <Timeline />
      </div>
    </section>
  );
}
