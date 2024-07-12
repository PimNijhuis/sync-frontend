import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import HolidayDestinationScreen from "./components/activities/HolidayDestinationScreen";
import SignInScreen from "./components/authorization/SignInScreen";
import BoardDetailScreen from "./components/boards/BoardDetailScreen";
import BoardsScreen from "./components/boards/BoardsScreen";
import DatePickerScreen from "./components/dates/DatePickerScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Boards"
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => console.log("Add button pressed")} // Replace with your actual function
                style={{ marginRight: 10 }}
              >
                <Text>+</Text>
                {/* <Icon name="add" size={24} color="#000" /> */}
              </TouchableOpacity>
            ),
          })}
          component={BoardsScreen}
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
                <Text>+</Text>
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
                <Text>+</Text>
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
                <Text>+</Text>
                {/* <Icon name="add" size={24} color="#000" /> */}
              </TouchableOpacity>
            ),
          })}
          component={HolidayDestinationScreen}
        />
        <Stack.Screen
          name="Sign in"
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => console.log("Add button pressed")} // Replace with your actual function
                style={{ marginRight: 10 }}
              >
                <Text>+</Text>
                {/* <Icon name="add" size={24} color="#000" /> */}
              </TouchableOpacity>
            ),
          })}
          component={SignInScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
