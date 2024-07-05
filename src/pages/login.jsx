import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("called");
        console.log(username, password);

        // fetch(" ", {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         password: password,
        //     }),
        // }).then((response) => {
        //     localStorage.setItem("login-response", response);
        //     if (true) {
        //         // if (response.ok) {
        //         navigate("/home");
        //     }
        // });
        localStorage.setItem("token", "the valuble token");
        navigate("/home");
    };

    return (
        <div className="login-root">
            <h3>Login</h3>
            <form>
                <label htmlFor="username" className="text-field-label">
                    username
                    <input
                        className="text-field"
                        type="text"
                        name="username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label htmlFor="password" className="text-field-label">
                    password
                    <input
                        type="text"
                        className="text-field"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <div className="login-btn">
                    <button className="login-btn" onClick={handleSubmit}>
                        submit
                    </button>
                </div>
                <div className="register-link">
                    <Link to="/register">Register here</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
