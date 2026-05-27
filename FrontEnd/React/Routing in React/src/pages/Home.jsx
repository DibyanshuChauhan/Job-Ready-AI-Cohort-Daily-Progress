const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen">

            {/* Hero Section */}
            <section className="flex items-center justify-between px-16 py-20 bg-blue-600 text-white">
                <div className="max-w-lg">
                    <h1 className="text-5xl font-bold mb-6">
                        Upgrade Your Style With ShopEase
                    </h1>
                    <p className="text-lg mb-6">
                        Explore premium fashion, electronics, footwear, and accessories
                        at amazing discounts.
                    </p>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
                        Shop Collection
                    </button>
                </div>

                <img
                    src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
                    alt="shopping"
                    className="w-[450px] rounded-xl shadow-lg"
                />
            </section>

            {/* Categories */}
            <section className="px-16 py-16">
                <h2 className="text-3xl font-bold text-center mb-10">Shop By Category</h2>

                <div className="grid grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg">
                        <h3 className="text-xl font-semibold">Fashion</h3>
                        <p className="text-gray-500 mt-2">Latest trendy outfits</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg">
                        <h3 className="text-xl font-semibold">Electronics</h3>
                        <p className="text-gray-500 mt-2">Smart gadgets & devices</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg">
                        <h3 className="text-xl font-semibold">Footwear</h3>
                        <p className="text-gray-500 mt-2">Shoes for every occasion</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg">
                        <h3 className="text-xl font-semibold">Accessories</h3>
                        <p className="text-gray-500 mt-2">Watches, bags & more</p>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="px-16 pb-20">
                <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>

                <div className="grid grid-cols-3 gap-8">
                    <div className="bg-white rounded-xl shadow p-5 hover:shadow-xl">
                        <img
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                            alt="shoe"
                            className="w-full h-60 object-cover rounded-lg"
                        />
                        <h3 className="text-xl font-semibold mt-4">Nike Running Shoes</h3>
                        <p className="text-blue-600 font-bold mt-2">$89</p>
                        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                            Add to Cart
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5 hover:shadow-xl">
                        <img
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                            alt="watch"
                            className="w-full h-60 object-cover rounded-lg"
                        />
                        <h3 className="text-xl font-semibold mt-4">Smart Watch</h3>
                        <p className="text-blue-600 font-bold mt-2">$149</p>
                        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                            Add to Cart
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5 hover:shadow-xl">
                        <img
                            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                            alt="headphones"
                            className="w-full h-60 object-cover rounded-lg"
                        />
                        <h3 className="text-xl font-semibold mt-4">Wireless Headphones</h3>
                        <p className="text-blue-600 font-bold mt-2">$99</p>
                        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;