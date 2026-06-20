import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION ---
// Set to true if you are using a single combined video file.
// Set to false if you are using separate video files (one for each step).
const USE_SINGLE_VIDEO = false;

// Path for the single video (if USE_SINGLE_VIDEO = true)
const SINGLE_VIDEO_PATH = "/videos/how_it_works_full.mp4";

// Paths for separate videos (if USE_SINGLE_VIDEO = false)
// WebM is recommended for high compression & speed; MP4 is provided as fallback.
const VIDEO_SOURCES = [
  "/videos/step_1.webm",
  "/videos/step_2.webm",
  "/videos/step_3.webm",
  "/videos/step_4.webm",
  "/videos/step_5.webm",
  "/videos/step_6.webm",
  "/videos/step_7.webm",
];

const STEP_DURATION = 6000; // Duration of each step in milliseconds (6 seconds)

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Select Your Clip",
      description: "Choose the video clip or sequence you want to generate captions for."
    },
    {
      title: "Choose Language",
      description: "Generate captions in multiple supported languages with high transcription accuracy."
    },
    {
      title: "Select Caption Mode",
      description: "Choose from different caption styles and generation modes to match your content."
    },
    {
      title: "Translate Captions",
      description: "Automatically translate captions into multiple languages to reach a wider audience."
    },
    {
      title: "Customize Caption Flow",
      description: "Apply dynamic caption flow styles, animations, and layouts that fit your brand."
    },
    {
      title: "AI Proofreading (Pro)",
      description: "Automatically review and refine captions using AI Focus on Edit technology for enhanced accuracy."
    },
    {
      title: "Advanced Caption Editor",
      description: "Fine-tune captions, timings, formatting, and styling with powerful editing tools."
    }
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoErrors, setVideoErrors] = useState(Array(steps.length).fill(false));
  const [videoLoaded, setVideoLoaded] = useState(Array(steps.length).fill(false));
  const [singleVideoError, setSingleVideoError] = useState(false);

  const videoRefs = useRef([]);
  const singleVideoRef = useRef(null);

  // Auto-advancing slider progress
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 30; // Update every 30ms for smooth transitions
    const stepIncrement = (intervalTime / STEP_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((curr) => (curr + 1) % steps.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, steps.length, activeStep]);

  // Video playback controller (for multiple videos)
  useEffect(() => {
    if (USE_SINGLE_VIDEO) return;

    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === activeStep && !videoErrors[idx]) {
          video.currentTime = 0;
          video.play().catch((err) => {
            console.log(`Auto-play blocked or video file not found for step ${idx + 1}:`, err);
            // Treat it as an error to fall back to the CSS animation
            handleVideoError(idx);
          });
        } else {
          video.pause();
        }
      }
    });
  }, [activeStep, videoErrors, USE_SINGLE_VIDEO]);

  // Video playback controller (for single combined video)
  useEffect(() => {
    if (!USE_SINGLE_VIDEO) return;
    const video = singleVideoRef.current;
    if (video && !singleVideoError) {
      const stepDurationSeconds = STEP_DURATION / 1000;
      const startTime = activeStep * stepDurationSeconds;

      video.currentTime = startTime;
      video.play().catch((err) => {
        console.log("Auto-play blocked or single video file not found:", err);
        setSingleVideoError(true);
      });
    }
  }, [activeStep, singleVideoError, USE_SINGLE_VIDEO]);

  // Check timestamp boundary for single video to loop step segments
  useEffect(() => {
    if (!USE_SINGLE_VIDEO) return;
    const video = singleVideoRef.current;
    if (!video || singleVideoError) return;

    const checkTime = () => {
      const stepDurationSeconds = STEP_DURATION / 1000;
      const endTime = (activeStep + 1) * stepDurationSeconds;
      if (video.currentTime >= endTime) {
        if (isPlaying) {
          // Progress bar handles transition naturally
        } else {
          // If paused, loop this specific step segment
          video.currentTime = activeStep * stepDurationSeconds;
        }
      }
    };

    video.addEventListener('timeupdate', checkTime);
    return () => video.removeEventListener('timeupdate', checkTime);
  }, [activeStep, isPlaying, singleVideoError, USE_SINGLE_VIDEO]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    setProgress(0);
  };

  const handleVideoError = (index) => {
    setVideoErrors((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const handleVideoLoad = (index) => {
    setVideoLoaded((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  // CSS Mockup Fallbacks for each step (for when video isn't found/loaded yet)
  const renderFallbackAnimation = (idx) => {
    switch (idx) {
      case 0: // Select Your Clip
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#0B0B0C]">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] text-text-secondary font-mono">import_media.prproj</span>
              <div className="w-6" />
            </div>

            <div className="flex-1 my-4 bg-black/40 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/5 to-transparent opacity-50" />
              <div className="text-center z-10 p-4">
                <svg className="w-10 h-10 text-accent-primary/40 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1V4a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <span className="text-xs text-white font-display font-medium block mb-1">Select Video Sequence</span>
                <span className="text-[10px] text-text-secondary">Drag and drop or select clip to transcribe</span>
              </div>
            </div>

            <div className="h-6 bg-white/[0.02] border border-white/5 rounded flex items-center justify-between px-2 text-[10px] font-mono text-text-secondary">
              <span>Selected: interview_clip_01.mp4</span>
              <span className="text-accent-primary">1080p @ 30fps</span>
            </div>
          </div>
        );
      case 1: // Choose Language
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#0B0B0C]">
            <div className="border-b border-white/5 pb-3">
              <h4 className="text-white text-xs font-bold font-display uppercase tracking-wider">Transcription Language</h4>
            </div>
            <div className="flex-grow py-4 space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] text-text-secondary uppercase tracking-wider block font-bold">Target Audio Language</label>
                <div className="h-9 bg-white/[0.02] border border-white/10 rounded-lg flex items-center justify-between px-3 text-xs text-white">
                  <span className="flex items-center gap-2">
                    <span className="text-xs">🇺🇸</span> English (US / Auto-Detect)
                  </span>
                  <span className="text-accent-primary text-[10px]">▼</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-text-secondary">
                <div className="p-2 bg-white/[0.01] border border-white/5 rounded flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" /> Multi-speaker Detection
                </div>
                <div className="p-2 bg-white/[0.01] border border-white/5 rounded flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" /> Audio Noise Filtering
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 flex justify-end items-center">
              <span className="text-[9px] text-text-secondary font-mono mr-2">99% Transcription Accuracy</span>
              <div className="w-2.5 h-2.5 rounded-full bg-accent-primary animate-pulse" />
            </div>
          </div>
        );
      case 2: // Select Caption Mode
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#0B0B0C]">
            <div className="border-b border-white/5 pb-3">
              <h4 className="text-white text-xs font-bold font-display uppercase tracking-wider">Caption Generation Modes</h4>
            </div>
            <div className="flex-grow py-3">
              <label className="text-[9px] text-text-secondary uppercase tracking-wider block font-bold mb-2">Preset Styles</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "Karaoke Glow", color: "text-[#C6FF34]", active: true },
                  { name: "Word-by-Word", color: "text-white", active: false },
                  { name: "Natural Phrase", color: "text-blue-400", active: false }
                ].map((style, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-lg border text-center transition-all duration-300 ${style.active
                        ? "border-accent-primary bg-accent-primary/5 text-white"
                        : "border-white/5 bg-white/[0.01]"
                      }`}
                  >
                    <div className={`text-[11px] font-black tracking-wide ${style.color} mb-0.5`}>Captions</div>
                    <div className="text-[8px] text-text-secondary font-mono">{style.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-text-secondary font-mono">
              <span>Preset Mode: Karaoke Active</span>
              <span className="text-accent-primary">TikTok/Reels optimized</span>
            </div>
          </div>
        );
      case 3: // Translate Captions
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#0B0B0C]">
            <div className="border-b border-white/5 pb-3">
              <h4 className="text-white text-xs font-bold font-display uppercase tracking-wider">AI Translation Engine</h4>
            </div>
            <div className="flex-grow py-4 space-y-3">
              <div className="flex justify-between items-center text-xs text-white">
                <span className="text-text-secondary text-[10px] font-mono">Translate from: English</span>
                <span className="text-accent-primary text-[10px] font-mono">⚡ Multi-Translate</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { lang: "Spanish (Español)", flag: "🇪🇸", active: true, progress: 100 },
                  { lang: "Japanese (日本語)", flag: "🇯🇵", active: true, progress: 100 },
                  { lang: "German (Deutsch)", flag: "🇩🇪", active: false, progress: 45 }
                ].map((item, i) => (
                  <div key={i} className="p-2 bg-white/[0.02] border border-white/5 rounded-lg flex items-center justify-between">
                    <span className="text-xs text-white flex items-center gap-2">
                      <span>{item.flag}</span> {item.lang}
                    </span>
                    <span className={`text-[10px] font-mono ${item.active ? 'text-accent-primary' : 'text-text-secondary'}`}>
                      {item.active ? "Ready" : `Translating... ${item.progress}%`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 4: // Customize Caption Flow
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#0B0B0C]">
            <div className="border-b border-white/5 pb-3 flex justify-between items-center">
              <h4 className="text-white text-xs font-bold font-display uppercase tracking-wider">Typography & Style Editor</h4>
              <span className="text-[9px] bg-accent-primary/10 text-accent-primary px-1.5 py-0.5 rounded font-mono">V2</span>
            </div>
            <div className="flex-grow py-3 space-y-3">
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[9px] font-mono text-text-secondary mb-1">
                    <span>FONT SIZE</span>
                    <span className="text-white">48px</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full relative">
                    <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-accent-primary rounded-full" />
                    <div className="absolute left-[75%] -top-1.5 w-4 h-4 rounded-full bg-white border border-accent-primary shadow-[0_0_8px_#C6FF34] cursor-pointer" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] font-mono text-text-secondary mb-1">
                    <span>CAPTION DELAY</span>
                    <span className="text-white">0.05s</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-accent-primary rounded-full" />
                    <div className="absolute left-[25%] -top-1.5 w-4 h-4 rounded-full bg-white border border-accent-primary shadow-[0_0_8px_#C6FF34] cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className="p-2 bg-black/30 border border-white/5 rounded-lg text-center">
                <span className="text-xs font-black text-accent-primary uppercase tracking-widest font-display animate-pulse">DYNAMIC TEXT FLOW</span>
              </div>
            </div>
          </div>
        );
      case 5: // AI Proofreading (Pro)
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#0B0B0C]">
            <div className="border-b border-white/5 pb-3">
              <h4 className="text-white text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5">
                <span className="text-accent-primary">✦</span> Focus on Edit Proofreading
              </h4>
            </div>
            <div className="flex-grow py-3 space-y-2.5">
              <div className="flex items-center justify-between text-[9px] font-mono text-text-secondary">
                <span>ANALYZING SPELLING & TIMINGS</span>
                <span className="text-accent-primary">ACTIVE SCAN</span>
              </div>
              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="p-2 bg-red-950/20 border border-red-900/30 rounded flex justify-between items-center text-red-300">
                  <span>"I bought teh plugin"</span>
                  <span>➜</span>
                  <span className="text-green-400 font-bold">"I bought the plugin"</span>
                </div>
                <div className="p-2 bg-red-950/20 border border-red-900/30 rounded flex justify-between items-center text-red-300">
                  <span>"caption grit is fast"</span>
                  <span>➜</span>
                  <span className="text-green-400 font-bold">"CaptionGrit is fast"</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 flex justify-end">
              <span className="text-[9px] text-accent-primary font-mono font-bold animate-pulse">✦ AI Autocorrections Applied</span>
            </div>
          </div>
        );
      case 6: // Advanced Caption Editor
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#0B0B0C] overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/5 to-transparent opacity-20" />
              <div className="w-48 h-24 bg-black rounded-lg border border-white/5 relative overflow-hidden flex flex-col items-center justify-end pb-4">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="px-2.5 py-1 rounded bg-[#C6FF34] text-black font-black text-[9px] uppercase tracking-wider shadow-[0_0_12px_rgba(198,255,52,0.3)]"
                >
                  EDIT TIMELINE BLOCKS
                </motion.div>
              </div>
            </div>

            <div className="space-y-1 font-mono text-[9px] mt-2 border-t border-white/5 pt-3">
              <div className="flex gap-2 items-center">
                <span className="w-8 text-accent-primary font-bold">Timeline</span>
                <div className="flex-1 flex gap-1 h-3">
                  <div className="w-[20%] bg-accent-primary border border-accent-primary/30 rounded" />
                  <div className="w-[10%] bg-white/10 border border-white/20 rounded animate-pulse" />
                  <div className="w-[25%] bg-accent-primary border border-accent-primary/30 rounded" />
                  <div className="w-[45%] bg-accent-primary border border-accent-primary/30 rounded" />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="how-it-works" className="py-32 px-6 bg-bg-secondary relative border-y border-white/5 overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            From footage to captions in <span className="font-accent text-accent-primary">7 steps</span>
          </h2>
          <p className="text-lg font-body text-text-secondary max-w-2xl mx-auto">
            Get pixel-perfect animated captions direct to your timeline. No more manual syncing, no more external websites.
          </p>
        </motion.div>

        {/* Dynamic Stepper Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Interactive Stepper */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleStepClick(idx)}
                  className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 select-none ${isActive
                    ? 'bg-bg-tertiary border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(198,255,52,0.02)]'
                    : 'bg-transparent border-transparent hover:bg-white/[0.01] hover:border-white/[0.04]'
                    }`}
                  onMouseEnter={() => setIsPlaying(false)}
                  onMouseLeave={() => setIsPlaying(true)}
                >
                  {/* Left Highlight Indicator / Stepper Number */}
                  <div className="flex gap-5 items-start">
                    <div className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center font-display font-bold text-base transition-all duration-300 z-10 ${isActive
                      ? 'bg-accent-primary border-accent-primary text-black shadow-[0_0_15px_rgba(198,255,52,0.25)]'
                      : 'bg-white/5 border-white/10 text-text-secondary group-hover:text-white group-hover:border-white/20'
                      }`}>
                      {idx + 1}
                    </div>

                    <div className="space-y-1 pt-1.5">
                      <h3 className={`text-lg font-bold tracking-tight transition-all duration-300 ${isActive ? 'text-white font-extrabold' : 'text-text-secondary group-hover:text-white'
                        }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-all duration-300 ${isActive ? 'text-text-primary' : 'text-text-secondary'
                        }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Horizontal progress bar for active card */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 rounded-b-2xl overflow-hidden">
                      <div
                        className="h-full bg-accent-primary transition-all duration-300 ease-linear shadow-[0_0_8px_#C6FF34]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Premium Video Mockup Player Container */}
          <div
            className="lg:col-span-7 flex justify-center items-center h-full"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            <div className="w-full max-w-[620px] aspect-[16/10] bg-[#0E0E10] rounded-2xl border border-white/10 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(198,255,52,0.03)] flex flex-col relative group/player">

              {/* macOS-style traffic light header */}
              <div className="px-5 py-3 border-b border-white/5 bg-[#0B0B0C] flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/20 group-hover/player:bg-red-500/80 transition-colors duration-200" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/20 group-hover/player:bg-yellow-500/80 transition-colors duration-200" />
                  <span className="w-3 h-3 rounded-full bg-green-500/20 group-hover/player:bg-green-500/80 transition-colors duration-200" />
                </div>
                <div className="px-3 py-0.5 rounded bg-white/5 text-[10px] text-text-secondary font-mono tracking-wider">
                  PREVIEW WINDOW
                </div>
                <div className="w-12" />
              </div>

              {/* Video viewport area */}
              <div className="flex-grow relative overflow-hidden bg-black/60">
                <AnimatePresence mode="wait">
                  {/* Real video layers (7 separate clips) */}
                  {!USE_SINGLE_VIDEO && steps.map((_, idx) => {
                    const showVideo = activeStep === idx && !videoErrors[idx];
                    return (
                      <video
                        key={idx}
                        ref={(el) => (videoRefs.current[idx] = el)}
                        playsInline
                        muted
                        loop
                        onLoadedData={() => handleVideoLoad(idx)}
                        onError={() => handleVideoError(idx)}
                        className={`absolute inset-0 w-full h-full ${idx === 5 ? 'object-contain' : 'object-cover'} transition-all duration-500 ease-out ${showVideo ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                          }`}
                      >
                        <source src={VIDEO_SOURCES[idx]} type="video/webm" />
                      </video>
                    );
                  })}

                  {/* Real video layer (Single combined video) */}
                  {USE_SINGLE_VIDEO && !singleVideoError && (
                    <video
                      ref={singleVideoRef}
                      playsInline
                      muted
                      loop
                      src={SINGLE_VIDEO_PATH}
                      type="video/mp4"
                      onError={() => setSingleVideoError(true)}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                    />
                  )}

                  {/* Interactive CSS Fallback Graphics when video is not found/errors */}
                  {((!USE_SINGLE_VIDEO && videoErrors[activeStep]) || (USE_SINGLE_VIDEO && singleVideoError)) && (
                    <motion.div
                      key={`fallback-${activeStep}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {renderFallbackAnimation(activeStep)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Player timeline footer control bar */}
              <div className="px-5 py-3.5 border-t border-white/5 bg-[#0B0B0C] flex items-center justify-between text-xs font-mono select-none">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-accent-primary hover:text-black flex items-center justify-center transition-all duration-200 border border-white/5 text-white"
                >
                  {isPlaying ? (
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <rect x="4" y="4" width="4" height="16" />
                      <rect x="16" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <div className="text-text-secondary text-[11px] shrink-0 font-semibold select-none flex items-center gap-2">
                  <span>0{activeStep + 1}</span>
                  <span className="opacity-30">/</span>
                  <span className="opacity-50">0{steps.length}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
