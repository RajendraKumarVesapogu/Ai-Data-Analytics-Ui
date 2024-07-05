import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import constants from "../constants";
import "./register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("called");
        console.log(username, password, email);

        // fetch(constants.backend_url + constants.register_path, {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         email: email,
        //         username: username,
        //         password: password,
        //     }),
        // }).then((response) => {
        //     localStorage.setItem("login-response", response);
        //     // if (true) {
        //     if (response.ok) {
        //         navigate("/home");
        //     }
        // });
        localStorage.setItem("token", "the valuble token");
        navigate("/");
    };
    return (
        <div className="register-root">
            <h3>Register</h3>
            <form>
                <label htmlFor="email" className="text-field-label">
                    email
                    <input
                        className="text-field"
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
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
                        className="text-field"
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <div className="submit-btn">
                    <button onClick={handleSubmit}>submit</button>
                </div>
                <div className="register-link">
                    <Link to="/">Login here</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
