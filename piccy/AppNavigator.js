import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import HolidayDestinationScreen from "./components/activities/HolidayDestinationScreen";
import BoardDetailScreen from "./components/boards/BoardDetailScreen";
import BoardsScreen from "./components/boards/BoardsScreen";
import DatePickerScreen from "./components/dates/DatePickerScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Boards" component={BoardsScreen} />
        <Stack.Screen name="BoardDetail" component={BoardDetailScreen} />
        <Stack.Screen name="DatePicker" component={DatePickerScreen} />
        <Stack.Screen name="Activities" component={HolidayDestinationScreen} />
        <Stack.Screen
          name="HolidayDestination"
          component={HolidayDestinationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
