import ProductItem from './productItem/ProductItem'
import { products } from '../../api/data/products.js'

const ProductList = () => {

    return (
        <div className='products-container'>
            {products.map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductList