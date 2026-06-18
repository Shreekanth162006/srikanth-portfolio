import { useState, useEffect } from 'react';
import { usePortfolio } from '../PortfolioContext';

export default function LoadingScreen() {
  const { data } = usePortfolio();
  const { profile } = data;
  const [visibleLines, setVisibleLines] = useState([]);
  const [hidden, setHidden] = useState(false);

  const uppercaseName = profile.name.toUpperCase();
  const underscoreName = profile.name.toUpperCase().replace(/\s+/g, '_');

  const bootLines = [
    `> ${underscoreName}_PORTFOLIO v2.0`,
    '> Initializing secure connection...',
    '> [OK] SSL/TLS Handshake complete',
    '> [OK] Loading kernel modules...',
    '> [OK] Mounting encrypted filesystem...',
    '> [OK] Starting Firewall Service...',
    '> [OK] IDS/IPS modules loaded',
    '> [OK] Network interfaces configured',
    '> Scanning for vulnerabilities... 0 threats found',
    '> [OK] Security protocols engaged',
    '> [OK] Loading portfolio assets...',
    '> [OK] All systems operational',
    '> ',
    '> Welcome, Agent.',
    '> Access Granted. Loading Dashboard...',
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setVisibleLines(prev => [...prev, bootLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setHidden(true), 500);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`}>
      <div className="terminal-boot">
        <div className="mb-4 text-cyber-green font-display text-lg tracking-wider">
          ╔══════════════════════════════════════╗
        </div>
        <div className="mb-4 text-cyber-green font-display text-lg tracking-wider text-center">
          {uppercaseName} - CYBER PORTFOLIO
        </div>
        <div className="mb-6 text-cyber-green font-display text-lg tracking-wider">
          ╚══════════════════════════════════════╝
        </div>
        {visibleLines.map((line, index) => (
          <div
            key={index}
            className="boot-line text-cyber-green/80"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {line}
          </div>
        ))}
        <div className="mt-4 flex items-center gap-2">
          <div className="w-2 h-4 bg-cyber-green animate-type-cursor"></div>
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-between text-cyber-green/50 text-xs font-mono mb-2">
            <span className="uppercase tracking-wider">System Initialization:</span>
            <span className="font-bold text-cyber-green glow-text">
              {Math.round((visibleLines.length / bootLines.length) * 100)}%
            </span>
          </div>
          {/* Segmented Loading Bar */}
          <div className="flex gap-1.5 p-1 border border-cyber-green/30 bg-cyber-green/5 rounded-md h-7 items-center">
            {Array.from({ length: 20 }).map((_, index) => {
              const segmentProgress = (index / 20) * 100;
              const currentProgress = (visibleLines.length / bootLines.length) * 100;
              const isActive = currentProgress >= segmentProgress;
              return (
                <div
                  key={index}
                  className={`h-full flex-1 rounded-[1px] transition-all duration-300 ${
                    isActive
                      ? 'bg-cyber-green shadow-[0_0_8px_rgba(0,255,65,0.6)]'
                      : 'bg-cyber-green/5 border border-cyber-green/10'
                  }`}
                  style={{
                    transitionDelay: isActive ? `${index * 10}ms` : '0ms',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
