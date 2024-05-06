import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        // Clear authentication token when user logs out
        sessionStorage.removeItem('token');
        localStorage.clear();
        // Navigate to the login page
        navigate("/");
        
        // Other logout logic...
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default Logout;
