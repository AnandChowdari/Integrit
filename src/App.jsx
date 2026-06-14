import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaptiongritPage from './pages/products/CaptiongritPage';
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
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
      </Routes>
      <StickyCTABar />
    </BrowserRouter>
  );
}

export default App;
