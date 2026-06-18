import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { usePortfolio } from '../PortfolioContext';

export default function SkillsGraph() {
  const { data } = usePortfolio();
  const canvasRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredNode, setHoveredNode] = useState(null);

  // Core graph structure
  useEffect(() => {
    if (!inView || !data.skills.length) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas sizes
    const resize = () => {
      const rect = canvas.parentNode.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = Math.max(rect.width * 0.55, 450);
    };
    resize();
    window.addEventListener('resize', resize);

    // Node classes
    class Node {
      constructor(id, label, x, y, radius, color, isParent = false, parentId = null) {
        this.id = id;
        this.label = label;
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = radius;
        this.color = color;
        this.isParent = isParent;
        this.parentId = parentId;
        this.hovered = false;
        this.baseRadius = radius;
      }

      update(width, height) {
        // Drifting motion
        this.x += this.vx;
        this.y += this.vy;

        // Boundaries
        if (this.x < this.radius) { this.x = this.radius; this.vx *= -1; }
        if (this.x > width - this.radius) { this.x = width - this.radius; this.vx *= -1; }
        if (this.y < this.radius) { this.y = this.radius; this.vy *= -1; }
        if (this.y > height - this.radius) { this.y = height - this.radius; this.vy *= -1; }

        // Animate radius on hover
        if (this.hovered) {
          this.radius = Math.min(this.radius + 0.5, this.baseRadius * 1.35);
        } else {
          this.radius = Math.max(this.radius - 0.5, this.baseRadius);
        }
      }

      draw(ctx) {
        ctx.save();
        // Shadow/glow
        ctx.shadowBlur = this.hovered ? 20 : 8;
        ctx.shadowColor = this.color;

        // Outer ring for parent
        if (this.isParent) {
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius + 5, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Main node circle
        ctx.fillStyle = this.isParent ? this.color : '#0d1117';
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Node Label
        ctx.fillStyle = '#ffffff';
        ctx.font = this.isParent ? 'bold 11px "Orbitron", sans-serif' : '10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Dynamic label styling
        if (this.hovered) {
          ctx.fillStyle = this.color;
        }

        ctx.fillText(this.label, this.x, this.isParent ? this.y : this.y + this.radius + 12);
      }
    }

    // Build graph nodes
    const nodes = [];
    const links = [];
    const width = canvas.width;
    const height = canvas.height;

    // 1. Create central core node
    const coreNode = new Node('core', 'SRI_SHIELD', width / 2, height / 2, 28, 'var(--cyber-primary)', true);
    nodes.push(coreNode);

    // 2. Create category nodes and child skill nodes
    data.skills.forEach((cat, cIdx) => {
      const angle = (cIdx / data.skills.length) * Math.PI * 2;
      const distance = 120 + Math.random() * 20;
      const catX = width / 2 + Math.cos(angle) * distance;
      const catY = height / 2 + Math.sin(angle) * distance;

      const catNode = new Node(cat.id, cat.title.toUpperCase(), catX, catY, 18, cat.color, true, 'core');
      nodes.push(catNode);
      links.push({ source: coreNode, target: catNode, color: 'rgb(var(--cyber-primary-rgb) / 0.15)' });

      // Create skills under this category
      cat.skills.forEach((sk, sIdx) => {
        const skAngle = angle + ((sIdx - (cat.skills.length - 1) / 2) * 0.35);
        const skDistance = 75 + Math.random() * 15;
        const skX = catX + Math.cos(skAngle) * skDistance;
        const skY = catY + Math.sin(skAngle) * skDistance;

        const skNode = new Node(`${cat.id}_${sIdx}`, sk.name, skX, skY, 8, cat.color, false, cat.id);
        nodes.push(skNode);
        links.push({ source: catNode, target: skNode, color: `${cat.color}25` });
      });
    });

    // Tracking mouse movements
    let mouse = { x: null, y: null, downNode: null };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      let foundHover = null;
      nodes.forEach(node => {
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < node.radius + 8) {
          node.hovered = true;
          foundHover = node;
        } else {
          node.hovered = false;
        }
      });

      setHoveredNode(foundHover);

      if (mouse.downNode) {
        mouse.downNode.x = mouse.x;
        mouse.downNode.y = mouse.y;
      }
    };

    const handleMouseDown = () => {
      const hover = nodes.find(n => n.hovered);
      if (hover) {
        mouse.downNode = hover;
      }
    };

    const handleMouseUp = () => {
      mouse.downNode = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Spring-like node interactions (attract connected nodes)
      links.forEach(link => {
        const dx = link.target.x - link.source.x;
        const dy = link.target.y - link.source.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Define rest distance
        const restDist = link.target.isParent && link.source.isParent ? 130 : 70;
        const k = 0.005; // spring stiffness
        const force = (dist - restDist) * k;

        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        // Apply forces to pull nodes together
        if (link.target !== mouse.downNode) {
          link.target.vx -= fx;
          link.target.vy -= fy;
        }
        if (link.source !== mouse.downNode) {
          link.source.vx += fx;
          link.source.vy += fy;
        }

        // Draw connecting line
        ctx.save();
        ctx.strokeStyle = link.color;
        
        // Bold line if source or target is hovered
        if (link.source.hovered || link.target.hovered) {
          ctx.strokeStyle = link.target.color;
          ctx.lineWidth = 1.8;
          ctx.shadowBlur = 8;
          ctx.shadowColor = link.target.color;
        } else {
          ctx.lineWidth = 0.8;
        }

        ctx.beginPath();
        ctx.moveTo(link.source.x, link.source.y);
        ctx.lineTo(link.target.x, link.target.y);
        ctx.stroke();
        ctx.restore();
      });

      // Update & Draw Nodes
      nodes.forEach(node => {
        node.update(w, h);
        node.draw(ctx);
      });

      animationId = requestAnimationFrame(tick);
    };
    tick();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationId);
    };
  }, [inView, data.skills]);

  return (
    <div className="py-8" ref={ref}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <p className="font-mono text-cyber-green/60 text-sm mb-2">{'>'} view_skills_graph --interactive</p>
        <h3 className="text-white font-display text-lg tracking-wider uppercase">Skills Network Web</h3>
        <p className="text-gray-500 text-xs font-mono mt-1">Hover over nodes to explore connections. Drag nodes to reposition them.</p>
      </motion.div>

      <div className="relative w-full rounded-xl overflow-hidden border border-cyber-green/10 bg-cyber-darker/40 backdrop-blur-md glow-box">
        {/* Graph display details overlay */}
        <div className="absolute top-4 left-4 z-20 font-mono text-[10px] text-cyber-green/50 space-y-0.5 pointer-events-none">
          <p>[NET] Nodes: {data.skills.reduce((a,c)=>a+c.skills.length,0)+data.skills.length+1}</p>
          <p>[MAP] Mode: Spring Layout / Force-Directed</p>
          {hoveredNode && (
            <p className="text-white bg-cyber-darker border border-cyber-green/20 px-2 py-0.5 rounded mt-2 block animate-pulse">
              Selected: {hoveredNode.label}
            </p>
          )}
        </div>
        
        <canvas 
          ref={canvasRef} 
          className="block w-full h-[450px] cursor-grab active:cursor-grabbing"
        />
      </div>
    </div>
  );
}
