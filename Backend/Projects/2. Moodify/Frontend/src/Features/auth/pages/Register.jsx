import FormGroup from "../components/FormGroup";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { handleRegister } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/login");
  };

  return (
    <main className="form-page">
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <FormGroup
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Name"
            placeholder="Enter yout name"
          />

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
            Register
          </button>
        </form>
        <p>
          Already have an account <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
