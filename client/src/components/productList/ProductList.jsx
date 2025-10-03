import ProductItem from './productItem/ProductItem'
import { productos } from '../../api/data/products.js'
import { useEffect, useState } from 'react'
import "./product-list.css"

const ProductList = () => {
    // const [productos, setProductos] = useState([])
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(null)

    // Fetch para traer los productos del backend
    // useEffect(() => {
    //     const fetchProductos = async () => {
    //     setLoading(true)
    //     setError(null)
    //     try {
    //         const response = await fetch('http://localhost:3001/api/productos')
    //         if (!response.ok) {
    //         throw new Error('Error al traer productos')
    //         }
    //         const data = await response.json()
    //         setProductos(data)
    //     } catch (err) {
    //         setError(err.message)
    //     } finally {
    //         setLoading(false)
    //     }
    //     }

    //     fetchProductos()
    // }, [])

    return (
        <div className='products-container'>
            {/* {loading && <p>Cargando productos...</p>}

            {error &&
                <div className='products-empty'>
                    <div className="products-empty-content">
                        <h4>No se encontraron productos</h4>
                    </div>
                </div>
            }

            {!loading && !error && productos.length === 0 && <p>No hay productos.</p>} */}

            {
            // !loading &&
            // !error &&
            productos.map(producto => (
                <ProductItem key={producto.id} producto={producto} />
            ))}
        </div>
    )
}

export default ProductList