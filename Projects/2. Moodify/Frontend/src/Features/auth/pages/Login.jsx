import "../style/form.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  };

  return (
    <main className="form-page">
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <FormGroup
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="Enter your email"
          />

          <FormGroup
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password"
          />

          <button className="button" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
