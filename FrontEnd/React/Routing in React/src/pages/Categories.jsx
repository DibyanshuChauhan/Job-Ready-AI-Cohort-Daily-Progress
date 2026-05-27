const Categories = () => {
    const categories = [
        {
            id: 1,
            name: "Fashion",
            description: "Trendy clothing for men & women",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8"
        },
        {
            id: 2,
            name: "Electronics",
            description: "Latest gadgets & smart devices",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
        },
        {
            id: 3,
            name: "Footwear",
            description: "Stylish shoes for every occasion",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
        },
        {
            id: 4,
            name: "Accessories",
            description: "Watches, bags, headphones & more",
            image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49"
        },
        {
            id: 5,
            name: "Beauty",
            description: "Skincare, makeup & grooming essentials",
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348"
        },
        {
            id: 6,
            name: "Home Decor",
            description: "Furniture and decor for your home",
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
        }
    ];

    return (
        <div className="bg-gray-100 min-h-screen px-16 py-10">

            {/* Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">
                    Shop By Categories
                </h1>
                <p className="text-gray-600 mt-3">
                    Browse products by your favorite category
                </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-3 gap-8">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white rounded-xl shadow hover:shadow-xl overflow-hidden"
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-56 object-cover"
                        />

                        <div className="p-5 text-center">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                {category.name}
                            </h2>

                            <p className="text-gray-600 mt-3">
                                {category.description}
                            </p>

                            <button className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                Explore
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Categories;