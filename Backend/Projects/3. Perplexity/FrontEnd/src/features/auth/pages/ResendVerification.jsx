import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { useAuth } from "../hook/useAuth";
import { useToast } from "../../../context/ToastContext";

const ResendVerification = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleResendVerification } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Structural Pre-flight Validation check
    if (!email.trim()) {
      return showToast(
        "Please input your email address configuration.",
        "warning",
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return showToast(
        "Invalid address syntax: Check email structure.",
        "warning",
      );
    }

    try {
      setLoading(true);

      // Dispatch request context to authentication layer
      const response = await handleResendVerification(email);

      // Success payload received from your backend handler
      showToast(
        response?.message || "Verification mail link successfully dispatched!",
        "success",
      );
      setEmail("");
    } catch (error) {
      // Catch expected failure states from express validators or user existence logic
      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        error.response.data.errors.forEach((err) =>
          showToast(err.msg, "error"),
        );
      } else {
        showToast(
          error.response?.data?.message ||
            "Verification request rejected by authentication cluster node.",
          "error",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Resend Token"
      subtitle="Input your system profile email to dispatch a fresh active validation node link."
    >
      <form onSubmit={handleSubmit} className="space-y-6 select-none">
        <AuthInput
          label="Registered Email Address"
          type="email"
          name="email"
          placeholder="operator@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          icon={FiMail}
        />

        <AuthButton loading={loading}>Dispatch Token Link</AuthButton>
      </form>

      <div className="mt-8 text-center text-xs font-medium text-neutral-500 space-y-2 select-none">
        <p>
          Remembered account credentials?{" "}
          <Link
            to="/login"
            className="font-bold text-teal-400 transition hover:text-teal-300"
          >
            Sign In
          </Link>
        </p>
        <p>
          New user?{" "}
          <Link
            to="/register"
            className="font-bold text-neutral-400 transition hover:text-neutral-200"
          >
            Create account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ResendVerification;
