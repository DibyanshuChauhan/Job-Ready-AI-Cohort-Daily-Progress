import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiUser, FiShield } from "react-icons/fi";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";

import { useAuth } from "../hook/useAuth";
import { useToast } from "../../chat/context/ToastContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const navigate = useNavigate();
  const { handleRegister } = useAuth();
  const { showToast } = useToast();

  // Strict password complexity regex matching backend constraints
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Client-Side Pre-flight Validation & Warnings
    if (!username || !email || !password) {
      return showToast(
        "All structural identity fields are mandatory.",
        "warning",
      );
    }

    if (username.trim().length < 3 || username.trim().length > 30) {
      return showToast(
        "Username length restriction: Must be between 3 and 30 characters.",
        "warning",
      );
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      return showToast(
        "Username syntax error: Only letters, numbers, and underscores permitted.",
        "warning",
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return showToast(
        "Invalid address syntax: Please verify email format.",
        "warning",
      );
    }

    if (!passwordRegex.test(password)) {
      return showToast(
        "Security baseline failed: Password metrics must satisfy all complexity constraints.",
        "error",
      );
    }

    try {
      setFormLoading(true);
      showToast("Provisioning core credentials and building node...", "info");

      const payload = { username, email, password };
      await handleRegister(payload);

      // Success sequence
      showToast(
        "Workspace initialized! A verification link has been dispatched to your inbox.",
        "success",
      );

      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      // 2. Parse and catch structural express-validator array payloads sent by the server
      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        error.response.data.errors.forEach((err) => {
          showToast(err.msg, "error");
        });
      } else {
        // Fallback for primary database duplicated record collisions or runtime timeouts
        showToast(
          error.response?.data?.message ||
            "Workspace construction rejected by authentication cluster node.",
          "error",
        );
      }
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Initialize your access credentials to proceed."
    >
      <form onSubmit={handleSubmit} className="space-y-5 select-none">
        {/* Username Input */}
        <AuthInput
          label="Username"
          name="username"
          placeholder="operator_node"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          icon={FiUser}
        />

        {/* Email Address Input */}
        <AuthInput
          label="Email Address"
          type="email"
          name="email"
          placeholder="operator@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={FiMail}
        />

        {/* Secure Password Input */}
        <PasswordInput
          label="Secure Password"
          name="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        {/* Dynamic High-End Interactive Requirement Checklist HUD Element */}
        <div className="bg-neutral-950/40 border border-neutral-900 rounded-xl p-3.5 text-[10px] font-mono text-neutral-500 space-y-1.5 transition-all duration-300">
          <p className="font-bold uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
            <FiShield size={11} className="text-neutral-500" />
            Entropy Requirements Matrix:
          </p>

          <div className="h-px bg-neutral-900/60 my-1" />

          <p
            className={`flex items-center gap-1.5 transition-colors duration-200 ${/.{8,}/.test(password) ? "text-teal-400" : ""}`}
          >
            <span className="font-bold">
              {/.{8,}/.test(password) ? "✓" : "•"}
            </span>
            <span>Minimum 8 structural characters</span>
          </p>

          <p
            className={`flex items-center gap-1.5 transition-colors duration-200 ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? "text-teal-400" : ""}`}
          >
            <span className="font-bold">
              {/[A-Z]/.test(password) && /[a-z]/.test(password) ? "✓" : "•"}
            </span>
            <span>Mixed casing (Both Uppercase & Lowercase)</span>
          </p>

          <p
            className={`flex items-center gap-1.5 transition-colors duration-200 ${/\d/.test(password) ? "text-teal-400" : ""}`}
          >
            <span className="font-bold">{/\d/.test(password) ? "✓" : "•"}</span>
            <span>Numeric digit inclusion [0-9]</span>
          </p>

          <p
            className={`flex items-center gap-1.5 transition-colors duration-200 ${/[@$!%*?&]/.test(password) ? "text-teal-400" : ""}`}
          >
            <span className="font-bold">
              {/[@$!%*?&]/.test(password) ? "✓" : "•"}
            </span>
            <span>Special character operational variable (@$!%*?&)</span>
          </p>
        </div>

        {/* Action Form Submission Button */}
        <AuthButton loading={formLoading}>Initialize Workspace</AuthButton>
      </form>

      {/* Account Route Footer Redirection Links */}
      <p className="mt-6 text-center text-xs font-medium text-neutral-500 select-none">
        Already registered?{" "}
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
