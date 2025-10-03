import { CartProvider } from "./context/CartContext";
import Index from "./components/Index";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/navbar/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import About from "./components/About/About";
import ProductList from "./components/productList/ProductList";
import ContactForm from "./components/Contact/contactForm";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => setCurrentPage(page);

  return (
    <CartProvider>
      <NavBar onNavigate={navigate} />
      { currentPage === "home" && (
        <>
          <HeroSection />
          <About />
        </>
      )
      }
      {currentPage === "products" && <ProductList />}
      {currentPage === "contact" && <ContactForm />}
      {}
      <Footer />
    </CartProvider>
  );
}

export default App;
