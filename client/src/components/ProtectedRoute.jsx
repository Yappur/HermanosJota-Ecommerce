import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Componente para proteger rutas que requieren autenticación
 * Si el usuario no está autenticado, lo redirige a la página principal
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirigir al home si no está autenticado
    return <Navigate to="/" replace />;
  }

  // Si está autenticado, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;
