import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer.jsx";
import NavBar from "./components/layout/navbar/Navbar.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import ScrollToTop from "./components/layout/scrollToTop/ScrollToTop.jsx";
import RoutesView from "./routes/RoutesView";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ToastProvider } from "./contexts/ToastContext";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

function App() {

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
