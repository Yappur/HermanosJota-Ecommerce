import ProductItem from './productItem/ProductItem'
// import { productos } from '../../api/data/products.js'
import { useEffect, useState } from 'react'
import "./product-list.css"
import ProductsToolbar from './productsToolbar/ProductsToolbar'

const ProductList = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [query, setQuery] = useState("")

    // Fetch para traer los productos del backend
    useEffect(() => {
        const fetchProductos = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch('http://localhost:5000/api/products')
            if (!response.ok) {
            throw new Error('Error al traer productos')
            }
            const data = await response.json()
           setProducts(Array.isArray(data.data) ? data.data : [])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
        }

        fetchProductos()
    }, [])

    // Filtrado de productos para el search
    const filtered = products.filter(product => {
    const queryLower = query.toLowerCase()
    return (
      product.nombre.toLowerCase().includes(queryLower) ||
      (product.descripcion && product.descripcion.toLowerCase().includes(queryLower))
    )
  })

    return (
        <div className='product-list'>

            {<ProductsToolbar value={query} onSearch={setQuery} />}

            <div className='products-container'>
                {loading && <p>Cargando productos...</p>}

                {error &&
                    <div className='products-empty'>
                        <div className="products-empty-content">
                            <h4>No se encontraron productos</h4>
                        </div>
                    </div>
                }

                {!loading && !error && filtered.length === 0 && <p>No hay productos.</p>}

                {
                !loading &&
                !error &&
                filtered.map(product => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default ProductList