const Products = () => {

        

    const products = [
        {
            id: 1,
            name: "Nike Running Shoes",
            price: "$89",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
        },
        {
            id: 2,
            name: "Smart Watch",
            price: "$149",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
        },
        {
            id: 3,
            name: "Wireless Headphones",
            price: "$99",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
            id: 4,
            name: "Leather Backpack",
            price: "$120",
            image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa"
        },
        {
            id: 5,
            name: "Casual T-Shirt",
            price: "$35",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
        },
        {
            id: 6,
            name: "Gaming Keyboard",
            price: "$75",
            image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae"
        }
    ];

    return (
        <div className="bg-gray-100 min-h-screen px-16 py-10">

            {/* Page Heading */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">Our Products</h1>
                <p className="text-gray-600 mt-3">
                    Explore our latest collection of premium products
                </p>
            </div>

            {/* Search + Filter */}
            <div className="flex justify-between items-center mb-10">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-[350px] px-4 py-3 rounded-lg border border-gray-300 outline-none"
                />

                <select className="px-4 py-3 rounded-lg border border-gray-300 outline-none">
                    <option>All Categories</option>
                    <option>Fashion</option>
                    <option>Electronics</option>
                    <option>Accessories</option>
                    <option>Footwear</option>
                </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl shadow p-5 hover:shadow-xl"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-60 object-cover rounded-lg"
                        />

                        <h2 className="text-xl font-semibold mt-4">
                            {product.name}
                        </h2>

                        <p className="text-blue-600 font-bold mt-2">
                            {product.price}
                        </p>

                        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Products;