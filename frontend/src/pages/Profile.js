import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
            .then(response => setUser(response.data))
            .catch(error => console.error("Error fetching user data:", error));
    }, [token]);

    return (
        <div>
            <h1>👤 User Profile</h1>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
