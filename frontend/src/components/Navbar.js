import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { green } from "@mui/material/colors";

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <AppBar position="static" sx={{ bgcolor: green[700] }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Eco-Friendly App 🌿
                </Typography>
                {!isAuthenticated ? (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                        <Button color="inherit" component={Link} to="/products">Products</Button>
                        <Button color="inherit" component={Link} to="/profile">Profile</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
