const Cart = () => {
    const cartItems = [
        {
            id: 1,
            name: "Nike Running Shoes",
            price: 89,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 149,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
        }
    ];

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="bg-gray-100 min-h-screen px-16 py-10">

            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">
                    Shopping Cart
                </h1>
                <p className="text-gray-600 mt-3">
                    Review your selected items
                </p>
            </div>

            <div className="grid grid-cols-3 gap-10">

                {/* Cart Items */}
                <div className="col-span-2 space-y-6">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-5 rounded-xl shadow flex items-center gap-6"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-32 h-32 object-cover rounded-lg"
                            />

                            <div className="flex-1">
                                <h2 className="text-xl font-semibold">
                                    {item.name}
                                </h2>

                                <p className="text-gray-600 mt-2">
                                    Price: ${item.price}
                                </p>

                                <div className="flex items-center gap-4 mt-4">
                                    <button className="bg-gray-200 px-4 py-2 rounded">
                                        -
                                    </button>

                                    <span className="text-lg font-semibold">
                                        {item.quantity}
                                    </span>

                                    <button className="bg-gray-200 px-4 py-2 rounded">
                                        +
                                    </button>
                                </div>
                            </div>

                            <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-xl shadow h-fit">
                    <h2 className="text-2xl font-bold mb-6">
                        Order Summary
                    </h2>

                    <div className="space-y-4 text-gray-700">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>$15</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>$10</span>
                        </div>

                        <hr />

                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>${subtotal + 15 + 10}</span>
                        </div>
                    </div>

                    <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                        Proceed to Checkout
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Cart;