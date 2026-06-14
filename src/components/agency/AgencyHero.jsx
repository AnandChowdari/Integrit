import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle2, Film, Users, Play,
  MessageSquare, UserCheck, Coins,
  Settings, Maximize2, Plus, Minus, Move
} from 'lucide-react';
import { siteConfig } from '../../config/site';
import { fadeUpVariant, slideRightVariant } from '../../lib/motionVariants';
import AnimatedCounter from '../ui/AnimatedCounter';
import SectionDivider from '../ui/SectionDivider';
import TypewriterText from '../ui/TypewriterText';
import SideRays from '../ui/SideRays';

export default function AgencyHero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 18, y: -y * 18 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const trustItems = [
    "Marketing + Editing",
    "AI Lead Funnels",
    "Creator Tools",
    "Done-For-You"
  ];



  const nodes = [
    {
      id: 'content',
      label: 'Content Engine',
      sub: 'Instagram / YouTube',
      icon: Film,
      x: 100, y: 250,
      color: '#ff007f',
    },
    {
      id: 'agent',
      label: 'AI Agent Core',
      sub: 'Integrit Controller',
      image: '/logo.jpg',
      x: 400, y: 250,
      isCenter: true,
    },
    {
      id: 'lead',
      label: 'Lead Capture',
      sub: 'Webhook Trigger',
      icon: Users,
      x: 250, y: 130,
      color: '#0066ff',
    },
    {
      id: 'automation',
      label: 'Workflow Engine',
      sub: 'Make.com Action',
      icon: Play,
      x: 550, y: 130,
      color: '#ff6600',
    },
    {
      id: 'crm',
      label: 'CRM & Notify',
      sub: 'WhatsApp Business',
      icon: MessageSquare,
      x: 250, y: 370,
      color: '#25d366',
    },
    {
      id: 'customer',
      label: 'New Customer',
      sub: 'Lead Converted',
      icon: UserCheck,
      x: 550, y: 370,
      color: '#8a3ffc',
    },
    {
      id: 'revenue',
      label: 'Revenue Closed',
      sub: '+$1,200 Stripe Pay',
      icon: Coins,
      x: 700, y: 250,
      color: '#00c6ff',
      badge: '+$1,200.00'
    }
  ];

  const paths = [
    { id: 'path-content-agent', from: 'content', to: 'agent', d: 'M 100 250 L 400 250' },
    { id: 'path-agent-lead', from: 'agent', to: 'lead', d: 'M 400 250 C 350 250, 300 130, 250 130' },
    { id: 'path-lead-auto', from: 'lead', to: 'automation', d: 'M 250 130 L 550 130' },
    { id: 'path-auto-crm', from: 'automation', to: 'crm', d: 'M 550 130 C 650 180, 150 320, 250 370' },
    { id: 'path-crm-cust', from: 'crm', to: 'customer', d: 'M 250 370 L 550 370' },
    { id: 'path-cust-rev', from: 'customer', to: 'revenue', d: 'M 550 370 C 600 370, 650 250, 700 250' }
  ];

  const radiatingPaths = [
    { id: 'rad-agent-content', d: 'M 400 250 L 100 250' },
    { id: 'rad-agent-lead', d: 'M 400 250 C 350 250, 300 130, 250 130' },
    { id: 'rad-agent-auto', d: 'M 400 250 C 450 250, 500 130, 550 130' },
    { id: 'rad-agent-crm', d: 'M 400 250 C 350 250, 300 370, 250 370' },
    { id: 'rad-agent-cust', d: 'M 400 250 C 450 250, 500 370, 550 370' },
    { id: 'rad-agent-rev', d: 'M 400 250 L 700 250' }
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-bg-primary">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <SideRays
            speed={2.5}
            rayColor1="#a7ff20"
            rayColor2="#96c8ff"
            intensity={2}
            spread={2}
            origin="top-right"
            tilt={0}
            saturation={1.5}
            blend={0.75}
            falloff={1.6}
            opacity={1.0}
          />
        </div>
        <div className="absolute top-[30%] left-[20%] w-[600px] h-[600px] bg-accent-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E1E1E_1px,transparent_1px),linear-gradient(to_bottom,#1E1E1E_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
        <div className="noise-overlay" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-4 items-center">

          {/* Left Text */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >


            <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-[clamp(3.2rem,5.2vw,4.8rem)] leading-[1.08] tracking-tight text-white">
              We grow your<br />
              <span className="font-accent text-accent-primary">audience & revenue.</span>
            </h1>

            <div className="mt-4 text-2xl md:text-3xl lg:text-4xl font-display font-bold text-text-secondary leading-tight tracking-tight">
              <TypewriterText
                phrases={[
                  'Then we convert them.',
                  'Then we automate your leads.',
                  'Then we scale your revenue.',
                  'Then we build your system.',
                ]}
                typingSpeed={70}
                deletingSpeed={35}
                pauseDuration={2200}
                className=""
              />
            </div>

            <p className="mt-6 text-base md:text-lg font-body text-text-secondary max-w-md leading-relaxed">
              Integrit combines content marketing, video editing, and AI automation funneling
              to turn views into real, paying leads — on autopilot.
            </p>



            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/contact"
                className="px-6 py-3.5 bg-accent-primary text-black font-semibold font-display rounded-xl
                           hover:bg-accent-secondary transition-all hover:-translate-y-0.5
                           shadow-[0_0_24px_rgba(198,255,52,0.2)] hover:shadow-[0_0_32px_rgba(198,255,52,0.35)]
                           text-center text-sm">
                Book a Discovery Call →
              </Link>
              <Link to="/services"
                className="px-6 py-3.5 border border-accent-primary/40 text-accent-primary font-display rounded-xl
                           hover:bg-accent-primary/10 transition-all text-center text-sm">
                See Our Services
              </Link>
            </div>


          </motion.div>

          {/* Right Visual (3D AI Automation Workflow) */}
          <motion.div
            variants={slideRightVariant}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center lg:justify-start w-full mt-12 lg:mt-0 max-w-[clamp(320px,90vw,360px)] sm:max-w-[clamp(360px,70vw,520px)] lg:max-w-[600px] xl:max-w-[680px] mx-auto lg:mx-0 lg:-ml-24 xl:-ml-40"
          >
            {/* 3D Perspective Wrapper */}
            <div
              className="w-full relative select-none cursor-crosshair group"
              style={{ perspective: '1200px', containerType: 'inline-size' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* CSS Style block for custom animations */}
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes flowDash {
                  to {
                    stroke-dashoffset: -40;
                  }
                }
                .animate-flow-dash-hero {
                  animation: flowDash 3s linear infinite;
                }
                .glow-path {
                  filter: drop-shadow(0 0 6px rgba(192, 255, 52, 0.4));
                }
                .node-shadow {
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(192, 255, 52, 0.03);
                }
                .center-node-glow {
                  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.9), 0 0 25px rgba(192, 255, 52, 0.25);
                }
              `}} />

              {/* Scaled Wrapper to make 3D Canvas responsive */}
              <div className="w-full aspect-[8/5] relative">
                <div
                  className="absolute top-0 left-0 origin-top-left"
                  style={{
                    width: '800px',
                    height: '500px',
                    transform: 'scale(calc(100cqw / 800))'
                  }}
                >
                  {/* Tilted Canvas */}
                  <div
                    className="w-full h-full relative border border-white/10 bg-[#0A0A0A] rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]"
                    style={{
                      transform: `rotateX(${15 + tilt.y}deg) rotateY(${-12 + tilt.x}deg) rotateZ(2deg)`,
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.15s ease-out'
                    }}
                  >
                {/* Dot Grid Background */}
                <div
                  className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle,#C0FF34_1px,transparent_1.5px)] bg-[size:1.5rem_1.5rem]"
                  style={{ transform: 'translateZ(-1px)' }}
                />

                {/* Automation Workspace Top UI Header Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-10 border-b border-white/5 bg-[#0A0A0A]/90 px-4 flex items-center justify-between z-20 font-sans"
                  style={{ transform: 'translateZ(15px)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E05252]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E0A052]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#52C452]" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-white font-display uppercase">
                      Content Funnel Workflow Engine
                    </span>
                    <span className="text-[9px] bg-accent-primary/10 border border-accent-primary/30 text-accent-primary px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-white/30 text-[9px] font-mono">
                    <span className="hidden sm:inline">FPS: 60/60</span>
                    <span>ID: 8a4d-f9e2</span>
                  </div>
                </div>

                {/* Floating controls toolbar on left side */}
                <div
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20 bg-[#111]/90 border border-white/10 p-1.5 rounded-lg text-white/40 shadow-xl"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <button className="p-1 hover:text-accent-primary transition-colors" aria-label="Move"><Move className="w-3.5 h-3.5" /></button>
                  <button className="p-1 hover:text-accent-primary transition-colors" aria-label="Zoom in"><Plus className="w-3.5 h-3.5" /></button>
                  <button className="p-1 hover:text-accent-primary transition-colors" aria-label="Zoom out"><Minus className="w-3.5 h-3.5" /></button>
                  <button className="p-1 hover:text-accent-primary transition-colors" aria-label="Fullscreen"><Maximize2 className="w-3.5 h-3.5" /></button>
                  <button className="p-1 hover:text-accent-primary transition-colors" aria-label="Settings"><Settings className="w-3.5 h-3.5" /></button>
                </div>

                {/* SVG Connections Canvas */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  viewBox="0 0 800 500"
                  style={{ transform: 'translateZ(5px)' }}
                >
                  <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Radiating AI Control lines */}
                  {radiatingPaths.map((path) => (
                    <path
                      key={path.id}
                      d={path.d}
                      fill="none"
                      stroke="rgba(192, 255, 52, 0.05)"
                      strokeWidth="1.5"
                    />
                  ))}

                  {/* Sequential Main Flow Lines */}
                  {paths.map((path) => (
                    <g key={path.id}>
                      <path
                        d={path.d}
                        fill="none"
                        stroke="#C0FF34"
                        strokeWidth="3"
                        strokeOpacity="0.1"
                        className="glow-path"
                      />
                      <path
                        id={path.id}
                        d={path.d}
                        fill="none"
                        stroke="rgba(192, 255, 52, 0.4)"
                        strokeWidth="1.5"
                        strokeDasharray="6 8"
                        className="animate-flow-dash-hero"
                      />
                    </g>
                  ))}

                  {/* Flowing Data Particles */}
                  {paths.map((path, idx) => (
                    <g key={`particle-${path.id}`}>
                      <circle r="3.5" fill="#C0FF34" filter="url(#glow)">
                        <animateMotion dur={`${3 + idx * 0.4}s`} repeatCount="indefinite">
                          <mpath href={`#${path.id}`} />
                        </animateMotion>
                      </circle>
                      <circle r="2.5" fill="#ffffff" filter="url(#glow)" opacity="0.8">
                        <animateMotion dur={`${3 + idx * 0.4}s`} begin="1.5s" repeatCount="indefinite">
                          <mpath href={`#${path.id}`} />
                        </animateMotion>
                      </circle>
                    </g>
                  ))}
                </svg>

                {/* HTML Cards (Tilted & Hovering) */}
                {nodes.map((node) => {
                  const Icon = node.icon;
                  const isCenter = node.isCenter;
                  return (
                    <div
                      key={node.id}
                      className={`absolute z-20 rounded-xl p-2.5 flex items-center gap-2 border transition-all duration-300 ${
                        isCenter
                          ? 'w-[155px] sm:w-[170px] h-[72px] sm:h-[80px] border-accent-primary bg-black/90 center-node-glow'
                          : 'w-[130px] sm:w-[140px] h-[56px] sm:h-[64px] border-white/10 bg-neutral-950/80 backdrop-blur-md node-shadow hover:border-accent-primary/40'
                      }`}
                      style={{
                        left: `${(node.x / 800) * 100}%`,
                        top: `${(node.y / 500) * 100}%`,
                        transform: `translate(-50%, -50%) translateZ(${isCenter ? '32px' : '20px'})`,
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Connection Ports */}
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 border border-white/20 absolute -left-0.5 top-1/2 -translate-y-1/2" />
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 border border-white/20 absolute -right-0.5 top-1/2 -translate-y-1/2" />

                      {/* Status indicator */}
                      <div className="w-1 h-full rounded-l absolute left-0 top-0 bottom-0 bg-accent-primary opacity-80" />

                      {/* Icon Container */}
                      <div
                        className={`rounded flex items-center justify-center shrink-0 ${
                          isCenter
                            ? 'w-9 h-9 border border-accent-primary/50 text-accent-primary overflow-hidden'
                            : 'w-7.5 h-7.5 border'
                        }`}
                        style={!isCenter ? {
                          backgroundColor: `${node.color}15`,
                          borderColor: `${node.color}35`,
                          color: node.color
                        } : {}}
                      >
                        {node.image ? (
                          <img src={node.image} alt="Integrit Logo" className="w-full h-full object-cover rounded" />
                        ) : (
                          <Icon className={isCenter ? 'w-5 h-5' : 'w-4 h-4'} style={!isCenter ? { color: node.color } : {}} />
                        )}
                      </div>

                      {/* Text details */}
                      <div className="overflow-hidden">
                        <span className="font-sans font-bold text-[9px] sm:text-[10px] text-white leading-tight block truncate">
                          {node.label}
                        </span>
                        <span className="font-mono text-[7px] sm:text-[8px] text-text-secondary leading-none block truncate mt-0.5">
                          {node.sub}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Bottom Status / Log Bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-8 border-t border-white/5 bg-[#0A0A0A]/95 px-4 flex items-center justify-between z-20 font-mono text-[8px] text-white/50"
                  style={{ transform: 'translateZ(15px)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                    <span>[System Status] Listening for trigger webhooks...</span>
                  </div>
                  <div className="text-accent-primary font-bold">
                    Execution completed (1.2s)
                  </div>
                </div>

                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <SectionDivider direction="down" />
    </section>
  );
}
