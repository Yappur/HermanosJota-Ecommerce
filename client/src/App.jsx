import Footer from "./components/layout/Footer/Footer.jsx";
import NavBar from "./components/layout/navbar/Navbar.jsx";
import HeroSection from "./components/Hero/HeroSection";
import ProductosDestacados from "./components/ProductosDestacados/ProductosDestacados";
import About from "./components/About/About";
import ProductList from "./components/productList/ProductList";
import ProductView from "./components/productView/ProductView";
import ContactForm from "./components/Contact/contactForm";
import { useState, useEffect } from "react";
import FAQ from "./components/FAQ/FAQ.jsx";
import ScrollToTop from "./components/layout/scrollToTop/ScrollToTop.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("hermanos-jota-cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      }
    } catch (error) {
      console.error("Error al cargar el carrito desde localStorage:", error);
    } finally {
      setIsCartLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isCartLoaded) return;

    try {
      localStorage.setItem("hermanos-jota-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage:", error);
    }
  }, [cart, isCartLoaded]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <NavBar
        cartCount={cartItemCount}
        cartItems={cart}
        onClearCart={clearCart}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <ProductosDestacados />
              <FAQ />
            </>
          }
        />
        <Route path="/productos" element={<ProductList onAddToCart={addToCart} />} />
        <Route path="/productos/:id" element={<ProductView onAddToCart={addToCart} />} />
        <Route path="/contacto" element={<ContactForm />} />
        <Route path="/nosotros" element={<About />} />
      </Routes>
      <ScrollToTop />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
