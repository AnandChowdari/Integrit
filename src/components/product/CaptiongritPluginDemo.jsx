import { useState } from 'react';

const langs = [
  { id: 'te', label: 'Telugu', captions: ['నమస్తే అందరికీ', 'ఈ వీడియోలో', 'మీకు చూపిస్తాను', 'ధన్యవాదాలు'] },
  { id: 'hi', label: 'Hindi', captions: ['नमस्ते दोस्तों', 'इस वीडियो में', 'आपको दिखाता हूँ', 'धन्यवाद'] },
  { id: 'ml', label: 'Malayalam', captions: ['നമസ്കാരം', 'ഈ വീഡിയോയിൽ', 'നിങ്ങൾക്ക് കാണിക്കും', 'നന്ദി'] },
  { id: 'ta', label: 'Tamil', captions: ['வணக்கம் நண்பர்களே', 'இந்த వీడియోவில்', 'உங்களுக்கு காட்டுகிறேன்', 'நன்றி'] },
  { id: 'teng', label: 'Tenglish', captions: ['Andaru ki namaste', 'Ee video lo', 'meeku chupistanu', 'Thanks ra'] },
  { id: 'hing', label: 'Hinglish', captions: ['Kya haal hai sab', 'Is video mein', 'aapko dikhaunga', 'Thanks yaar'] },
  { id: 'en', label: 'English', captions: ['Hello everyone', 'In this video', 'I will show you', 'Thank you'] },
];

const waveHeights = [6, 10, 16, 22, 28, 32, 24, 18, 30, 26, 20, 14, 8, 18, 28, 34, 26, 20, 12, 24, 30, 22, 16, 10, 20, 28, 24, 18, 12, 8];
const times = ['00:00:02', '00:00:05', '00:00:09', '00:00:14'];

// Generate static random animation durations for the waveform at module level
const waveDurations = waveHeights.map(() => (.8 + Math.random() * .8).toFixed(2));

// Generate static timeline ticks heights at module level
const timelineTicks = Array.from({ length: 40 }, () => 4 + Math.floor(Math.random() * 20));

