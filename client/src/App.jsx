import { CartProvider } from "./context/CartContext";
import Index from "./components/Index";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/navbar/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import Contact from "./components/Contact/contactForm";
import About from "./components/About/About";

function App() {
  return (
    <CartProvider>
      <NavBar />
      <HeroSection />
      <About />
      <Footer />
      <ContactForm />
    </CartProvider>
  );
}

export default App;
