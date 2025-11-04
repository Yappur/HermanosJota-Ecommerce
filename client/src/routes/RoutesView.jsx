import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import NotFound from "../pages/NotFound/NotFound";
import ProductList from "../components/productList/ProductList";
import ProductView from "../components/productView/ProductView";
import Contact from "../pages/Contact/contactForm";
import About from "../pages/About/About";
import Login from "../pages/log-in/login";
import AdminLayout from "../components/admin/layout/AdminLayout";
import AdminProducts from "../components/admin/products/AdminProducts";
import AdminUsers from "../components/admin/users/AdminUsers";
import ProtectedRoute from "./ProtectedRoute";

import { useCart } from "../contexts/CartContext";

const RoutesView = () => {
  const { addToCart } = useCart();
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route
        path="/productos"
        element={<ProductList onAddToCart={addToCart} />}
      />
      <Route
        path="/productos/:id"
        element={<ProductView onAddToCart={addToCart} />}
      />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/nosotros" element={<About />} />

      {/* Rutas protegidas - Solo usuarios autenticados */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="productos" replace />} />
        <Route path="productos" element={<AdminProducts />} />
        <Route path="usuarios" element={<AdminUsers />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesView;
