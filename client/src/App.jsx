import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/layout/navbar/Navbar.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import ScrollToTop from "./components/layout/scrollToTop/ScrollToTop.jsx";
import RoutesView from "./routes/RoutesView";
import AutoScrollToTop from "./components/layout/navbar/AutoScrollToTop.jsx";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Cargar carrito desde localStorage
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
    <Router>
      <AutoScrollToTop />
      <NavBar
        cartCount={cartItemCount}
        cartItems={cart}
        onClearCart={clearCart}
      />

      <RoutesView onAddToCart={addToCart} />
      <ScrollToTop />
      <Footer />
    </Router>
  );
}

export default App;
