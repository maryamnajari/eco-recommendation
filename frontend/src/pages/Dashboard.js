import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { Container, Typography, Card, CardContent, Avatar } from "@mui/material";
import { green } from "@mui/material/colors";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must log in first!");
            navigate("/login");
        } else {
            setUser(JSON.parse(storedUser));
            fetchUserData();
        }
    }, [navigate]);

    const fetchUserData = async () => {
        try {
            const response = await api.get("/auth/me");
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: "30px", textAlign: "center" }}>
            <Card sx={{ backgroundColor: green[50], padding: "20px", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
                <CardContent>
                    <Avatar sx={{ bgcolor: green[500], width: 80, height: 80, margin: "0 auto" }}>
                        {user?.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h5" sx={{ color: green[700], fontWeight: "bold", marginTop: "10px" }}>
                        {user ? `Welcome, ${user.name}! 🌱` : "Loading..."}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "gray", marginTop: "5px" }}>
                        📧 {user?.email}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Dashboard;
