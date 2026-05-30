/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { getAllProductData } from "../api/productApi";

export const productDataContext = createContext()

const ProductContext = ({ children }) => {

    const [products, setProducts] = useState([]);

    const setData = async () => {
        const data = await getAllProductData()
        setProducts(data)
    }

    useEffect(() => {
        setData()
    }, []);

    return (
        <productDataContext.Provider value={products}>
            {children}
        </productDataContext.Provider>
    )
}

export default ProductContext