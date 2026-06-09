export default function LanguageMarquee() {
  const languages = [
    "English", "Telugu", "Hindi", "Tamil", "Kannada", "Malayalam", 
    "Marathi", "Bengali", "Gujarati", "Punjabi", "Odia", "Spanish", 
    "French", "German", "Japanese", "Korean", "Portuguese", "Arabic", 
    "Italian", "Dutch", "Russian", "Turkish", "Vietnamese", "Indonesian"
  ];

  return (
    <section id="languages" className="py-20 border-y border-white/5 bg-bg-secondary overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-secondary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-secondary to-transparent z-10 pointer-events-none" />
      
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Double array for seamless loop */}
        {[...languages, ...languages].map((lang, idx) => (
          <div 
            key={idx} 
            className="inline-flex items-center justify-center px-8 py-3 mx-4 rounded-full border border-white/10 bg-white/5 text-white/80 font-medium whitespace-nowrap"
          >
            {lang}
          </div>
        ))}
      </div>
    </section>
  );
}
