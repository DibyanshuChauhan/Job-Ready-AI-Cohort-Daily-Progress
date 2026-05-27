const Deals = () => {
    const deals = [
        {
            id: 1,
            name: "Nike Running Shoes",
            originalPrice: "$120",
            dealPrice: "$89",
            discount: "25% OFF",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
        },
        {
            id: 2,
            name: "Smart Watch",
            originalPrice: "$199",
            dealPrice: "$149",
            discount: "20% OFF",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
        },
        {
            id: 3,
            name: "Wireless Headphones",
            originalPrice: "$130",
            dealPrice: "$99",
            discount: "24% OFF",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        },
        {
            id: 4,
            name: "Gaming Keyboard",
            originalPrice: "$95",
            dealPrice: "$75",
            discount: "21% OFF",
            image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae"
        },
        {
            id: 5,
            name: "Leather Backpack",
            originalPrice: "$150",
            dealPrice: "$120",
            discount: "20% OFF",
            image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa"
        },
        {
            id: 6,
            name: "Casual T-Shirt",
            originalPrice: "$50",
            dealPrice: "$35",
            discount: "30% OFF",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
        }
    ];

    return (
        <div className="bg-gray-100 min-h-screen px-16 py-10">

            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">
                    Hot Deals & Discounts
                </h1>
                <p className="text-gray-600 mt-3">
                    Grab the best offers before they’re gone!
                </p>
            </div>

            {/* Deals Banner */}
            <div className="bg-red-500 text-white rounded-xl p-8 flex justify-between items-center mb-12">
                <div>
                    <h2 className="text-3xl font-bold">Mega Sale Weekend</h2>
                    <p className="mt-3 text-lg">
                        Up to 50% OFF on selected products
                    </p>
                </div>

                <button className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
                    Shop Now
                </button>
            </div>

            {/* Deals Grid */}
            <div className="grid grid-cols-3 gap-8">
                {deals.map((deal) => (
                    <div
                        key={deal.id}
                        className="bg-white rounded-xl shadow p-5 hover:shadow-xl relative"
                    >
                        {/* Discount Badge */}
                        <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                            {deal.discount}
                        </span>

                        <img
                            src={deal.image}
                            alt={deal.name}
                            className="w-full h-60 object-cover rounded-lg"
                        />

                        <h2 className="text-xl font-semibold mt-4">
                            {deal.name}
                        </h2>

                        <div className="flex gap-4 items-center mt-2">
                            <p className="text-gray-500 line-through">
                                {deal.originalPrice}
                            </p>

                            <p className="text-green-600 font-bold text-lg">
                                {deal.dealPrice}
                            </p>
                        </div>

                        <button className="w-full mt-5 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                            Grab Deal
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Deals;