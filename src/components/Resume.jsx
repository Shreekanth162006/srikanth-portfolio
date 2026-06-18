import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiDownload, FiEye, FiFileText, FiCheckCircle } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

export default function Resume() {
  const { data } = usePortfolio();
  const { profile } = data;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [resumeLink, setResumeLink] = useState('');

  const nameParts = (profile.name || '').trim().split(' ');
  const lastName = nameParts[nameParts.length - 1] || '';
  const firstName = nameParts.slice(0, -1).join(' ') || '';

  useEffect(() => {
    if (!profile.resumeUrl) {
      setResumeLink('');
      return;
    }

    if (profile.resumeUrl.startsWith('data:')) {
      try {
        const parts = profile.resumeUrl.split(',');
        const mime = parts[0].match(/:(.*?);/)[1] || 'application/pdf';
        const bstr = atob(parts[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const url = URL.createObjectURL(blob);
        setResumeLink(url);

        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (e) {
        console.error('Failed to parse base64 resume:', e);
        setResumeLink(profile.resumeUrl);
      }
    } else {
      setResumeLink(profile.resumeUrl);
    }
  }, [profile.resumeUrl]);

  return (
    <section id="resume" className="py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} cat resume.pdf | less</p>
          <h2 className="section-title text-3xl sm:text-4xl text-white">My <span className="text-cyber-green">Resume</span></h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="max-w-3xl mx-auto">
          <div className="cyber-card overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-cyber-green via-cyber-cyan to-cyber-purple" />
            <div className="p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-20 h-20 flex items-center justify-center bg-cyber-green/10 rounded-2xl border border-cyber-green/20 flex-shrink-0">
                  <FiFileText className="text-cyber-green text-3xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-xl mb-2">
                    {firstName} <span className="text-cyber-green">{lastName}</span> - Resume
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">Cybersecurity & Computer Science Engineering Student</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm"><FiCheckCircle className="text-cyber-green text-xs" /><span className="text-gray-300">{data.education.degree}</span></div>
                    <div className="flex items-center gap-2 text-sm"><FiCheckCircle className="text-cyber-green text-xs" /><span className="text-gray-300">Ethical Hacking & VAPT Skills</span></div>
                    <div className="flex items-center gap-2 text-sm"><FiCheckCircle className="text-cyber-green text-xs" /><span className="text-gray-300">{data.certifications.length}+ Professional Certifications</span></div>
                    <div className="flex items-center gap-2 text-sm"><FiCheckCircle className="text-cyber-green text-xs" /><span className="text-gray-300">{data.projects.length} Security Projects</span></div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {profile.resumeUrl ? (
                      <>
                        <a
                          href={resumeLink}
                          download={`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`}
                          className="cyber-btn cyber-btn-primary flex items-center gap-2"
                          id="resume-download"
                        >
                          <FiDownload /> Download Resume
                        </a>
                        <a
                          href={resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cyber-btn flex items-center gap-2"
                          id="resume-preview"
                        >
                          <FiEye /> Open Resume
                        </a>
                      </>
                    ) : (
                      <div className="text-cyber-green/50 font-mono text-xs border border-dashed border-cyber-green/20 rounded-lg px-4 py-3 bg-cyber-darker/50 w-full">
                        [!] Resume document has not been uploaded. Access the admin control panel (bottom-right lock icon) to upload.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-cyber-green/10">
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 text-[10px] sm:text-xs font-mono text-cyber-green/40 text-center sm:text-left">
                  <span>FORMAT: {profile.resumeFormat || 'PDF'}</span>
                  <span>STATUS: {profile.resumeStatus || 'Latest Version'}</span>
                  <span>UPDATED: {profile.resumeUpdated || '2026'}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }} className="mt-10 grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="cyber-card p-6 flex items-center gap-4 group">
            <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 group-hover:border-cyber-green/30 transition-colors">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </div>
            <div><h4 className="text-white font-semibold text-sm">GitHub</h4><p className="text-cyber-green/60 text-xs font-mono">{profile.githubUsername}</p></div>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="cyber-card p-6 flex items-center gap-4 group">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-500/5 rounded-xl border border-blue-500/10 group-hover:border-blue-400/30 transition-colors">
              <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </div>
            <div><h4 className="text-white font-semibold text-sm">LinkedIn</h4><p className="text-blue-400/60 text-xs font-mono">{profile.linkedinUsername}</p></div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
