import { Link } from "react-router-dom";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
            <div className="text-center max-w-2xl">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-6 rounded-full bg-red-500/20 border border-red-500/30 shadow-lg">
                        <AlertTriangle className="w-16 h-16 text-red-400" />
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className="text-7xl md:text-9xl font-extrabold text-white tracking-wider">
                    404
                </h1>

                {/* Heading */}
                <h2 className="mt-4 text-2xl md:text-4xl font-bold text-gray-200">
                    Oops! Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-4 text-gray-400 text-sm md:text-lg leading-relaxed px-2">
                    The page you’re looking for doesn’t exist, may have been moved,
                    or the URL might be incorrect.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-medium shadow-lg hover:scale-105"
                    >
                        <Home size={20} />
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-600 bg-gray-800 hover:bg-gray-700 transition-all duration-300 text-white font-medium shadow-lg hover:scale-105"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;