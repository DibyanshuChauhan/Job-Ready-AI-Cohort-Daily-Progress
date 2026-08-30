import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { useAuth } from '../../hook/useAuth';
import CustomCursor from '../../../shared/components/CustomCursor';
import ThemeToggle from '../../../shared/components/ThemeToggle';

const Login = () => {
    const { handleLogin } = useAuth();
    const { loading, error: reduxError } = useSelector((state) => state.auth);

    // Form State
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // UI State
    const [showPassword, setShowPassword] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [successData, setSuccessData] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear validation error when user types
        if (validationError) setValidationError('');
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return 'Please enter a valid email address.';
        }
        if (formData.password.length < 6) {
            return 'Password must be at least 6 characters long.';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMsg = validateForm();
        if (errorMsg) {
            setValidationError(errorMsg);
            return;
        }

        const result = await handleLogin({
            email: formData.email,
            password: formData.password,
        });

        if (result && result.success) {
            setSuccessData(result.user || formData);
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#FBF9F6] dark:bg-[#070708] text-zinc-900 dark:text-zinc-100 transition-colors duration-700 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black md:cursor-none">

            {/* Reusable Custom Mouse Cursor */}
            <CustomCursor />

            {/* Editorial branding sidebar */}
            <div className="w-full lg:w-5/12 bg-[#F5F2EC] dark:bg-[#0E0E10] border-b lg:border-b-0 lg:border-r border-zinc-200/80 dark:border-zinc-800/30 flex flex-col justify-between p-8 md:p-16 lg:p-24 relative overflow-hidden transition-colors duration-700">

                {/* Subtle geometric line pattern in background */}
                <div className="absolute inset-0 pointer-events-none opacity-5">
                    <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-zinc-900 dark:bg-white"></div>
                    <div className="absolute left-[30%] top-0 bottom-0 w-[1px] bg-zinc-900 dark:bg-white"></div>
                    <div className="absolute left-0 right-0 top-[20%] h-[1px] bg-zinc-900 dark:bg-white"></div>
                    <div className="absolute left-0 right-0 top-[60%] h-[1px] bg-zinc-900 dark:bg-white"></div>
                </div>

                <div className="relative z-10 animate-[fadeIn_0.8s_ease-out]">
                    <span className="font-cinzel text-xs tracking-[0.4em] uppercase text-zinc-500 dark:text-zinc-400 block mb-8">
                        ARCHIVE PROTOCOL
                    </span>
                    <h1 className="font-cinzel text-5xl md:text-7xl font-semibold tracking-[0.15em] mb-4 text-zinc-955 dark:text-white">
                        SNITCH
                    </h1>
                    <div className="h-[2px] w-12 bg-zinc-950 dark:bg-white mb-8"></div>
                </div>

                <div className="my-12 lg:my-0 relative z-10 max-w-sm animate-[fadeIn_1s_ease-out]">
                    <p className="font-serif text-lg md:text-xl leading-relaxed italic text-zinc-800 dark:text-zinc-300 mb-6">
                        "The secret is in the seams."
                    </p>
                    <p className="text-xs tracking-widest leading-relaxed text-zinc-650 dark:text-zinc-400 uppercase font-mono">
                        A premium digital archive built for curated garments, contemporary streetwear, and raw denim. Designed with absolute restraint.
                    </p>
                </div>

                <div className="relative z-10 flex items-center space-x-3 text-xs tracking-widest text-zinc-500 dark:text-zinc-400 font-mono animate-[fadeIn_1.2s_ease-out]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>EST. 2026 / ATELIER SECURE</span>
                </div>
            </div>

            {/* Main Form Area */}
            <div className="w-full lg:w-7/12 flex flex-col justify-between p-8 md:p-16 lg:p-24 relative">

                {/* Header with Theme Toggle */}
                <div className="flex justify-between items-center mb-12 lg:mb-0">
                    <div className="lg:hidden">
                        <span className="font-cinzel text-lg tracking-[0.2em] font-bold text-zinc-955 dark:text-white">SNITCH</span>
                    </div>
                    <ThemeToggle />
                </div>

                {/* Form Container */}
                <div className="my-auto max-w-lg w-full mx-auto lg:py-12">
                    {successData ? (
                        /* Success State screen */
                        <div className="animate-[fadeIn_0.8s_ease-out]">
                            <div className="w-16 h-16 border border-zinc-950 dark:border-white rounded-full flex items-center justify-center mb-8">
                                <svg className="w-6 h-6 text-zinc-950 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            <h2 className="font-cinzel text-3xl font-semibold tracking-wider mb-4 text-zinc-955 dark:text-white">
                                ACCESS AUTHORIZED
                            </h2>
                            <p className="text-sm text-zinc-650 dark:text-zinc-400 mb-8 leading-relaxed font-sans">
                                Authentication successful. Welcome back to the Snitch digital archive showroom.
                            </p>

                            <div className="border border-zinc-200 dark:border-zinc-800/30 p-6 rounded-lg font-mono text-xs space-y-3 bg-[#F5F2EC]/40 dark:bg-[#0E0E10]/40">
                                <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800/30 pb-2">
                                    <span className="text-zinc-500 dark:text-zinc-500">MEMBER ACCESS:</span>
                                    <span className="text-zinc-950 dark:text-zinc-200 truncate max-w-[200px]">{successData.fullname || successData.email}</span>
                                </div>
                                <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800/30 pb-2">
                                    <span className="text-zinc-500 dark:text-zinc-500">NODE STATUS:</span>
                                    <span className="text-emerald-600 dark:text-emerald-500 font-bold">CONNECTED</span>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-4">
                                <button
                                    onClick={() => setSuccessData(null)}
                                    className="font-mono text-xs tracking-widest border border-zinc-950 dark:border-white hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 py-3.5 px-6 rounded-sm uppercase cursor-pointer"
                                >
                                    Disconnect Node
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Login Form */
                        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                            <div>
                                <h2 className="font-cinzel text-3xl font-semibold tracking-wider mb-2 text-zinc-900 dark:text-white">
                                    ATELIER ACCESS
                                </h2>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono tracking-wider uppercase mb-8">
                                    Verify your security credentials to access the archive.
                                </p>
                            </div>

                            {/* Validation & Redux Errors */}
                            {(validationError || reduxError) && (
                                <div className="border border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 p-4 rounded-md text-xs font-mono flex items-start space-x-2 animate-[shake_0.4s_ease-in-out]">
                                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                    </svg>
                                    <span>{validationError || reduxError}</span>
                                </div>
                            )}

                            <div className="space-y-6">

                                {/* Email Address */}
                                <div className="relative group">
                                    <label htmlFor="email" className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 dark:text-zinc-400 uppercase block mb-1">
                                        01 / EMAIL ADDRESS
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="username"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-b border-zinc-300 focus:border-zinc-900 dark:border-zinc-800 dark:focus:border-white py-2.5 outline-none transition-all duration-500 font-sans text-sm text-zinc-900 dark:text-white placeholder-zinc-400/80 dark:placeholder-zinc-600/80"
                                        placeholder="Enter your registered email"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-zinc-900 dark:bg-white group-focus-within:w-full transition-all duration-500"></div>
                                </div>

                                {/* Password */}
                                <div className="relative group">
                                    <label htmlFor="new-password" className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 dark:text-zinc-400 uppercase block mb-1">
                                        02 / SECURE PASSWORD
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="new-password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            autoComplete="current-password"
                                            required
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full bg-transparent border-b border-zinc-300 focus:border-zinc-900 dark:border-zinc-800 dark:focus:border-white py-2.5 pr-10 outline-none transition-all duration-500 font-sans text-sm text-zinc-900 dark:text-white placeholder-zinc-400/80 dark:placeholder-zinc-600/80"
                                            placeholder="••••••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors p-1"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-zinc-900 dark:bg-white group-focus-within:w-full transition-all duration-500"></div>
                                </div>

                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full font-mono text-xs tracking-[0.3em] font-semibold py-4 border rounded-sm transition-all duration-500 select-none uppercase cursor-pointer flex items-center justify-center space-x-2 ${loading
                                            ? 'bg-transparent border-zinc-200 text-zinc-400 dark:border-zinc-800 dark:text-zinc-600 cursor-not-allowed'
                                            : 'bg-zinc-900 text-white border-zinc-900 hover:bg-transparent hover:text-zinc-900 dark:bg-white dark:text-black dark:border-white dark:hover:bg-transparent dark:hover:text-white'
                                        }`}
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-pulse"></span>
                                            <span>AUTHORIZING ACCESS...</span>
                                        </>
                                    ) : (
                                        <span>AUTHORIZE ACCESS</span>
                                    )}
                                </button>
                            </div>

                            {/* Redirect Link to Register page */}
                            <div className="mt-4 text-center font-mono text-[10px] tracking-widest uppercase">
                                <span className="text-zinc-500">New to the Atelier? </span>
                                <Link
                                    to="/register"
                                    className="text-zinc-900 dark:text-white border-b border-zinc-900 dark:border-white hover:border-transparent transition-all pb-0.5 cursor-pointer"
                                >
                                    Create signature key
                                </Link>
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-12 lg:mt-0 pt-8 border-t border-zinc-200 dark:border-zinc-800/20 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase space-y-4 md:space-y-0">
                    <span>ALL SESSIONS SECURE</span>
                    <div className="space-x-4">
                        <span className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer">ARCHIVE COLLECTION</span>
                        <span>/</span>
                        <span className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer">TERMS & VALUES</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;