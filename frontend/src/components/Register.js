import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const register = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/register", user);
            alert("Registration successful!");
        } catch (error) {
            console.error("Error registering:", error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <button onClick={register}>Register</button>
        </div>
    );
};

export default Register;
