import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-black to-slate-950 flex items-center justify-center px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Section */}
                <div>
                    <span className="px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-medium">
                        🚀 New Collection Available
                    </span>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mt-6 leading-tight">
                        Discover Your
                        <span className="text-indigo-500"> Perfect </span>
                        Products
                    </h1>

                    <p className="text-slate-400 text-lg mt-6 leading-relaxed">
                        Explore premium products with amazing deals, top-rated reviews,
                        and unbeatable prices. Everything you need in one place.
                    </p>

                    <div className="flex gap-4 mt-8">
                        <button
                            onClick={() => navigate("/products")}
                            className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition duration-300 shadow-lg shadow-indigo-500/30"
                        >
                            Explore Products
                        </button>

                        <button className="px-8 py-4 border border-slate-600 text-white rounded-xl hover:bg-slate-800 transition duration-300">
                            Learn More
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-10 mt-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white">500+</h2>
                            <p className="text-slate-400">Products</p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-white">10k+</h2>
                            <p className="text-slate-400">Customers</p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-white">4.9★</h2>
                            <p className="text-slate-400">Ratings</p>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="relative hidden lg:flex justify-center">
                    <div className="absolute w-80 h-80 bg-indigo-600 rounded-full blur-[120px] opacity-30"></div>

                    <img
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
                        alt="Hero Product"
                        className="relative z-10 w-112.5 rounded-3xl shadow-2xl"
                    />
                </div>

            </div>
        </div>
    );
};

export default Home;