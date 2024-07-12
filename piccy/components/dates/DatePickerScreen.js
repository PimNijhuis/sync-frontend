import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/Ionicons";

const DatePickerScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Date Picker</Text>
        <TouchableOpacity>
          <Icon name="add" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <Calendar
        // Specify style for calendar container
        style={styles.calendar}
        // Specify theme properties to override specific styles for calendar parts. Default = {}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#00adf5",
          selectedDotColor: "#ffffff",
          arrowColor: "orange",
          monthTextColor: "black",
          indicatorColor: "blue",
          textDayFontFamily: "monospace",
          textMonthFontFamily: "monospace",
          textDayHeaderFontFamily: "monospace",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
        // Initially visible month. Default = Date()
        current={"2023-01-01"}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={"2022-05-10"}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={"2023-05-30"}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        // Collection of dates that have to be marked. Default = {}
        markedDates={{
          "2023-01-13": {
            selected: true,
            marked: true,
            selectedColor: "yellow",
          },
          "2023-01-17": { marked: true },
          "2023-01-26": { marked: true, dotColor: "blue", activeOpacity: 0 },
          "2023-01-01": { disabled: true, disableTouchEvent: true },
        }}
      />
      <Text style={styles.footerText}>
        Select your available/preferred days
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  calendar: {
    marginBottom: 10,
  },
  footerText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
  },
});

export default DatePickerScreen;
