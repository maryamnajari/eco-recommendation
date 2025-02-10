import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

            // ✅ Store Token & User ID properly
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user.id); // ✅ Save user ID

            console.log("✅ Login successful:", response.data.user);
            navigate("/dashboard");
        } catch (error) {
            console.error("❌ Login error:", error);
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: "50px", textAlign: "center" }}>
            <Card sx={{ padding: "20px", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
                <CardContent>
                    <Typography variant="h5" sx={{ color: green[700], fontWeight: "bold", marginBottom: "20px" }}>
                        Eco-Friendly Login 🌿
                    </Typography>
                    <TextField fullWidth label="Email" variant="outlined" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button fullWidth variant="contained" sx={{ bgcolor: green[700], marginTop: "15px" }} onClick={handleLogin}>
                        Login
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
