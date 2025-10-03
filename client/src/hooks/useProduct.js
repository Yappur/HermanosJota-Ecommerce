
// <-- useProduct.js para usar más adelante en componentes con contexto de productos -->

import { useState, useEffect } from "react";
import productsApi from "../api/products.api.js";

export const useProduct = () => {
    const [products, setProducts] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const fetchProducts = async () => {
        setIsLoading(true); // Empieza la carga
        setError(null); // Resetea el error

        try {
            const data = await productsApi.fetchProducts();
            setProducts(data);
        }catch (error) {
            setError(error.message || "Error al cargar los productos");
        }

        setIsLoading(false);// Termina la carga
    }

    const fetchProductById = async (id) => {
        setIsLoading(true);
        setError(null);
        let product = null;

        try {
            product = await productsApi.fetchProductById(id);
        } catch (error) {
            setError(error.message || "Error al carga producto.");
        }

        setIsLoading(false);
        return product;
    };

    const checkProductStock = async (id) => {
        setIsLoading(true);
        setError(null);
        let result = false;

        try {
            result = await productsApi.checkProductStock(id);
        } catch (error) {
            setError(error.message || "Error al chequear stock de producto.");
        }

        setIsLoading(false);
        return result;
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        isLoading,
        error,
        fetchProducts,
        fetchProductById,
        checkProductStock,
    };

}