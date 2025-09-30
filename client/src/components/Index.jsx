import { useEffect } from 'react';
import NavBar from './Navbar';

const Index = () => {
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
        </div>
      </main>
      
    </>
  );
};

export default Index;