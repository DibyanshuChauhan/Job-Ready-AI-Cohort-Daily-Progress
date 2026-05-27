import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
            {/* Logo */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">ShopEase</h1>
            </div>

            {/* Navigation Links */}
            <div className="flex gap-8 text-gray-700 font-medium">
                <NavLink to="/" style={({ isActive }) => ({
                    color: isActive ? 'blue' : 'grey'
                })} className="hover:text-blue-600 transition">
                    Home
                </NavLink>

                <NavLink to="/products" style={({ isActive }) => ({
                    color: isActive ? 'blue' : 'grey'
                })} className="hover:text-blue-600 transition">
                    Products
                </NavLink>

                <NavLink to="/categories" style={({ isActive }) => ({
                    color: isActive ? 'blue' : 'grey'
                })} className="hover:text-blue-600 transition">
                    Categories
                </NavLink>

                <NavLink to="/deals" style={({ isActive }) => ({
                    color: isActive ? 'blue' : 'grey'
                })} className="hover:text-blue-600 transition">
                    Deals
                </NavLink>

                <NavLink to="/cart" style={({ isActive }) => ({
                    color: isActive ? 'blue' : 'grey'
                })} className="hover:text-blue-600 transition">
                    Cart
                </NavLink>

                <NavLink to="/contact" style={({ isActive }) => ({
                    color: isActive ? 'blue' : 'grey'
                })} className="hover:text-blue-600 transition">
                    Contact
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;