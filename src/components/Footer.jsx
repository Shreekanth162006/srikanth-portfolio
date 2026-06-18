import { FiShield, FiHeart, FiArrowUp } from 'react-icons/fi';
import { usePortfolio } from '../PortfolioContext';

export default function Footer() {
  const { data } = usePortfolio();
  const { profile } = data;
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const nameParts = (profile.name || '').trim().split(' ');
  const lastName = nameParts[nameParts.length - 1] || '';
  const firstName = nameParts.slice(0, -1).join(' ') || '';

  return (
    <footer className="relative border-t border-cyber-green/10 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <FiShield className="text-cyber-green" />
            <span className="font-display text-cyber-green text-sm tracking-wider font-semibold">
              {firstName.toUpperCase()}<span className="text-white">.{lastName ? lastName.substring(0, 1).toUpperCase() : ''}</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm font-mono flex items-center gap-2 animate-pulse-slow">
            Built with <FiHeart className="text-cyber-red" /> passion for Cybersecurity by {firstName} <span className="text-cyber-green">{lastName}</span>
          </p>
          <button onClick={scrollToTop} className="w-10 h-10 flex items-center justify-center border border-cyber-green/20 rounded-lg text-cyber-green hover:bg-cyber-green/10 transition-colors" id="scroll-to-top">
            <FiArrowUp />
          </button>
        </div>
        <div className="mt-6 pt-4 border-t border-cyber-green/5 text-center">
          <p className="text-gray-600 text-xs font-mono">
            © {new Date().getFullYear()} {profile.name}. All rights reserved. | Secured with 🛡️
          </p>
        </div>
      </div>
    </footer>
  );
}
