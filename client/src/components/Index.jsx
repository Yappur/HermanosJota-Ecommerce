import NavBar from './Navbar';

const Index = () => {
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