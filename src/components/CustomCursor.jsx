import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    // Hide on mobile / touch devices
    if ('ontouchstart' in window) return;

    let lastSpawn = 0;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const now = Date.now();
      if (now - lastSpawn > 35) {
        lastSpawn = now;
        // Cyberpunk drift particles: blocky movement
        const driftX = (Math.random() - 0.5) * 24;
        const driftY = (Math.random() - 0.5) * 24;
        const size = Math.random() * 4 + 4; // size between 4px and 8px

        const newParticle = {
          id: Math.random().toString(36).substring(2, 9),
          x: e.clientX,
          y: e.clientY,
          driftX,
          driftY,
          size
        };

        setTrail((prev) => [...prev.slice(-15), newParticle]);

        setTimeout(() => {
          setTrail((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 600);
      }
    };

    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleHover = (e) => {
      const target = e.target;
      if (!target) return;
      
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable') ||
        target.getAttribute('role') === 'button'
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseenter', enter);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseenter', enter);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Outer HUD brackets wrapper */}
      <div
        className={`custom-cursor ${hovering ? 'hover' : ''} ${clicked ? 'clicked' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      >
        <div className="hud-corner top-left" />
        <div className="hud-corner top-right" />
        <div className="hud-corner bottom-left" />
        <div className="hud-corner bottom-right" />
        <div className="hud-crosshair" />
      </div>

      {/* Center diamond indicator */}
      <div 
        className={`cursor-dot-wrapper ${hovering ? 'hover' : ''} ${clicked ? 'clicked' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      >
        <div className="cursor-dot-core" />
      </div>

      {/* Glitch square trails */}
      {trail.map((p) => (
        <div
          key={p.id}
          className="cursor-particle"
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--drift-x': `${p.driftX}px`,
            '--drift-y': `${p.driftY}px`,
          }}
        />
      ))}
    </>
  );
}
