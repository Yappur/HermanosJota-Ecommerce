import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Este componente hace scroll automáticamente al cambiar de ruta
function AutoScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default AutoScrollToTop;
