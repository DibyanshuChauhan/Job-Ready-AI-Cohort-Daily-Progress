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
      whileHover={{
        y: -2,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.2,
      }}
      type={type}
      disabled={loading || disabled}
      className={`
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-cyan-500
        px-5
        py-3.5
        text-sm
        font-semibold
        text-slate-950
        shadow-lg
        shadow-cyan-500/20
        transition-all
        duration-300

        hover:bg-cyan-400
        hover:shadow-cyan-400/30

        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-50

        ${className}
      `}
    >
      {loading ? (
        <>
          <ImSpinner8 className="animate-spin text-lg" />
          Please wait...
        </>
      ) : (
        <>
          {children}

          <FiArrowRight
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </>
      )}
    </motion.button>
  );
};

export default AuthButton;
