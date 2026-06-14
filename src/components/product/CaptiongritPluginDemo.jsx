import { useState, useEffect } from 'react';

const DEMO_CAPTIONS = {
  'Native Script': {
    stt: 'ElevenLabs Scribe',
    lines: [
      { time: '00:00:02', text: 'నమస్తే అందరికీ' },
      { time: '00:00:05', text: 'ఈ వీడియోలో మీకు' },
      { time: '00:00:09', text: 'Caption Integrit చూపిస్తాను' },
      { time: '00:00:14', text: 'ధన్యవాదాలు' }
    ]
  },
  'English Phonetic': {
    stt: 'Deepgram',
    lines: [
      { time: '00:00:02', text: 'Namaste andariki' },
      { time: '00:00:05', text: 'Ee video lo meeku' },
      { time: '00:00:09', text: 'Caption Integrit chupistanu' },
      { time: '00:00:14', text: 'Dhanyavadalu' }
    ]
  },
  'English': {
    stt: 'ElevenLabs Scribe',
    lines: [
      { time: '00:00:02', text: 'Hello everyone' },
      { time: '00:00:05', text: 'In this video' },
      { time: '00:00:09', text: "I'll show you Caption Integrit" },
      { time: '00:00:14', text: 'Thank you' }
    ]
  }
};

const waveHeights = [14, 22, 34, 42, 54, 62, 46, 34, 58, 50, 38, 26, 14, 34, 54, 64, 50, 38, 22, 46, 58, 42, 30, 18, 38, 54, 46, 34, 22, 14];

