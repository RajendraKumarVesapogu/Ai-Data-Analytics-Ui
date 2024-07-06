import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import constants from "../constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("called");
    console.log(email, password);

    await axios.post(
        constants.backend_url + constants.login_path,
        {
          email,
          password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        if (response.data && response.data.token) {
            localStorage.setItem("token", response.data.token);
            navigate("/home");
        }
        setResponse(response);
    });
  };

  return (
    <div className="login-root">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="text-field-label">
          email
          <input
            className="text-field"
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="text-field-label">
          password
          <input
            type="password" // Password field should be hidden
            className="text-field"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="login-btn">
          <button className="login-btn">submit</button>
        </div>
        {/* Display success message on successful login */}
        {response?.status === 200 || response?.status === 201 ? (
          <p className="success-message">Login successful!</p>
        ) : null}
        <div className="register-link">
          <Link to="/register">Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
