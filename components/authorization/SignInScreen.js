import React, { useState } from "react";
import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { signInAPI } from "../../services/users/actions.js";

const SignInScreen = ({ navigation }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = async () => {
		try {
			const res = await signInAPI("Pim", "pim");
			if (res) {
				navigation.navigate("Plans");
			} else {
				Alert.alert(
					"Sign-In Failed",
					"Please check your username and try again."
				);
			}
		} catch (error) {
			Alert.alert("Sign-In Failed", "An error occurred. Please try again.");
		}
	};

	return (
		<View style={styles.container}>
			<Image source={require("../../images/Logo.png")} />
			<Text style={styles.title}>Sign In</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter your username"
				value={username}
				onChangeText={setUsername}
			/>
			<TextInput
				style={styles.input}
				placeholder="Enter your password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				autoCapitalize="none"
			/>
			<TouchableOpacity style={styles.button} onPress={handleSignIn}>
				<Text style={styles.buttonText}>Sign In</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5F5F5",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	input: {
		width: "100%",
		padding: 15,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		marginBottom: 20,
		backgroundColor: "#fff",
	},
	button: {
		width: "100%",
		padding: 15,
		borderRadius: 10,
		backgroundColor: "#D3EAFB",
		alignItems: "center",
	},
	buttonText: {
		fontSize: 18,
		color: "#000",
	},
});

export default SignInScreen;
