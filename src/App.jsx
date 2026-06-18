import { useState, useEffect } from 'react';
import { PortfolioProvider } from './PortfolioContext';
import LoadingScreen from './components/LoadingScreen';
import MatrixRain from './components/MatrixRain';
import CustomCursor from './components/CustomCursor';
import Particles from './components/Particles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import CyberActivities from './components/CyberActivities';
import Bootcamps from './components/Bootcamps';
import TerminalCLI from './components/TerminalCLI';
import Resume from './components/Resume';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable automatic browser scroll restoration on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      // Force scroll to top once loading screen is removed
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <PortfolioProvider>
      <div className="relative min-h-screen bg-cyber-darker">
        {loading && <LoadingScreen />}
        <MatrixRain />
        <CustomCursor />
        <Particles />
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Achievements />
          <CyberActivities />
          <Bootcamps />
          <TerminalCLI />
          <Resume />
          <Dashboard />
          <Contact />
          <Footer />
          <AdminPanel />
        </div>
      </div>
    </PortfolioProvider>
  );
}

export default App;
