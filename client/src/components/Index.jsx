import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import NavBar from './navbar/Navbar';

const Index = () => {
  const { addToCart } = useCart();
  useEffect(() => {
    // Configurar meta tags dinámicamente
    document.title = "Hermanos Jota | Muebles de diseño sustentables";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Hermanos Jota - Muebles artesanales sustentables con madera certificada FSC. Diseño retro años 60, fabricación responsable en Buenos Aires. ✓ Garantía extendida ✓ Envío a todo el país.'
      );
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content',
        'muebles sustentables, artesanía argentina, muebles diseño, madera certificada FSC, muebles retro años 60, fabricación responsable, Buenos Aires'
      );
    }
  }, []);

  return (
    <>
      <NavBar />
      
      <main style={{ paddingTop: '100px', minHeight: '80vh' }}>
        <div className="container">
          <section className="section-header">
            <h1 className="section-title">HERMANOS JOTA</h1>
            <p className="section-description">
              Piezas que cuentan historias. Artesanía sustentable con la calidez del optimismo de los años 60.
            </p>
          </section>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="/productos" className="btn btn-primary" style={{ marginRight: '1rem' }}>
              Ver Productos
            </a>
            <a href="/nosotros" className="btn btn-secondary">
              Conocer Más
            </a>
          </div>

          {/* Botón de prueba para el carrito */}
          <div style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', backgroundColor: 'rgba(160, 82, 45, 0.1)', borderRadius: '8px' }}>
            <h3>Prueba del Carrito</h3>
            <p>Haz clic para agregar un producto de ejemplo al carrito:</p>
            <button 
              className="btn btn-outline"
              onClick={() => addToCart({
                id: 'test-1',
                name: 'Mesa de Comedor Artesanal',
                price: 125000,
                image: '/img/productos/mesa-comedor.jpg'
              })}
              style={{ marginTop: '1rem' }}
            >
              🛒 Agregar Mesa al Carrito
            </button>
          </div>
          
        </div>
      </main>
      
    </>
  );
};

export default Index;