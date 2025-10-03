import { CartProvider } from "./context/CartContext";
import Index from "./components/Index";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/navbar/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import About from "./components/About/About";

function App() {
  return (
    <CartProvider>
      <NavBar />
      <HeroSection />
      <About />
      <Footer />
    </CartProvider>
  );
}

export default App;
