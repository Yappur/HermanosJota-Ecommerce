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

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Cargar carrito desde localStorage al iniciar la aplicación
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("hermanos-jota-cart");
      console.log("🔄 Cargando carrito desde localStorage:", savedCart);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          console.log("✅ Carrito cargado:", parsedCart);
          setCart(parsedCart);
        }
      }
    } catch (error) {
      console.error("Error al cargar el carrito desde localStorage:", error);
    } finally {
      setIsCartLoaded(true);
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie (solo después de cargar)
  useEffect(() => {
    if (!isCartLoaded) return; // No guardar hasta que se haya cargado

    try {
      console.log("💾 Guardando carrito en localStorage:", cart);
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
      <NavBar
        onNavigate={navigate}
        cartCount={cartItemCount}
        cartItems={cart}
        onClearCart={clearCart}
      />
      {currentPage === "home" && (
        <>
          <HeroSection onNavigate={navigate} />
          <ProductosDestacados onNavigate={navigate} />
          <FAQ />
        </>
      )}
      {currentPage === "products" && <ProductList onNavigate={navigate} />}
      {currentPage === "product-detail" && (
        <ProductView
          productId={selectedProductId}
          onNavigate={navigate}
          onAddToCart={addToCart}
        />
      )}
      {currentPage === "contact" && <ContactForm />}
      {currentPage === "about" && <About />}
      <ScrollToTop />
      <Footer />
    </>
  );
}

export default App;
