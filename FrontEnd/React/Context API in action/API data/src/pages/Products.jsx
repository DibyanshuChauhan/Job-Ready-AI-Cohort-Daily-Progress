/* eslint-disable no-useless-assignment */
import { useContext } from "react"
import { productDataContext } from "../context/ProductContext"
import { Link } from "react-router-dom"

const Products = () => {

    const products = useContext(productDataContext)

    let renderData = ''

    if (products.length > 0) {
        renderData = products.map((product) => (
            <Link to={`/products/${product.id}`}
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-indigo-500/30 transition-all duration-500 hover:-translate-y-2"
            >
                {/* Image Section */}
                <div className="bg-slate-100 h-72 overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-contain p-6 group-hover:scale-110 transition duration-500"
                    />
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Category */}
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
                        {product.category}
                    </span>

                    {/* Title */}
                    <h2 className="mt-3 font-bold text-lg text-slate-800 line-clamp-2">
                        {product.title}
                    </h2>

                    {/* Description */}
                    <p className="text-slate-500 text-sm mt-2 line-clamp-3">
                        {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="font-medium">
                                {product.rating.rate}
                            </span>

                            <span className="text-slate-400 text-sm">
                                ({product.rating.count} reviews)
                            </span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mt-5 flex items-center justify-between">
                        <h3 className="text-3xl font-bold text-slate-900">
                            ${product.price}
                        </h3>

                        <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition">
                            Buy Now
                        </button>
                    </div>
                </div>
            </Link>
        ))
    } else {
        renderData = Array(8)
            .fill(0)
            .map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg animate-pulse"
                >
                    <div className="h-72 bg-slate-300"></div>

                    <div className="p-5">
                        <div className="h-4 w-20 bg-slate-300 rounded mb-4"></div>

                        <div className="h-6 w-full bg-slate-300 rounded mb-3"></div>

                        <div className="h-4 w-full bg-slate-300 rounded mb-2"></div>
                        <div className="h-4 w-3/4 bg-slate-300 rounded mb-5"></div>

                        <div className="flex justify-between items-center">
                            <div className="h-8 w-24 bg-slate-300 rounded"></div>

                            <div className="h-10 w-28 bg-slate-300 rounded-xl"></div>
                        </div>
                    </div>
                </div>
            ))
    }

    return (
        <div className="min-h-screen bg-slate-950 p-8">
            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-5xl font-bold text-white">
                    FakeStore Collection
                </h1>
                <p className="text-slate-400 mt-3">
                    Premium products at unbeatable prices
                </p>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {renderData}
            </div>
        </div>
    )
}

export default Products