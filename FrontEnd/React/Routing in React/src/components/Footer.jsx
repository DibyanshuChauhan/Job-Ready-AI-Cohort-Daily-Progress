import { useNavigate } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate()

    return (
        <footer className="bg-gray-900 text-white mt-16">
            <div className="max-w-7xl mx-auto px-10 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand Section */}
                <div>
                    <h2 className="text-3xl font-bold text-blue-400">
                        ShopEase
                    </h2>
                    <p className="mt-4 text-gray-400 leading-relaxed">
                        Your one-stop destination for fashion, electronics,
                        accessories, and lifestyle essentials.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>
                            <button onClick={() => navigate('/')} className="hover:text-white transition cursor-pointer hover:underline">
                                Home
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigate('/categories')} className="hover:text-white transition cursor-pointer hover:underline">
                                Categories
                            </button>
                        </li>
                        <li>
                        </li>
                        <li>
                            <button onClick={() => navigate('/contact')} className="hover:text-white transition cursor-pointer hover:underline">
                                Contact
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Customer Support
                    </h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>Help Center</li>
                        <li>Returns & Refunds</li>
                        <li>Shipping Info</li>
                        <li>Track Order</li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Follow Us
                    </h3>
                    <div className="flex gap-4">
                        <button
                            href="#"
                            className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition"
                        >
                            FB
                        </button>

                        <button
                            href="#"
                            className="bg-gray-800 p-3 rounded-full hover:bg-pink-500 transition"
                        >
                            IG
                        </button>

                        <button
                            href="#"
                            className="bg-gray-800 p-3 rounded-full hover:bg-sky-500 transition"
                        >
                            TW
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 py-5 text-center text-gray-400">
                © 2026 ShopEase. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;