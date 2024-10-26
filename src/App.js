import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CalendarScreen from "./screens/CalendarScreen";
import LoginScreen from "./screens/LoginScreen";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginScreen />} />
				<Route path="/calendar" Component={CalendarScreen} />
			</Routes>
		</Router>
	);
};

export default App;
