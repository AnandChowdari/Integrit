import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaptionIntegritPage from './pages/products/CaptionIntegritPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/caption-integrit" element={<CaptionIntegritPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
