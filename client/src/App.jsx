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
import { BrowserRouter as Router } from "react-router-dom";
import RoutesView from "./routes/RoutesView.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Cargar carrito
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

  // Guardar carrito en localStorage
  useEffect(() => {
    if (!isCartLoaded) return;

    try {
      localStorage.setItem("hermanos-jota-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage:", error);
    }
  }, [cart, isCartLoaded]);

  const navigate = (page, productId = null) => {
    setCurrentPage(page);
    setSelectedProductId(productId);
  };

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
    <>
      <Router>
        <NavBar
          onNavigate={navigate}
          cartCount={cartItemCount}
          cartItems={cart}
          onClearCart={clearCart}
        />
        <RoutesView />
        <ScrollToTop />
        <Footer />
      </Router>
    </>
  );
}

export default App;
