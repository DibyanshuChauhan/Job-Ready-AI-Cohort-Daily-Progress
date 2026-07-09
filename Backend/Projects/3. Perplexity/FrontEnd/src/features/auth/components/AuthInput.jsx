import { motion } from "framer-motion";

const AuthInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  autoComplete,
  error,
  required = true,
}) => {
  return (
    <div className="space-y-2">
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-sm font-medium tracking-wide text-slate-300"
      >
        {label}
      </label>

      {/* Input Wrapper */}
      <motion.div
        whileFocus={{ scale: 1.01 }}
        className={`
          group
          flex
          items-center
          rounded-xl
          border
          px-4
          py-3.5
          transition-all
          duration-300

          ${
            error
              ? "border-red-500 bg-red-500/5"
              : "border-slate-700 bg-slate-900/60 hover:border-slate-600"
          }

          focus-within:border-cyan-400
          focus-within:ring-4
          focus-within:ring-cyan-500/10
        `}
      >
        {/* Left Icon */}
        {Icon && (
          <Icon
            size={20}
            className="
              mr-3
              text-slate-500
              transition-colors
              duration-300
              group-focus-within:text-cyan-400
            "
          />
        )}

        {/* Input */}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="
            w-full
            bg-transparent
            text-white
            placeholder:text-slate-500
            outline-none
            text-sm
          "
        />
      </motion.div>

      {/* Error */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default AuthInput;
