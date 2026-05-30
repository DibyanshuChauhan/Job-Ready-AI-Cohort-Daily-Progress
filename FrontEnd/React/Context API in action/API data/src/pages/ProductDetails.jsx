import { useContext } from "react";
import { productDataContext } from "../context/ProductContext";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const productData = useContext(productDataContext);

    const { productId } = useParams();

    const selectedProduct = productData.find(
        (elem) => elem.id === Number(productId)
    );

    if (!selectedProduct) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <h1 className="text-2xl">Product Not Found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white p-10">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-slate-900 p-8 rounded-xl shadow-lg">

                {/* Product Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={selectedProduct.image}
                        alt={selectedProduct.title}
                        className="h-100 object-contain"
                    />
                </div>

                {/* Product Info */}
                <div className="space-y-5">
                    <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                        {selectedProduct.category}
                    </span>

                    <h1 className="text-3xl font-bold">
                        {selectedProduct.title}
                    </h1>

                    <p className="text-slate-300">
                        {selectedProduct.description}
                    </p>

                    <div className="flex items-center gap-4">
                        <span className="text-yellow-400 text-lg">
                            ⭐ {selectedProduct.rating.rate}
                        </span>

                        <span className="text-slate-400">
                            ({selectedProduct.rating.count} Reviews)
                        </span>
                    </div>

                    <h2 className="text-4xl font-bold text-green-400">
                        ${selectedProduct.price}
                    </h2>

                    <div className="flex gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition">
                            Add To Cart
                        </button>

                        <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg transition">
                            Buy Now
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;