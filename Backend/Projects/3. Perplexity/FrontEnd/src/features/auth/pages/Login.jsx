import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMail } from "react-icons/fi";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";

import { useAuth } from "../hook/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const { loading } = useSelector((state) => state.auth);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleLogin(loginData);

      setLoginData({
        email: "",
        password: "",
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your account."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthInput
          label="Email Address"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={loginData.email}
          onChange={handleChange}
          autoComplete="email"
          icon={FiMail}
        />

        <PasswordInput
          value={loginData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />

        <AuthButton loading={loading}>
          Sign In
        </AuthButton>
      </form>

      {/* Footer */}

      <p className="mt-8 text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-cyan-400 transition hover:text-cyan-300"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;