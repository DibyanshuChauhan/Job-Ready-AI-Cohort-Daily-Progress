import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";

const AuthButton = ({
  children,
  loading = false,
  disabled = false,
  type = "submit",
  className = "",
}) => {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      type={type}
      disabled={loading || disabled}
      className={`
        flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-teal-950/20 transition-all duration-300
        hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer
        ${className}
      `}
    >
      {loading ? (
        <>
          <ImSpinner8 className="animate-spin text-base" />
          Processing workspace...
        </>
      ) : (
        <>
          {children}
          <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </>
      )}
    </motion.button>
  );
};

export default AuthButton;