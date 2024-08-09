import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CalendarEvents from "react-native-calendar-events";
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const DatePickerScreen = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("USEEFFECT");
    // Request permission to access the calendar
    CalendarEvents.requestPermissions().then((result) => {
      if (result === "authorized") {
        loadEvents();
      }
    });
  }, []);

  const loadEvents = () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30); // Load events for the next 30 days
    console.log("HIER");
    CalendarEvents.fetchAllEvents(
      startDate.toISOString(),
      endDate.toISOString()
    )
      .then((events) => {
        console.log(events);
        setEvents(events);
      })
      .catch((error) => {
        console.log("Error fetching events:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Date Picker</Text>
        <TouchableOpacity>
          <Icon name="add" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDate}>
              {new Date(item.startDate).toLocaleString()}
            </Text>
          </View>
        )}
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
  eventItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventDate: {
    fontSize: 14,
    color: "#555",
  },
  footerText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
  },
});

export default DatePickerScreen;
