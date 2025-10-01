import { CartProvider } from "./context/CartContext";
import Index from "./components/Index";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/navbar/Navbar";
import HeroSection from "./components/Hero/HeroSection";

function App() {
  return (
    <CartProvider>
      <NavBar />
      <HeroSection />
      <Footer />
    </CartProvider>
  );
}

export default App;
