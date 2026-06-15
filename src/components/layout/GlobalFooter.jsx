import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';

export default function GlobalFooter() {
  return (
    <footer className="bg-bg-primary border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <img src="/logo.jpg" alt="Integrit Logo" className="w-7 h-7 object-contain group-hover:scale-110 transition-transform rounded-md" />
              <span className="font-display font-bold text-xl text-white tracking-wide">Integrit</span>
            </Link>
            <p className="text-text-secondary text-sm font-body leading-relaxed max-w-xs">
              AI Automations + Marketing. Built for creators.
            </p>
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full
                            bg-[#111111] border border-[#1E1E1E] w-fit">
              <span className="text-sm">🇮🇳</span>
              <span className="text-[11px] font-mono text-text-secondary">Made in India</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/#contact" className="text-text-secondary hover:text-white transition-colors text-sm">Book a Discovery Call</Link></li>
              <li><Link to="/services" className="text-text-secondary hover:text-white transition-colors text-sm">Services</Link></li>
              <li><Link to="/products" className="text-text-secondary hover:text-white transition-colors text-sm">Products</Link></li>
              <li><Link to="/#contact" className="text-text-secondary hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Products</h4>
            <ul className="space-y-4">
              <li><Link to="/products/captiongrit" className="text-text-secondary hover:text-white transition-colors text-sm flex items-center gap-2 group">
                Captiongrit <span className="text-[10px] bg-accent-primary/10 text-accent-primary px-2 py-0.5 rounded-full border border-accent-primary/20 group-hover:border-accent-primary/50 transition-colors">v1.0</span>
              </Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4 mb-8">
              <li><Link to="/privacy" className="text-text-secondary hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-text-secondary hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="/refund" className="text-text-secondary hover:text-white transition-colors text-sm">Refund Policy</Link></li>
            </ul>
            
            <h4 className="font-bold text-white mb-6">Connect</h4>
            <ul className="space-y-4">
              <li><a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors text-sm">Instagram</a></li>
              <li><a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors text-sm">LinkedIn</a></li>
              <li><a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors text-sm">Discord</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} Integrit · Made in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
