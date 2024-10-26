import React from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/Login/LoginComponent";
import { useAuth } from "../hooks/AuthContext"; // Import useAuth from AuthContext

const LoginPage = () => {
	const { login } = useAuth(); // Access the login function from the context
	const navigate = useNavigate();

	const handleLogin = (userId) => {
		login(userId); // Use the login function to set the user globally
		navigate("/calendar"); // Navigate to the calendar page after login
	};

	return <LoginComponent onLogin={handleLogin} />;
};

export default LoginPage;
