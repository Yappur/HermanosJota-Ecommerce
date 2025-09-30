import { CartProvider } from "./context/CartContext";
import Index from "./components/Index";

function App() {
  return (
    <CartProvider>
      <Index />
    </CartProvider>
  );
}

export default App;
