import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Film, Eye, Users, Coins } from 'lucide-react';

export default function AgencyHero() {
  const trustItems = [
    "Marketing + Editing",
    "AI Lead Funnels",
    "Creator Tools",
    "Done-For-You"
  ];

  const flywheelNodes = [
    { id: 'content', label: 'Content', icon: Film, delay: 0 },
    { id: 'views', label: 'Views', icon: Eye, delay: 0.2 },
    { id: 'leads', label: 'Leads', icon: Users, delay: 0.4 },
    { id: 'revenue', label: 'Revenue', icon: Coins, delay: 0.6 }
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-bg-primary">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[30%] left-[20%] w-[600px] h-[600px] bg-accent-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E1E1E_1px,transparent_1px),linear-gradient(to_bottom,#1E1E1E_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
        <div className="noise-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none border border-accent-primary/30 bg-accent-primary/5 text-accent-primary text-sm font-medium mb-8 uppercase tracking-wider">
              <ZapIcon className="w-4 h-4" />
              AI Automations + Marketing Agency
            </div>
            
            <h1 className="font-display text-5xl md:text-[5rem] font-bold leading-[1.05] mb-6 text-white tracking-tight">
              We grow your audience.<br />
              <span className="text-text-muted">Then we convert them.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-xl">
              Integrit combines content marketing, video editing, and AI automation funneling to turn views into real, paying leads — on autopilot.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
              <Link 
                to="/contact"
                className="bg-accent-primary hover:bg-accent-secondary text-black px-8 py-4 rounded-none font-bold text-lg transition-all shadow-[0_0_20px_rgba(198,255,52,0.15)] hover:shadow-[0_0_30px_rgba(198,255,52,0.3)] hover:-translate-y-1 flex items-center justify-center"
              >
                Work With Us
              </Link>
              <Link 
                to="/services"
                className="flex items-center justify-center px-8 py-4 rounded-none font-bold text-lg border border-accent-primary/50 text-accent-primary hover:bg-accent-primary/10 transition-all"
              >
                See Our Services
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {trustItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-text-secondary font-medium">
                  <CheckCircle2 className="w-4 h-4 text-accent-primary" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual (Flywheel Diagram) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center w-full"
          >
            <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]">
              
              {/* Connecting Lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#C6FF34" />
                  </marker>
                </defs>
                {/* Square path with rounded corners connecting the nodes */}
                <path 
                  d="M 100,50 L 300,50 A 50,50 0 0 1 350,100 L 350,300 A 50,50 0 0 1 300,350 L 100,350 A 50,50 0 0 1 50,300 L 50,100 A 50,50 0 0 1 100,50 Z" 
                  fill="none" 
                  stroke="#C6FF34" 
                  strokeWidth="2" 
                  strokeDasharray="8 8" 
                  className="animate-flow-dash opacity-50"
                  markerEnd="url(#arrowhead)"
                />
              </svg>

              {/* Nodes */}
              {flywheelNodes.map((node, i) => {
                const Icon = node.icon;
                // Position nodes at 4 corners roughly
                const positions = [
                  { top: '-20px', left: '50%', transform: 'translateX(-50%)' }, // Top (Content)
                  { top: '50%', right: '-20px', transform: 'translateY(-50%)' }, // Right (Views)
                  { bottom: '-20px', left: '50%', transform: 'translateX(-50%)' }, // Bottom (Leads)
                  { top: '50%', left: '-20px', transform: 'translateY(-50%)' } // Left (Revenue)
                ];
                
                return (
                  <motion.div
                    key={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + node.delay, type: 'spring', stiffness: 100 }}
                    className="absolute z-10 glass-card p-4 rounded-full flex flex-col items-center justify-center shadow-xl border-accent-primary/20 bg-surface/90"
                    style={{ ...positions[i], width: '100px', height: '100px' }}
                  >
                    <Icon className="w-8 h-8 text-accent-primary mb-1" />
                    <span className="font-display font-bold text-xs text-white uppercase tracking-wider">{node.label}</span>
                  </motion.div>
                );
              })}

              {/* Center Element */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-24 h-24 rounded-full bg-accent-primary/10 border border-accent-primary shadow-[0_0_30px_rgba(198,255,52,0.2)]"
              >
                <ZapIcon className="w-10 h-10 text-accent-primary animate-pulse" />
              </motion.div>

            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

function ZapIcon(props) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor"/>
    </svg>
  );
}
