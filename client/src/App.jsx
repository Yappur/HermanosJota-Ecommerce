import { useState } from "react";
import Index from "./components/Index";

function App() {
  // Estado del carrito - array de productos
  const [cart, setCart] = useState([]);

  // Función para añadir producto al carrito
  const addToCart = (product) => {
    setCart(prevCart => {
      // Verificar si el producto ya existe en el carrito
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si existe, aumentar la cantidad
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Calcular total de items en el carrito
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Index cartCount={cartItemCount} addToCart={addToCart} />
    </>
  );
}

export default App;
