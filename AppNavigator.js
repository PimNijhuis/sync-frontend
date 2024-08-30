import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Image, TouchableOpacity } from "react-native";
import HolidayDestinationScreen from "./components/activities/HolidayDestinationScreen";
import SignInScreen from "./components/authorization/SignInScreen";
import DatePickerScreen from "./components/dates/DatePickerScreen";
import BoardDetailScreen from "./components/plans/PlansDetailScreen";
import PlansScreen from "./components/plans/PlansScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="SignIn"
					component={SignInScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Plans"
					options={({ navigation }) => ({
						headerLeft: null,
						// gestureEnabled: false, // Disable swipe back gesture

						headerRight: () => (
							<TouchableOpacity
								onPress={() => console.log("Add button pressed")} // Replace with your actual function
								style={{ marginRight: 30 }}
							>
								<Image
									source={require("./images/Plus.png")} // Adjust the path to your image
									style={{ width: 10, height: 10 }}
								/>
							</TouchableOpacity>
						),
					})}
					component={PlansScreen}
				/>
				<Stack.Screen
					name="BoardDetail"
					options={({ route }) => ({
						title: route.params.boardName,
						headerRight: () => (
							<TouchableOpacity
								onPress={() => console.log("Add button pressed")} // Replace with your actual function
								style={{ marginRight: 10 }}
							>
								<Image
									source={require("./images/Plus.png")} // Adjust the path to your image
									style={{ width: 10, height: 10 }}
								/>
								{/* <Icon name="add" size={24} color="#000" /> */}
							</TouchableOpacity>
						),
					})}
					component={BoardDetailScreen}
				/>
				<Stack.Screen name="DatePicker" component={DatePickerScreen} />
				<Stack.Screen
					name="Activities"
					options={({ navigation }) => ({
						headerRight: () => (
							<TouchableOpacity
								onPress={() => console.log("Add button pressed")} // Replace with your actual function
								style={{ marginRight: 10 }}
							>
								<Image
									source={require("./images/Plus.png")} // Adjust the path to your image
									style={{ width: 10, height: 10 }}
								/>
								{/* <Icon name="add" size={24} color="#000" /> */}
							</TouchableOpacity>
						),
					})}
					component={HolidayDestinationScreen}
				/>
				<Stack.Screen
					name="HolidayDestination"
					options={({ navigation }) => ({
						headerRight: () => (
							<TouchableOpacity
								onPress={() => console.log("Add button pressed")} // Replace with your actual function
								style={{ marginRight: 10 }}
							>
								<Image
									source={require("./images/Plus.png")} // Adjust the path to your image
									style={{ width: 10, height: 10 }}
								/>
								{/* <Icon name="add" size={24} color="#000" /> */}
							</TouchableOpacity>
						),
					})}
					component={HolidayDestinationScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
