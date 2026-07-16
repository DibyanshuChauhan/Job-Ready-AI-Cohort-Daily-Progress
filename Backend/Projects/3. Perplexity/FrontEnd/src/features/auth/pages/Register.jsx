import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMail, FiUser } from "react-icons/fi";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";

// Importing custom registration handling hook
import { useAuth } from "../hook/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Extract loading tracker from Redux store
  const loading = useSelector((state) => state.auth.loading);

  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptTerms) return;

    try {
      const payload = { username, email, password };

      await handleRegister(payload);

      setUsername("");
      setEmail("");
      setPassword("");
      setAcceptTerms(false);

      navigate("/");
    } catch (error) {
      console.error("Registration request failed: ", error);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join today and start managing everything in one place."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Field */}
        <AuthInput
          label="Username"
          name="username"
          placeholder="john_doe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          icon={FiUser}
        />

        {/* Email Field */}
        <AuthInput
          label="Email Address"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          icon={FiMail}
        />

        {/* Password Field */}
        <PasswordInput
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        {/* Terms & Conditions Checkbox */}
        <label className="flex cursor-pointer items-start gap-3 text-sm text-neutral-400 select-none">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-neutral-800 bg-neutral-900/40 text-teal-600 accent-teal-500 transition-colors cursor-pointer"
          />
          <span className="leading-5 text-xs text-neutral-500 font-medium">
            I agree to the{" "}
            <button
              type="button"
              className="font-bold text-teal-400 transition hover:text-teal-300 cursor-pointer"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="font-bold text-teal-400 transition hover:text-teal-300 cursor-pointer"
            >
              Privacy Policy
            </button>
          </span>
        </label>

        <AuthButton loading={loading} disabled={!acceptTerms}>
          Create Account
        </AuthButton>
      </form>

      {/* Footer Navigation Switcher */}
      <p className="mt-8 text-center text-xs font-medium text-neutral-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-teal-400 transition hover:text-teal-300"
        >
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
