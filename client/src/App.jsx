import { CartProvider } from "./context/CartContext";
import Index from "./components/Index";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/navbar/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import About from "./components/About/About";
import ProductList from "./components/productList/ProductList";
import ContactForm from "./components/Contact/contactForm";
import { useState } from "react";
import FAQ from "./components/FAQ/FAQ.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => setCurrentPage(page);

  return (
    <CartProvider>
      <NavBar onNavigate={navigate} />
      {currentPage === "home" && (
        <>
          <HeroSection onNavigate={navigate} />
          <FAQ />
        </>
      )}
      {currentPage === "products" && <ProductList />}
      {currentPage === "contact" && <ContactForm />}
      {currentPage === "about" && <About />}
      <Footer />
    </CartProvider>
  );
}

export default App;
