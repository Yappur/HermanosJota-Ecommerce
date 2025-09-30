import { CartProvider } from "./context/CartContext";
import Index from "./components/Index";
  import Footer from "./components/Footer/Footer";

function App() {
  return (
    <CartProvider>
      <Index />
    <Footer />
    </CartProvider>
  );
}

export default App;
