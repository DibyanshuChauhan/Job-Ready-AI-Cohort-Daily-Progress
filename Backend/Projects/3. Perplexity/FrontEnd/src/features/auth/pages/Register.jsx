import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMail, FiUser } from "react-icons/fi";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";

import { useAuth } from "../hook/useAuth";

const Register = () => {
  const navigate = useNavigate();

  const { handleRegister } = useAuth();

  const { loading } = useSelector((state) => state.auth);

  const [acceptTerms, setAcceptTerms] = useState(false);

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptTerms) {
      return;
    }

    try {
      await handleRegister(registerData);

      setRegisterData({
        username: "",
        email: "",
        password: "",
      });

      setAcceptTerms(false);

      navigate("/ ");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join today and start managing everything in one place."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthInput
          label="Username"
          name="username"
          placeholder="john_doe"
          value={registerData.username}
          onChange={handleChange}
          autoComplete="username"
          icon={FiUser}
        />

        <AuthInput
          label="Email Address"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={registerData.email}
          onChange={handleChange}
          autoComplete="email"
          icon={FiMail}
        />

        <PasswordInput
          value={registerData.password}
          onChange={handleChange}
          autoComplete="new-password"
        />

        {/* Terms & Conditions */}

        <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-400">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-1 h-4 w-4 rounded accent-cyan-500"
          />

          <span className="leading-6">
            I agree to the{" "}
            <button
              type="button"
              className="font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              Privacy Policy
            </button>
          </span>
        </label>

        <AuthButton loading={loading} disabled={!acceptTerms}>
          Create Account
        </AuthButton>
      </form>

      {/* Footer */}

      <p className="mt-8 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-cyan-400 transition hover:text-cyan-300"
        >
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
