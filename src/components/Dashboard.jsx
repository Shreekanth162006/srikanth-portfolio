import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiShield, FiActivity, FiWifi, FiLock, FiAlertTriangle, FiServer } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

const stats = [
  { label: 'Firewall Status', value: 'ACTIVE', icon: <FiShield />, status: 'online', color: '#00ff41' },
  { label: 'Network Monitor', value: 'SCANNING', icon: <FiActivity />, status: 'active', color: '#00e5ff' },
  { label: 'WiFi Security', value: 'WPA3', icon: <FiWifi />, status: 'secure', color: '#8b5cf6' },
  { label: 'Encryption', value: 'AES-256', icon: <FiLock />, status: 'enabled', color: '#f59e0b' },
  { label: 'Threat Level', value: 'LOW', icon: <FiAlertTriangle />, status: 'safe', color: '#00ff41' },
  { label: 'Server Status', value: 'ONLINE', icon: <FiServer />, status: 'running', color: '#00e5ff' },
];

function LiveTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="text-cyber-green font-mono text-sm">{time.toLocaleTimeString('en-US', { hour12: false })} IST</span>;
}

export default function Dashboard() {
  const { data } = usePortfolio();
  const { profile } = data;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <section className="py-20 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 hex-pattern" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} sudo systemctl status security-dashboard</p>
          <h2 className="section-title text-3xl sm:text-4xl text-white">Security <span className="text-cyber-green">Dashboard</span></h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="terminal-window glow-box">
          <div className="terminal-header justify-between">
            <div className="flex items-center gap-2">
              <div className="terminal-dot bg-red-500" /><div className="terminal-dot bg-yellow-500" /><div className="terminal-dot bg-green-500" />
              <span className="text-cyber-green/50 text-xs font-mono ml-2">security-monitor@{profile.githubUsername || 'srikanth'}</span>
            </div>
            <LiveTime />
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="bg-black/50 backdrop-blur-[20px] border border-white/10 rounded-lg p-4 hover:border-cyber-green/30 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ color: s.color }} className="text-lg">{s.icon}</span>
                    <span className="text-gray-400 text-xs font-mono">{s.label}</span>
                  </div>
                  <p className="font-display text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{
                        backgroundColor: s.color,
                        boxShadow: `0 0 8px ${s.color}`
                      }}
                    />
                    <span className="text-xs font-mono" style={{ color: `${s.color}80` }}>{s.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <p className="font-mono text-xs text-cyber-green/50 space-y-1">
                <span className="block">[LOG] System scan complete — no threats detected</span>
                <span className="block">[LOG] All endpoints secured with SSL/TLS</span>
                <span className="block text-cyber-green/30">{'>'} Monitoring..._</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