export default function CaptiongritPluginDemo() {
  const [activeLang, setActiveLang] = useState('teng');
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Select language & press run');
  const [activeCaption, setActiveCaption] = useState('');
  const [captionLogs, setCaptionLogs] = useState([]);
  const [isScanning, setIsScanning] = useState(false);



  // Run the demo sequence
  const runDemo = () => {
    if (running) return;
    setRunning(true);
    setIsScanning(true);
    setProgress(0);
    setCaptionLogs([]);
    setActiveCaption('');
    setStatusText('Reading audio track...');

    // Progress scanning interval
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setStatusText('Generating captions...');
        
        // Start showing captions sequentially
        const langObj = langs.find(l => l.id === activeLang);
        showCaptions(langObj);
      }
    }, 40);
  };

  const showCaptions = (langObj) => {
    let index = 0;
    
    const showNextCaption = () => {
      if (index >= langObj.captions.length) {
        setStatusText(`${langObj.captions.length} captions exported`);
        setActiveCaption('');
        setRunning(false);
        return;
      }

      const newLog = {
        time: times[index],
        text: langObj.captions[index],
        id: Date.now() + index
      };

      setCaptionLogs(prev => [...prev, newLog]);
      setActiveCaption(langObj.captions[index]);
      
      index++;
      setTimeout(showNextCaption, 900);
    };

    setTimeout(showNextCaption, 300);
  };

  return (
    <div className="w-full max-w-2xl bg-[#1a1a1c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs select-none">
      {/* CSS Keyframe animations nested inside a style block for self-containment */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanline {
          0% { left: -4px }
          100% { left: calc(100% + 4px) }
        }
        @keyframes wavepulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.3); }
        }
        @keyframes captionpop {
          0% { opacity: 0; transform: scale(0.96) translateY(4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pulse-ring {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.6); }
        }
      `}} />

      {/* Plugin Header Bar */}
      <div className="bg-[#252528] border-b border-white/5 px-4 py-3 flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#e05252]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#e0a052]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#52c452]" />
          <span className="ml-2 font-sans text-[11px] font-medium text-text-secondary">
            Captiongrit — Adobe After Effects
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-sans text-[10px] text-accent-primary bg-accent-primary/10 border border-accent-primary/20 px-2 py-0.5 rounded-full">
            Plugin active
          </span>
        </div>
      </div>

      {/* Main Workspace split: stacked on mobile, side-by-side on desktop */}
      <div className="flex flex-col md:flex-row md:h-[420px]">
        {/* Left Side: Video Preview & Waveform / Timeline */}
        <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-white/5">
          
          {/* Video Preview Container */}
          <div className="flex-grow min-h-[220px] bg-[#0c0c0e] flex items-center justify-center p-6 relative overflow-hidden">
            <div className="w-full max-w-sm aspect-video bg-[#18181b] border border-white/10 rounded-lg relative overflow-hidden flex items-center justify-center">
              {/* Fake Video Icon */}
              <div className="text-white/20 select-none pointer-events-none">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" opacity="0.3" />
                </svg>
              </div>

              {/* Caption Overlay */}
              {activeCaption && (
                <div 
                  className="absolute bottom-4 left-4 right-4 text-center font-sans text-xs md:text-sm font-bold text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10 tracking-wide"
                  style={{ animation: 'captionpop 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                >
                  {activeCaption}
                </div>
              )}
            </div>
          </div>

          {/* Audio Waveform Track */}
          <div className="bg-[#1a1a1c] p-4 border-t border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-sans text-[9px] font-semibold text-text-secondary tracking-wider uppercase">
                Audio Waveform
              </span>
              
              {/* Progress bar container */}
              <div className={`h-1.5 flex-grow bg-white/5 rounded-full overflow-hidden ${running ? 'block' : 'hidden'}`}>
                <div 
                  className="h-full bg-accent-primary transition-all duration-[40ms] ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Waveform Visualization Bars */}
            <div className="flex gap-1 items-center justify-between h-9 overflow-hidden">
              {waveHeights.map((h, i) => {
                // Determine color based on progress scanning
                const activeIndex = Math.floor((progress / 100) * waveHeights.length);
                const isPassed = running && i < activeIndex;
                return (
                  <div
                    key={i}
                    className="w-1.5 rounded-full shrink-0 transition-colors duration-200"
                    style={{
                      height: `${h}px`,
                      backgroundColor: isPassed ? '#c6ff34' : '#2b3b5c',
                      animation: running && !isScanning ? 'none' : `wavepulse ${waveDurations[i]}s ease-in-out ${i * 0.04}s infinite`
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Timeline Tracks preview */}
          <div className="bg-[#161618] p-3 border-t border-white/5">
            <div className="flex gap-[3px] items-end h-6 overflow-hidden">
              {timelineTicks.map((h, i) => (
                <div
                  key={i}
                  className="w-1 rounded-sm shrink-0"
                  style={{
                    height: `${h}px`,
                    backgroundColor: running && (i < Math.floor((progress / 100) * 40)) ? 'rgba(198,255,52,0.15)' : '#1e283b'
                  }}
                />
              ))}
            </div>
            {/* Color tracks */}
            <div className="mt-2.5 flex gap-2">
              <div className="h-2 rounded bg-blue-600/30 border border-blue-500/20 flex-[2]" />
              <div className="h-2 rounded bg-purple-600/30 border border-purple-500/20 flex-[3]" />
              <div className="h-2 rounded bg-green-600/30 border border-green-500/20 flex-[2]" />
            </div>
          </div>

        </div>

        {/* Right Side: Options & Logging */}
        <div className="w-full md:w-56 bg-[#1e1e22] flex flex-col p-4">
          
          {/* Brand/Logo & Pulse Indicator */}
          <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-accent-primary relative shrink-0">
              <div 
                className="absolute inset-[-3px] rounded-full border border-accent-primary pointer-events-none"
                style={{ animation: 'pulse-ring 1.4s ease-out infinite' }}
              />
            </div>
            <span className="font-sans font-bold text-white text-[13px] tracking-wide">
              Captiongrit
            </span>
          </div>

          {/* Lang Selector */}
          <div className="mb-4">
            <span className="font-sans text-[9px] font-semibold text-text-secondary tracking-wider uppercase block mb-2">
              Output Language
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[105px] overflow-y-auto pr-1">
              {langs.map((l) => {
                const isActive = l.id === activeLang;
                return (
                  <button
                    key={l.id}
                    disabled={running}
                    onClick={() => setActiveLang(l.id)}
                    className={`font-sans text-[10px] px-2 py-1 rounded transition-all select-none ${
                      isActive 
                        ? 'bg-accent-primary text-black font-semibold shadow-md' 
                        : 'bg-white/5 border border-white/10 text-[#aaa] hover:text-white hover:bg-white/10'
                    } disabled:opacity-50`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Output log */}
          <div className="flex-1 flex flex-col min-h-[140px] border-t border-white/5 pt-3 mb-4 overflow-hidden">
            <span className="font-sans text-[9px] font-semibold text-text-secondary tracking-wider uppercase block mb-2">
              Caption Output
            </span>
            <div className="flex-grow overflow-y-auto space-y-1.5 pr-1 max-h-[120px] md:max-h-none">
              {captionLogs.map((log) => (
                <div 
                  key={log.id} 
                  className="flex gap-2 items-start bg-white/5 border border-white/5 rounded p-1.5"
                  style={{ animation: 'captionpop 0.3s ease forwards' }}
                >
                  <span className="text-accent-primary font-mono text-[9px] shrink-0 mt-0.5">
                    {log.time}
                  </span>
                  <span className="font-sans text-[11px] text-[#e8e8e8] leading-tight">
                    {log.text}
                  </span>
                </div>
              ))}
              {captionLogs.length === 0 && (
                <div className="h-full flex items-center justify-center text-text-secondary/30 text-[10px] italic py-6 select-none">
                  No captions generated
                </div>
              )}
            </div>
          </div>

          {/* Control Button */}
          <div className="mt-auto">
            <button
              onClick={runDemo}
              disabled={running}
              className={`w-full bg-accent-primary text-[#0f1f00] font-sans font-bold py-2 px-4 rounded-lg text-xs transition-all active:scale-[0.98] ${
                running 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-accent-secondary hover:shadow-[0_0_15px_rgba(198,255,52,0.25)]'
              }`}
            >
              {running ? 'Processing...' : 'Run Captiongrit'}
            </button>
            <div className="text-[10px] text-text-secondary/60 text-center mt-2 min-h-[14px] font-sans">
              {statusText}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
