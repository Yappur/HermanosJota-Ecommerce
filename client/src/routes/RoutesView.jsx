import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import ProductList from "../components/productList/ProductList";
import ProductView from "../components/productView/ProductView";
import Contact from "../components/Contact/contactForm";
import About from "../components/About/About";
import CreateProduct from "../components/admin/CreateProduct";
import Login from "../components/log-in/login";

const RoutesView = ({ onAddToCart }) => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route
        path="/productos"
        element={<ProductList onAddToCart={onAddToCart} />}
      />
      <Route
        path="/productos/:id"
        element={<ProductView onAddToCart={onAddToCart} />}
      />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/nosotros" element={<About />} />
      <Route path="/admin/crear-producto" element={<CreateProduct />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesView;
