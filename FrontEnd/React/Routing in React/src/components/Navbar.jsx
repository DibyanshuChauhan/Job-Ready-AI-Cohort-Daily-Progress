import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
            {/* Logo */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">ShopEase</h1>
            </div>

            {/* Navigation Links */}
            <div className="flex gap-8 text-gray-700 font-medium">
                <Link to="/" className="hover:text-blue-600 transition">
                    Home
                </Link>

                <Link to="/products" className="hover:text-blue-600 transition">
                    Products
                </Link>

                <Link to="/categories" className="hover:text-blue-600 transition">
                    Categories
                </Link>

                <Link to="/deals" className="hover:text-blue-600 transition">
                    Deals
                </Link>

                <Link to="/cart" className="hover:text-blue-600 transition">
                    Cart
                </Link>

                <Link to="/contact" className="hover:text-blue-600 transition">
                    Contact
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;