export default function CaptiongritPluginDemo() {
  const [activeTab, setActiveTab] = useState('generate');
  const [accentColor, setAccentColor] = useState('#c6f135');

  // Load API keys from localStorage safely
  const getLocalKey = (name) => {
    try {
      return localStorage.getItem(`cgrit_key_${name}`) || '';
    } catch {
      return '';
    }
  };

  const [keyElevenlabs, setKeyElevenlabs] = useState(() => getLocalKey('elevenlabs'));
  const [keyDeepgram, setKeyDeepgram] = useState(() => getLocalKey('deepgram'));
  const [keyGemini, setKeyGemini] = useState(() => getLocalKey('gemini'));
  const [keyGrok, setKeyGrok] = useState(() => getLocalKey('grok'));
  const [keyGroq, setKeyGroq] = useState(() => getLocalKey('groq'));
  const [keyOpenrouter, setKeyOpenrouter] = useState(() => getLocalKey('openrouter'));
  const [settingsStatus, setSettingsStatus] = useState('');

  // Dropdown States
  const [activeDropdown, setActiveDropdown] = useState(null); // 'stt' | 'lang' | 'ai' | null

  // Generate Options State
  const [clipRead, setClipRead] = useState(false);
  const [clipDisplay, setClipDisplay] = useState('No clip selected');
  const [sttValue, setSttValue] = useState('ElevenLabs Scribe');
  const [langValue, setLangValue] = useState('Auto Detect');
  const [outputPill, setOutputPill] = useState('Native Script');
  const [translate, setTranslate] = useState(false);
  const [aiValue, setAiValue] = useState('Auto (best free model)');
  const [stylePill, setStylePill] = useState('Natural Phrase');
  const [outputModePill, setOutputModePill] = useState('Import SRT to Project');
  const [accuracy, setAccuracy] = useState(false);

  // Simulation running states
  const [running, setRunning] = useState(false);
  const [statusText, setStatusText] = useState('Select options & press Generate');
  const [captionLogs, setCaptionLogs] = useState([]);
  const [activeCaption, setActiveCaption] = useState('');
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [progress, setProgress] = useState(0);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdown(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleDropdownClick = (e, name) => {
    e.stopPropagation();
    setActiveDropdown(prev => (prev === name ? null : name));
  };

  const selectDropdownOption = (e, setter, value) => {
    e.stopPropagation();
    setter(value);
    setActiveDropdown(null);
  };

  const readClip = () => {
    if (clipRead) return;
    setClipRead(true);
    setClipDisplay('Sample_Video.mp4 · 00:00:18');
    setStatusText('Clip loaded — ready to generate');
  };

  const saveKeys = () => {
    try {
      localStorage.setItem('cgrit_key_elevenlabs', keyElevenlabs);
      localStorage.setItem('cgrit_key_deepgram', keyDeepgram);
      localStorage.setItem('cgrit_key_gemini', keyGemini);
      localStorage.setItem('cgrit_key_grok', keyGrok);
      localStorage.setItem('cgrit_key_groq', keyGroq);
      localStorage.setItem('cgrit_key_openrouter', keyOpenrouter);
      setSettingsStatus('Keys saved locally ✓');
      setTimeout(() => setSettingsStatus(''), 3000);
    } catch {
      setSettingsStatus('Failed to save (storage full/blocked)');
    }
  };

  const runGenerate = () => {
    if (running) return;
    if (!clipRead) {
      setStatusText('⚠ Please read a clip first');
      return;
    }

    setRunning(true);
    setStatusText('Reading audio track...');
    setCaptionLogs([]);
    setActiveCaption('');
    setActiveWordIndex(-1);
    setProgress(0);

    const demo = DEMO_CAPTIONS[outputPill] || DEMO_CAPTIONS['English'];
    
    // Simulate timeline progress scanning
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2.5;
      setProgress(Math.min(currentProgress, 100));

      if (currentProgress >= 100) {
        clearInterval(interval);
        setStatusText('Generating captions...');
        showCaptions(demo.lines);
      }
    }, 80);
  };

  const showCaptions = (lines) => {
    let index = 0;
    
    const showNextCaption = () => {
      if (index >= lines.length) {
        setStatusText(`${lines.length} captions exported ✓`);
        setRunning(false);
        setActiveCaption('');
        setActiveWordIndex(-1);
        return;
      }

      const activeLine = lines[index];
      setCaptionLogs(prev => [...prev, activeLine]);
      setActiveCaption(activeLine.text);

      // Trigger word highlight sequence
      const words = activeLine.text.split(' ');
      let wIdx = 0;
      setActiveWordIndex(0);
      
      const wordInterval = setInterval(() => {
        wIdx++;
        if (wIdx < words.length) {
          setActiveWordIndex(wIdx);
        } else {
          clearInterval(wordInterval);
        }
      }, 900 / words.length);

      index++;
      setTimeout(showNextCaption, 950);
    };

    setTimeout(showNextCaption, 200);
  };

  return (
    <div className="w-full bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans text-white text-left select-none">
      
      {/* Apple macOS style header bar */}
      <div className="bg-[#18181b] px-4 py-3 border-b border-white/5 flex items-center justify-between shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="bg-black/40 border border-white/5 rounded-md text-[10px] text-text-secondary px-6 py-1 font-mono tracking-wide w-48 text-center shrink-0">
          premiere://localhost/workspace
        </div>
        <div className="w-12" /> {/* Balancing empty spacer */}
      </div>

      {/* Main Workspace Frame */}
      <div className="flex flex-col lg:flex-row h-auto lg:h-[520px]">
        
        {/* Left Workspace: Program Monitor Video Screen + Timeline */}
        <div className="flex-1 flex flex-col bg-[#141416] border-b lg:border-b-0 lg:border-r border-white/5">
          
          {/* Program Monitor (Video screen) */}
          <div className="flex-1 min-h-[260px] relative overflow-hidden flex items-center justify-center p-4 bg-[#0d0d0f]">
            {/* Unsplash Stock Creator Video Mock Background */}
            <img 
              src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800" 
              alt="Creator Speaking" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
            />
            
            {/* Screen Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* REC Flashing Indicator */}
            {running && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 px-2.5 py-1 rounded border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#ff4949] animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider text-white">REC 00:00:18</span>
              </div>
            )}

            {/* Center Pause/Play overlay */}
            {!running && (
              <div className="w-12 h-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-black/60 transition-all z-10">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white ml-0.5">
                  <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
                </svg>
              </div>
            )}

            {/* Captions Overlay on Video */}
            {activeCaption && (
              <div className="absolute bottom-6 left-4 right-4 text-center z-20">
                <div 
                  className="inline-block px-4 py-2 rounded-lg bg-black/75 backdrop-blur-sm border border-white/15 text-sm sm:text-base font-extrabold tracking-wide text-white shadow-2xl animate-[popIn_0.2s_ease_forwards] font-sans"
                >
                  {activeCaption.split(' ').map((word, wIdx) => (
                    <span 
                      key={wIdx} 
                      className="mx-1 transition-colors duration-150 inline-block"
                      style={{ color: wIdx === activeWordIndex ? accentColor : '#ffffff' }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Video Control Bar */}
          <div className="bg-[#18181b] border-t border-white/5 px-4 py-2 flex items-center justify-between text-[11px] text-text-secondary">
            <div className="flex items-center gap-3">
              <button className="hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 19 2 12 11 5 11 19" fill="currentColor"/>
                  <polygon points="22 19 13 12 22 5 22 19" fill="currentColor"/>
                </svg>
              </button>
              <span className="font-mono">00:00:18:12</span>
            </div>
            {/* Dynamic play progress line */}
            <div className="flex-1 mx-4 h-1 bg-white/5 rounded-full relative overflow-hidden">
              <div 
                className="h-full transition-all duration-75 ease-linear" 
                style={{ width: `${progress}%`, backgroundColor: accentColor }}
              />
            </div>
            <span className="font-mono">00:00:30:00</span>
          </div>

          {/* Timeline & Audio Track Waveform */}
          <div className="bg-[#121214] p-4 border-t border-white/5 flex flex-col justify-end h-[100px] relative select-none">
            <div className="text-[9px] text-[#555] font-bold uppercase tracking-widest mb-2">Audio Track v1</div>
            
            {/* Waveform container */}
            <div className="relative flex items-end justify-between h-11 pr-4">
              
              {/* Playhead line (vertical red marker) */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-[#ff4949] z-20 pointer-events-none transition-all duration-[80ms] ease-linear"
                style={{ left: `${progress}%` }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff4949] absolute -top-[3px] -left-[2px] shadow-sm" />
              </div>

              {waveHeights.map((h, i) => {
                const activeIndex = Math.floor((progress / 100) * waveHeights.length);
                const isPassed = i < activeIndex;
                return (
                  <div 
                    key={i}
                    className="w-1.5 rounded-full shrink-0 transition-colors duration-200"
                    style={{
                      height: `${h}px`,
                      backgroundColor: isPassed ? accentColor : '#2b3b5c'
                    }}
                  />
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Workspace: Captiongrit Extension CEP Panel */}
        <div className="w-full lg:w-[350px] bg-[#111111] flex flex-col shrink-0">
          
          {/* Panel Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#161618] border-b border-[#222]">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-300"
                style={{ backgroundColor: accentColor }}
              >
                <svg viewBox="0 0 10 10" className="w-2 h-2" fill="none">
                  <polygon points="3.5,2.5 7.5,5 3.5,7.5" fill="#0a1200"/>
                </svg>
              </div>
              <span className="text-[11px] font-bold tracking-wider text-text-secondary uppercase">Captiongrit CEP</span>
            </div>
            <span 
              className="text-[10px] font-bold transition-colors duration-300"
              style={{ color: accentColor }}
            >
              v1.0
            </span>
          </div>

          {/* CEP Tabs */}
          <div className="flex border-b border-[#222] shrink-0 bg-[#111]">
            <button 
              onClick={() => setActiveTab('generate')}
              className="flex-1 py-2.5 text-center text-[10px] font-extrabold tracking-widest uppercase transition-all duration-300 border-r border-[#222]"
              style={activeTab === 'generate' 
                ? { backgroundColor: accentColor, color: '#0a1200' } 
                : { backgroundColor: '#111', color: '#555' }
              }
            >
              Generate
            </button>
            <button 
              onClick={() => setActiveTab('advanced')}
              className="flex-1 py-2.5 text-center text-[10px] font-extrabold tracking-widest uppercase transition-all duration-300 border-r border-[#222]"
              style={activeTab === 'advanced' 
                ? { backgroundColor: accentColor, color: '#0a1200' } 
                : { backgroundColor: '#111', color: '#555' }
              }
            >
              Advanced
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className="flex-1 py-2.5 text-center text-[10px] font-extrabold tracking-widest uppercase transition-all duration-300"
              style={activeTab === 'settings' 
                ? { backgroundColor: accentColor, color: '#0a1200' } 
                : { backgroundColor: '#111', color: '#555' }
              }
            >
              Settings
            </button>
          </div>

          {/* Scrollable CEP Panel Content */}
          <div className="flex-grow overflow-y-auto min-h-0 bg-[#111]">
            {activeTab === 'generate' && (
              <div className="flex flex-col pb-4 text-left">
                
                {/* Selected Clip */}
                <div 
                  className="text-[9px] font-bold uppercase tracking-widest px-4 pt-3 pb-1 flex items-center gap-1 transition-colors duration-300"
                  style={{ color: accentColor }}
                >
                  • Selected Clip
                </div>
                <div className={`mx-4 mb-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded py-2 px-3 text-xs ${clipRead ? 'text-[#e0e0e0]' : 'text-[#444]'}`}>
                  {clipDisplay}
                </div>

                <button 
                  onClick={readClip}
                  disabled={clipRead}
                  className="mx-4 mt-1 mb-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded py-2 px-3 text-left text-[11px] font-medium text-[#aaa] hover:border-[#444] transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <div 
                    className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 border"
                    style={{ 
                      backgroundColor: `${accentColor}15`, 
                      borderColor: accentColor 
                    }}
                  >
                    <svg width="5" height="5" viewBox="0 0 6 6" fill="none" className="ml-0.5">
                      <polygon points="1.5,1 5,3 1.5,5" fill={accentColor} />
                    </svg>
                  </div>
                  Click to Read Selected Clip
                </button>

                {/* STT Provider */}
                <div 
                  className="text-[9px] font-bold uppercase tracking-widest px-4 pt-2 pb-1 flex items-center gap-1 transition-colors duration-300"
                  style={{ color: accentColor }}
                >
                  • STT Provider
                </div>
                <div className="relative mx-4 mb-3">
                  <button
                    onClick={(e) => handleDropdownClick(e, 'stt')}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-[#e0e0e0] text-xs flex items-center justify-between hover:border-[#444] transition-colors"
                  >
                    <span>{sttValue}</span>
                    <span className="text-[8px] text-[#555]">▼</span>
                  </button>
                  {activeDropdown === 'stt' && (
                    <div className="absolute top-[calc(100%+2px)] left-0 right-0 bg-[#1e1e1e] border border-[#333] rounded z-[100] shadow-2xl overflow-hidden">
                      <button
                        onClick={(e) => selectDropdownOption(e, setSttValue, 'ElevenLabs Scribe')}
                        className="w-full text-left px-3 py-2 text-xs text-[#ccc] hover:bg-[#2a2a2a] hover:text-white transition-colors"
                      >
                        ElevenLabs Scribe
                      </button>
                      <button
                        onClick={(e) => selectDropdownOption(e, setSttValue, 'Deepgram')}
                        className="w-full text-left px-3 py-2 text-xs text-[#ccc] hover:bg-[#2a2a2a] hover:text-white transition-colors"
                      >
                        Deepgram
                      </button>
                    </div>
                  )}
                </div>

                {/* Source Language */}
                <div 
                  className="text-[9px] font-bold uppercase tracking-widest px-4 pt-2 pb-1 flex items-center gap-1 transition-colors duration-300"
                  style={{ color: accentColor }}
                >
                  • Source Language
                </div>
                <div className="relative mx-4 mb-3">
                  <button
                    onClick={(e) => handleDropdownClick(e, 'lang')}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-[#e0e0e0] text-xs flex items-center justify-between hover:border-[#444] transition-colors"
                  >
                    <span>{langValue}</span>
                    <span className="text-[8px] text-[#555]">▼</span>
                  </button>
                  {activeDropdown === 'lang' && (
                    <div className="absolute top-[calc(100%+2px)] left-0 right-0 bg-[#1e1e1e] border border-[#333] rounded z-[100] shadow-2xl overflow-hidden max-h-[120px] overflow-y-auto">
                      {['Auto Detect', 'Telugu', 'Hindi', 'Tamil', 'Malayalam', 'English'].map((l) => (
                        <button
                          key={l}
                          onClick={(e) => selectDropdownOption(e, setLangValue, l)}
                          className="w-full text-left px-3 py-2 text-xs text-[#ccc] hover:bg-[#2a2a2a] hover:text-white transition-colors"
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Caption Output */}
                <div 
                  className="text-[9px] font-bold uppercase tracking-widest px-4 pt-2 pb-1 flex items-center gap-1 transition-colors duration-300"
                  style={{ color: accentColor }}
                >
                  • Caption Output
                </div>
                <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                  {['Native Script', 'English Phonetic', 'English'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setOutputPill(opt)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all border shrink-0 ${
                        outputPill === opt 
                          ? 'font-bold' 
                          : 'bg-transparent border-[#333] text-[#888] hover:border-[#555] hover:text-[#ccc]'
                      }`}
                      style={outputPill === opt ? { backgroundColor: accentColor, borderColor: accentColor, color: '#0a1200' } : {}}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Translate toggle */}
                <div className="flex items-center justify-between py-2 px-4 border-t border-[#1e1e1e]">
                  <div className="text-xs text-[#ccc] font-medium">Translate Captions</div>
                  <button
                    type="button"
                    onClick={() => setTranslate(!translate)}
                    className="relative w-8 h-4.5 rounded-full transition-colors duration-200"
                    style={{ backgroundColor: translate ? `${accentColor}30` : '#2a2a2a' }}
                  >
                    <span
                      className="absolute top-[2.5px] left-[3px] w-3 h-3 rounded-full transition-transform duration-200"
                      style={{
                        transform: translate ? 'translateX(14px)' : 'translateX(0)',
                        backgroundColor: translate ? accentColor : '#555'
                      }}
                    />
                  </button>
                </div>

                {/* AI Provider */}
                <div 
                  className="text-[9px] font-bold uppercase tracking-widest px-4 pt-2 pb-1 flex items-center gap-1 transition-colors duration-300"
                  style={{ color: accentColor }}
                >
                  • AI Provider
                </div>
                <div className="relative mx-4 mb-3">
                  <button
                    onClick={(e) => handleDropdownClick(e, 'ai')}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-[#e0e0e0] text-xs flex items-center justify-between hover:border-[#444] transition-colors"
                  >
                    <span>{aiValue}</span>
                    <span className="text-[8px] text-[#555]">▼</span>
                  </button>
                  {activeDropdown === 'ai' && (
                    <div className="absolute top-[calc(100%+2px)] left-0 right-0 bg-[#1e1e1e] border border-[#333] rounded z-[100] shadow-2xl overflow-hidden">
                      {['Auto (best free model)', 'Google Gemini', 'Groq', 'OpenRouter'].map((a) => (
                        <button
                          key={a}
                          onClick={(e) => selectDropdownOption(e, setAiValue, a)}
                          className="w-full text-left px-3 py-2 text-xs text-[#ccc] hover:bg-[#2a2a2a] hover:text-white transition-colors"
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Caption Style */}
                <div 
                  className="text-[9px] font-bold uppercase tracking-widest px-4 pt-2 pb-1 flex items-center gap-1 transition-colors duration-300"
                  style={{ color: accentColor }}
                >
                  • Caption Style
                </div>
                <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                  {['Natural Phrase', 'Full Sentence', 'Word-by-Word'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setStylePill(opt)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all border shrink-0 ${
                        stylePill === opt 
                          ? 'font-bold' 
                          : 'bg-transparent border-[#333] text-[#888] hover:border-[#555] hover:text-[#ccc]'
                      }`}
                      style={stylePill === opt ? { backgroundColor: accentColor, borderColor: accentColor, color: '#0a1200' } : {}}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Output (Premiere Mode) */}
                <div 
                  className="text-[9px] font-bold uppercase tracking-widest px-4 pt-2 pb-1 flex items-center gap-1 transition-colors duration-300"
                  style={{ color: accentColor }}
                >
                  • Output <span className="text-[#555] text-[8px] font-mono ml-0.5">(PREMIERE MODE)</span>
                </div>
                <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                  {['Import SRT to Project', 'SRT File Export'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setOutputModePill(opt)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all border shrink-0 ${
                        outputModePill === opt 
                          ? 'font-bold' 
                          : 'bg-transparent border-[#333] text-[#888] hover:border-[#555] hover:text-[#ccc]'
                      }`}
                      style={outputModePill === opt ? { backgroundColor: accentColor, borderColor: accentColor, color: '#0a1200' } : {}}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Accuracy toggle */}
                <div className="flex items-center justify-between py-2 px-4 border-t border-[#1e1e1e]">
                  <div>
                    <div className="text-xs text-[#ccc] font-medium">Double-Check Accuracy</div>
                    <div className="text-[9px] text-[#555] mt-0.5">Fixes spelling &amp; split words</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAccuracy(!accuracy)}
                    className="relative w-8 h-4.5 rounded-full transition-colors duration-200"
                    style={{ backgroundColor: accuracy ? `${accentColor}30` : '#2a2a2a' }}
                  >
                    <span
                      className="absolute top-[2.5px] left-[3px] w-3 h-3 rounded-full transition-transform duration-200"
                      style={{
                        transform: accuracy ? 'translateX(14px)' : 'translateX(0)',
                        backgroundColor: accuracy ? accentColor : '#555'
                      }}
                    />
                  </button>
                </div>

                {/* Caption Output Logs */}
                {captionLogs.length > 0 && (
                  <div className="px-4 pt-3 flex flex-col gap-1.5">
                    <div className="text-[9px] text-[#555] font-bold uppercase tracking-widest">Extension Output Log</div>
                    {captionLogs.map((log, lIdx) => (
                      <div 
                        key={lIdx}
                        className="flex gap-2 items-start bg-[#1a1a1a] border border-[#2a2a2a] rounded p-2 animate-[popIn_0.2s_ease_forwards]"
                      >
                        <span 
                          className="text-[10px] font-mono shrink-0 mt-0.5 transition-colors duration-300 font-semibold"
                          style={{ color: accentColor }}
                        >
                          {log.time}
                        </span>
                        <span className="text-[12px] text-[#ccc] leading-normal">{log.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Status bar */}
                <div className="text-center py-2 min-h-[30px] mt-1 shrink-0">
                  <span className="text-[11px] text-[#666]">{statusText}</span>
                </div>

                {/* Action button */}
                <button
                  onClick={runGenerate}
                  disabled={running}
                  className="mx-4 mt-1 bg-[#c6f135] text-[#0a1200] font-bold text-xs py-3 px-4 rounded text-center tracking-wide hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                  style={{ backgroundColor: accentColor }}
                >
                  {running ? '⏳ Processing...' : '▶ Generate Captions'}
                </button>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="flex items-center justify-center h-full min-h-[200px]">
                <div className="text-center text-[#444] text-xs py-10">
                  Advanced options coming soon
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="flex flex-col pb-4 text-left">
                {/* Appearance */}
                <div 
                  className="text-[9px] font-bold uppercase tracking-widest px-4 pt-3 pb-1 flex items-center gap-1 transition-colors duration-300"
                  style={{ color: accentColor }}
                >
                  ◆ Appearance
                </div>

                <div className="px-4 pb-1">
                  <div className="text-xs text-[#e0e0e0] font-medium">Primary Color</div>
                  <div className="text-[10px] text-[#555] mt-0.5">Choose accent color for UI elements</div>
                </div>

                <div className="flex items-center gap-3 px-4 pb-3">
                  <input 
                    type="color" 
                    value={accentColor} 
                    onChange={(e) => setAccentColor(e.target.value)} 
                    id="accent-color-picker-workspace"
                    className="hidden"
                  />
                  <button 
                    onClick={() => document.getElementById('accent-color-picker-workspace').click()}
                    className="w-6.5 h-6.5 rounded border border-[#3a5000] cursor-pointer shrink-0"
                    style={{ backgroundColor: accentColor }}
                  />
                  <button 
                    onClick={() => setAccentColor('#c6f135')}
                    className="bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-1.5 text-[11px] text-[#aaa] hover:border-[#444] hover:text-white transition-colors"
                  >
                    Reset
                  </button>
                </div>

                <div className="h-[1px] bg-[#1e1e1e] my-2" />

                {/* API Keys */}
                <div 
                  className="text-[9px] font-bold uppercase tracking-widest px-4 pt-2 pb-1 flex items-center gap-1 transition-colors duration-300"
                  style={{ color: accentColor }}
                >
                  ◆ API Keys
                </div>

                <div 
                  className="mx-4 mb-3 rounded p-3 text-[11px] text-[#0a1200] leading-relaxed transition-colors duration-300 font-semibold"
                  style={{ backgroundColor: accentColor }}
                >
                  All APIs below offer <b>free tiers</b>. Create your own keys — no paid plan needed.
                </div>

                {/* API List */}
                <div className="flex flex-col text-[11px]">
                  {/* ElevenLabs */}
                  <div className="p-4 border-t border-[#1a1a1a]">
                    <div className="font-semibold text-[#e0e0e0] mb-1 flex items-center gap-1.5">
                      ElevenLabs 
                      <span 
                        className="text-[8px] font-bold px-1.5 py-0.5 rounded border transition-colors duration-300"
                        style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}40`, color: accentColor }}
                      >
                        STT
                      </span>
                    </div>
                    <div className="text-[10px] text-[#555] mb-2">
                      Free speech-to-text — <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ color: accentColor }}>elevenlabs.io</a>
                    </div>
                    <input 
                      type="password" 
                      value={keyElevenlabs} 
                      onChange={(e) => setKeyElevenlabs(e.target.value)} 
                      placeholder="••••••••••••••••••••••••••••••••••••••••" 
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-xs text-[#aaa] font-mono tracking-wider focus:outline-none focus:border-[#444] transition-colors"
                    />
                  </div>

                  {/* Deepgram */}
                  <div className="p-4 border-t border-[#1a1a1a]">
                    <div className="font-semibold text-[#e0e0e0] mb-1 flex items-center gap-1.5">
                      Deepgram 
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded border bg-[#002233] border-[#004466] text-[#22a8d4]">
                        $200 FREE
                      </span>
                    </div>
                    <div className="text-[10px] text-[#555] mb-2">
                      $200 free credits — <a href="https://console.deepgram.com" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ color: accentColor }}>console.deepgram.com</a>
                    </div>
                    <input 
                      type="password" 
                      value={keyDeepgram} 
                      onChange={(e) => setKeyDeepgram(e.target.value)} 
                      placeholder="••••••••••••••••••••••••••••••••••••" 
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-xs text-[#aaa] font-mono tracking-wider focus:outline-none focus:border-[#444] transition-colors"
                    />
                  </div>

                  {/* Google Gemini */}
                  <div className="p-4 border-t border-[#1a1a1a]">
                    <div className="font-semibold text-[#e0e0e0] mb-1 flex items-center gap-1.5">
                      Google Gemini 
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded border bg-[#003300] border-[#005500] text-[#33cc66]">
                        RECOMMENDED
                      </span>
                    </div>
                    <div className="text-[10px] text-[#555] mb-2">
                      Free tier · Fast &amp; accurate — <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ color: accentColor }}>aistudio.google.com</a>
                    </div>
                    <input 
                      type="password" 
                      value={keyGemini} 
                      onChange={(e) => setKeyGemini(e.target.value)} 
                      placeholder="••••••••••••••••••••••••••••••••••" 
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-xs text-[#aaa] font-mono tracking-wider focus:outline-none focus:border-[#444] transition-colors"
                    />
                  </div>

                  {/* xAI Grok */}
                  <div className="p-4 border-t border-[#1a1a1a]">
                    <div className="font-semibold text-[#e0e0e0] mb-1 flex items-center gap-1.5">
                      xAI Grok 
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded border bg-[#002233] border-[#004466] text-[#22a8d4]">
                        $25 FREE
                      </span>
                    </div>
                    <div className="text-[10px] text-[#555] mb-2">
                      $25/mo free credits — <a href="https://console.x.ai" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ color: accentColor }}>console.x.ai</a>
                    </div>
                    <input 
                      type="password" 
                      value={keyGrok} 
                      onChange={(e) => setKeyGrok(e.target.value)} 
                      placeholder="••••••••••••••••••••••••••••••••••••••••••••••" 
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-xs text-[#aaa] font-mono tracking-wider focus:outline-none focus:border-[#444] transition-colors"
                    />
                  </div>

                  {/* Groq */}
                  <div className="p-4 border-t border-[#1a1a1a]">
                    <div className="font-semibold text-[#e0e0e0] mb-1 flex items-center gap-1.5">
                      Groq 
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded border bg-[#003320] border-[#005530] text-[#22c47a]">
                        FREE
                      </span>
                    </div>
                    <div className="text-[10px] text-[#555] mb-2">
                      Free Llama inference — <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ color: accentColor }}>console.groq.com</a>
                    </div>
                    <input 
                      type="password" 
                      value={keyGroq} 
                      onChange={(e) => setKeyGroq(e.target.value)} 
                      placeholder="•••••••••••••••••••••••••••••••••••••••••••••" 
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-xs text-[#aaa] font-mono tracking-wider focus:outline-none focus:border-[#444] transition-colors"
                    />
                  </div>

                  {/* OpenRouter */}
                  <div className="p-4 border-t border-[#1a1a1a]">
                    <div className="font-semibold text-[#e0e0e0] mb-1 flex items-center gap-1.5">
                      OpenRouter 
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded border bg-[#002233] border-[#004466] text-[#22a8d4]">
                        FREE MODELS
                      </span>
                    </div>
                    <div className="text-[10px] text-[#555] mb-2">
                      Free models available — <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ color: accentColor }}>openrouter.ai</a>
                    </div>
                    <input 
                      type="text" 
                      value={keyOpenrouter} 
                      onChange={(e) => setKeyOpenrouter(e.target.value)} 
                      placeholder="Bearer token..." 
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-xs text-[#aaa] font-mono tracking-wider focus:outline-none focus:border-[#444] transition-colors"
                    />
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={saveKeys}
                  className="mx-4 mt-4 mb-2 bg-[#c6f135] text-[#0a1200] font-bold text-xs py-3 px-4 rounded text-center tracking-wide hover:opacity-90 active:scale-[0.99] transition-all transition-colors duration-300"
                  style={{ backgroundColor: accentColor }}
                >
                  Save API Keys
                </button>

                {settingsStatus && (
                  <div className="text-center py-2 text-xs text-[#666]">
                    {settingsStatus}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Embedded keyframe styles for React */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.97) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}} />
    </div>
  );
}
