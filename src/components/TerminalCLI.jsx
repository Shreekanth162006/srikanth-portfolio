import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { usePortfolio } from '../PortfolioContext';

export default function TerminalCLI() {
  const { data, theme, setTheme } = usePortfolio();
  const { profile } = data;
  const [history, setHistory] = useState([
    { text: 'Srikanth Cyber Terminal Shell v1.0.0', type: 'system' },
    { text: 'Type "help" to list all available security command tools.', type: 'system' },
    { text: ' ', type: 'system' }
  ]);
  const [input, setInput] = useState('');
  const [ctfStep, setCtfStep] = useState(0); // 0 = not in game, 1 = puzzle started
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = input.trim();
    setInput('');
    if (!cmd) return;

    // Add user command to history
    setHistory(prev => [...prev, { text: `visitor@sri-terminal$ ${cmd}`, type: 'input' }]);

    // Game state check
    if (ctfStep === 1) {
      if (cmd.toUpperCase() === 'SRIKANTH_CYBER_SHIELD') {
        setHistory(prev => [
          ...prev,
          { text: '[SUCCESS] Decryption complete! Target file unlocked.', type: 'success' },
          { text: '🔑 FLAG: CTF{srikanth_cyber_shield_master}', type: 'success' },
          { text: 'Congratulations, Agent! You cleared the decryption puzzle.', type: 'system' }
        ]);
        setCtfStep(0);
      } else if (cmd.toLowerCase() === 'exit') {
        setHistory(prev => [...prev, { text: 'CTF puzzle aborted.', type: 'system' }]);
        setCtfStep(0);
      } else {
        setHistory(prev => [
          ...prev,
          { text: '[ERROR] Hash mismatch! Decrypted value is incorrect. Try again or type "exit".', type: 'error' }
        ]);
      }
      return;
    }

    const tokens = cmd.toLowerCase().split(' ');
    const primaryCmd = tokens[0];

    switch (primaryCmd) {
      case 'help':
        setHistory(prev => [
          ...prev,
          { text: 'Available Commands:', type: 'system' },
          { text: '  whoami    - Displays core operator biological profile', type: 'system' },
          { text: '  skills    - Lists loaded technical modules', type: 'system' },
          { text: '  projects  - Scans active repository projects', type: 'system' },
          { text: '  theme     - Switch UI theme. Usage: theme [green/purple/blue/red]', type: 'system' },
          { text: '  flag      - Initiates decrypted payload security challenge', type: 'system' },
          { text: '  clear     - Clears the terminal screen history log', type: 'system' }
        ]);
        break;

      case 'whoami':
        setHistory(prev => [
          ...prev,
          { text: `NAME: ${profile.name}`, type: 'output' },
          { text: `LOCATION: ${profile.location}`, type: 'output' },
          { text: `BIO: ${profile.bio}`, type: 'output' },
          { text: `SOCIAL: GitHub(${profile.githubUsername}) | LinkedIn(${profile.linkedinUsername})`, type: 'output' }
        ]);
        break;

      case 'skills':
        const skillsList = data.skills.map(c => `${c.title.toUpperCase()}: ${c.skills.map(s => s.name).join(', ')}`);
        setHistory(prev => [
          ...prev,
          { text: 'Loading Technical Modules...', type: 'system' },
          ...skillsList.map(text => ({ text: `  ▸ ${text}`, type: 'output' }))
        ]);
        break;

      case 'projects':
        setHistory(prev => [
          ...prev,
          { text: 'Scanning Repositories...', type: 'system' },
          ...data.projects.map(p => ({ text: `  ▸ [${p.title}] ${p.description} (${p.github})`, type: 'output' }))
        ]);
        break;

      case 'theme':
        const targetTheme = tokens[1];
        if (['green', 'purple', 'blue', 'red'].includes(targetTheme)) {
          setTheme(targetTheme);
          setHistory(prev => [...prev, { text: `Theme successfully updated to [${targetTheme}].`, type: 'success' }]);
        } else {
          setHistory(prev => [
            ...prev,
            { text: `Active Theme: ${theme}`, type: 'output' },
            { text: 'Usage: theme [green|purple|blue|red]', type: 'system' }
          ]);
        }
        break;

      case 'flag':
        setHistory(prev => [
          ...prev,
          { text: '🛡️ [ALERT] Securing system for challenge environment...', type: 'error' },
          { text: 'DECRYPTION CHALLENGE STARTED:', type: 'system' },
          { text: 'Decode this Base64 payload to retrieve the target flag:', type: 'system' },
          { text: '  >> U1JJS0FOVEhfQ1lCRVJfU0hJRUxE <<', type: 'output' },
          { text: 'Enter decrypted plaintext value (or "exit" to quit):', type: 'system' }
        ]);
        setCtfStep(1);
        break;

      case 'clear':
        setHistory([]);
        break;

      default:
        setHistory(prev => [...prev, { text: `bash: ${primaryCmd}: command not found. Type "help" for tools.`, type: 'error' }]);
    }
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 hex-pattern opacity-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} connect --port 1337 terminal.sri</p>
          <h2 className="section-title text-3xl sm:text-4xl text-white">Interactive <span className="text-cyber-green">Terminal</span></h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="terminal-window glow-box max-w-4xl mx-auto cursor-text"
          onClick={focusInput}
        >
          {/* Header */}
          <div className="terminal-header justify-between">
            <div className="flex items-center gap-2">
              <div className="terminal-dot bg-red-500" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-green-500" />
              <span className="text-cyber-green/50 text-xs font-mono ml-2">ssh guest@sri-cyber-terminal</span>
            </div>
            <span className="text-cyber-green/40 text-[10px] font-mono">[PORT 1337]</span>
          </div>

          {/* Body */}
          <div ref={terminalBodyRef} className="p-6 h-[320px] overflow-y-auto font-mono text-xs space-y-2 select-text">
            {history.map((line, idx) => {
              let color = 'text-cyber-text';
              if (line.type === 'system') color = 'text-cyber-green/50';
              if (line.type === 'error') color = 'text-cyber-red/80';
              if (line.type === 'success') color = 'text-cyber-green font-bold';
              if (line.type === 'input') color = 'text-white font-semibold';
              return (
                <div key={idx} className={`${color} leading-relaxed whitespace-pre-wrap`}>
                  {line.text}
                </div>
              );
            })}
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-2 px-6 py-3 border-t border-cyber-green/10 bg-cyber-darker/50">
            <span className="text-cyber-green font-mono text-xs select-none">
              {ctfStep === 1 ? 'decrypt-payload$ ' : 'visitor@sri-terminal$ '}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent text-white font-mono text-[16px] sm:text-xs outline-none border-none caret-cyber-green"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder={ctfStep === 1 ? 'Enter plaintext...' : 'Type a command (try "help", "flag", "theme")...'}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
