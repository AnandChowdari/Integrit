import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaptiongritPage from './pages/products/CaptiongritPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import RefundPage from './pages/RefundPage';
import ScrollToTop from './components/layout/ScrollToTop';
import StickyCTABar from './components/ui/StickyCTABar';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/captiongrit" element={<CaptiongritPage />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/refund" element={<RefundPage />} />
      </Routes>
      <StickyCTABar />
    </BrowserRouter>
  );
}

export default App;
