import Footer from "./components/Footer/Footer";
import NavBar from "./components/navbar/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import About from "./components/About/About";
import ProductList from "./components/productList/ProductList";
import ProductDetail from "./components/productDetail/ProductDetail";
import ContactForm from "./components/Contact/contactForm";
import { useState } from "react";
import FAQ from "./components/FAQ/FAQ.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState([]);

  const navigate = (page, productId = null) => {
    setCurrentPage(page);
    setSelectedProductId(productId);
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
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
      <NavBar onNavigate={navigate} cartCount={cartItemCount} cartItems={cart} onClearCart={clearCart} />
      {currentPage === "home" && (
        <>
          <HeroSection onNavigate={navigate} />
          <FAQ />
        </>
      )}
      {currentPage === "products" && <ProductList onNavigate={navigate} />}
      {currentPage === "product-detail" && <ProductDetail productId={selectedProductId} onNavigate={navigate} onAddToCart={addToCart} />}
      {currentPage === "contact" && <ContactForm />}
      {currentPage === "about" && <About />}
      <Footer />
    </>
  );
}

export default App;
