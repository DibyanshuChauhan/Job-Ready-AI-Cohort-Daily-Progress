import { useState } from "react";
import { motion } from "framer-motion";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({
  label = "Password",
  name = "password",
  value,
  onChange,
  placeholder = "Enter your password",
  autoComplete = "current-password",
  error,
  required = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

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
        {/* Lock Icon */}
        <FiLock
          size={20}
          className="
            mr-3
            text-slate-500
            transition-colors
            duration-300
            group-focus-within:text-cyan-400
          "
        />

        {/* Password Input */}
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="
            flex-1
            bg-transparent
            text-sm
            text-white
            placeholder:text-slate-500
            outline-none
          "
        />

        {/* Toggle Password */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="
            ml-3
            rounded-lg
            p-2
            text-slate-500
            transition-all
            duration-300
            hover:bg-slate-800
            hover:text-cyan-400
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500/20
          "
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
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

export default PasswordInput;
