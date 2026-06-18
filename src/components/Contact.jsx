import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiMapPin, FiSend, FiPaperclip } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

export default function Contact() {
  const { data } = usePortfolio();
  const { profile } = data;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // We use formsubmit.co which requires the email in the action URL
  const targetEmail = profile.contactEmail || profile.email;

  return (
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} ssh contact@{profile.githubUsername || 'srikanth'}.dev</p>
          <h2 className="section-title text-3xl sm:text-4xl text-white">Contact <span className="text-cyber-green">Me</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="terminal-window glow-box">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
                <span className="text-cyber-green/50 text-xs font-mono ml-2">secure-transmission</span>
              </div>
              <form action={`https://formsubmit.co/${targetEmail}`} method="POST" encType="multipart/form-data" className="p-6 space-y-5">
                {/* FormSubmit Configuration Fields */}
                <input type="hidden" name="_next" value={window.location.href} />
                <input type="hidden" name="_subject" value="New Message & Document from Portfolio!" />
                <input type="hidden" name="_template" value="box" />
                
                <div>
                  <label className="text-cyber-green/60 text-xs font-mono mb-2 block">NAME:</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 bg-cyber-darker border border-cyber-green/20 rounded-lg text-gray-200 font-mono text-[16px] sm:text-sm outline-none focus:border-cyber-green focus:shadow-[0_0_15px_rgba(0,255,65,0.15)] transition-all placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="text-cyber-green/60 text-xs font-mono mb-2 block">EMAIL:</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-cyber-darker border border-cyber-green/20 rounded-lg text-gray-200 font-mono text-[16px] sm:text-sm outline-none focus:border-cyber-green focus:shadow-[0_0_15px_rgba(0,255,65,0.15)] transition-all placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="text-cyber-green/60 text-xs font-mono mb-2 block">MESSAGE:</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 bg-cyber-darker border border-cyber-green/20 rounded-lg text-gray-200 font-mono text-[16px] sm:text-sm outline-none focus:border-cyber-green focus:shadow-[0_0_15px_rgba(0,255,65,0.15)] transition-all resize-none placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="text-cyber-green/60 text-xs font-mono mb-2 block flex items-center gap-2"><FiPaperclip /> ATTACH DOCUMENT (Optional):</label>
                  <p className="text-[10px] text-gray-500 mb-2 font-mono">Upload offer letters, job descriptions, or other files.</p>
                  <input
                    type="file"
                    name="attachment"
                    className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-cyber-green/30 file:text-xs file:font-mono file:bg-cyber-darker file:text-cyber-green hover:file:bg-cyber-green/10 cursor-pointer"
                  />
                </div>
                <button type="submit" className="cyber-btn cyber-btn-primary w-full flex items-center justify-center gap-2 mt-4">
                  <FiSend /> Send Message
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }} className="space-y-6">
            <div className="cyber-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-cyber-green/10 rounded-xl border border-cyber-green/20"><FiMail className="text-cyber-green text-xl" /></div>
                <div><h4 className="text-white font-semibold text-sm">Email</h4><p className="text-cyber-green/60 text-xs sm:text-sm font-mono break-all">{targetEmail}</p></div>
              </div>
            </div>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="cyber-card p-6 flex items-center gap-4 block">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-500/10 rounded-xl border border-blue-500/20">
                <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </div>
              <div><h4 className="text-white font-semibold text-sm">LinkedIn</h4><p className="text-blue-400/60 text-sm font-mono">{profile.linkedinUsername}</p></div>
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="cyber-card p-6 flex items-center gap-4 block">
              <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl border border-white/10">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
              <div><h4 className="text-white font-semibold text-sm">GitHub</h4><p className="text-gray-400 text-sm font-mono">{profile.githubUsername}</p></div>
            </a>
            <div className="cyber-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-cyber-red/10 rounded-xl border border-cyber-red/20"><FiMapPin className="text-cyber-red text-xl" /></div>
                <div><h4 className="text-white font-semibold text-sm">Location</h4><p className="text-gray-400 text-sm">{profile.location}</p></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

