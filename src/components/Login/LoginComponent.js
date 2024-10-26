import React, { useState } from "react";
import { users } from "../../data/users";
import "./LoginComponent.css";

const LoginComponent = ({ onLogin }) => {
	const [selectedUser, setSelectedUser] = useState(null);

	const handleLogin = () => {
		if (selectedUser) {
			onLogin(selectedUser); // Pass the selected user to the parent component
		}
	};

	return (
		<div className="login-container">
			<h2>Select User to Login</h2>
			<select
				className="login-select"
				onChange={(e) => setSelectedUser(Number(e.target.value))}
			>
				<option value="">Select a user</option>
				{users.map((user) => (
					<option key={user.id} value={user.id}>
						{user.name}
					</option>
				))}
			</select>
			<button
				className="login-button"
				onClick={handleLogin}
				disabled={!selectedUser}
			>
				Login
			</button>
		</div>
	);
};

export default LoginComponent;
