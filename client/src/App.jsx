import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer.jsx";
import NavBar from "./components/layout/navbar/Navbar.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { useState, useEffect } from "react";
import ScrollToTop from "./components/layout/scrollToTop/ScrollToTop.jsx";
import RoutesView from "./routes/RoutesView";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  // Cart state moved to CartContext

  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <CartProvider>
            <NavBar />

            <RoutesView />
            <ScrollToTop />
            <Footer />
          </CartProvider>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
