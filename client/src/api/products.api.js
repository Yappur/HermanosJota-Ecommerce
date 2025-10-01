import { products } from "./data/products.js";

const KEY_PRODUCTS = "products";

// Ejemplo con LocalStorage

const initialize = () => {
    const initialData = Array.isArray(products) ? products : [];
    localStorage.setItem(KEY_PRODUCTS, JSON.stringify(initialData));
    return initialData;
};

const getProductsFromLocalStorage = () => {
    const data = localStorage.getItem(KEY_PRODUCTS);
    return JSON.parse(data) || initialize();
};

const fetchProducts = () => {
    return new Promise((resolve) => {
        resolve(getProductsFromLocalStorage());
    });
};

const fetchProductById = (id) => {
    return new Promise((resolve, reject) => {
        const products = getProductsFromLocalStorage();

        const product = products.find((item) => item.id === parseInt(id));
        if (!product) {
            reject(new Error("Producto no encontrado."));
        }

        resolve(product);
    });
};


export default {
    fetchProducts,
    fetchProductById,

};