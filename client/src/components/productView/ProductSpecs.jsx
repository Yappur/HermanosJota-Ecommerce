const ProductSpecs = ({ specs }) => {
  if (!specs || specs.length === 0) {
    return null;
  }

  return (
    <div className="specs-section">
      <h2 className="section-title">Especificaciones</h2>
      <table className="specs">
        <tbody id="specsBody">
          {specs.map((spec, index) => (
            <tr key={index}>
              <td className="spec-label">{spec.label}</td>
              <td className="spec-value">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecs;
