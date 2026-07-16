import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMail } from "react-icons/fi";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";

// Importing custom login handling hook
import { useAuth } from "../hook/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = useSelector((state) => state.auth.loading);

  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { email, password };

      await handleLogin(payload);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.error("Login request failed: ", error);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your account."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
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
          autoComplete="current-password"
        />

        <AuthButton loading={loading}>Sign In</AuthButton>
      </form>

      {/* Footer Navigation */}
      <p className="mt-8 text-center text-xs font-medium text-neutral-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-bold text-teal-400 transition hover:text-teal-300"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
