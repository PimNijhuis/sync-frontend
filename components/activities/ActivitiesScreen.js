import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const activities = [
  { id: "1", name: "Holiday", color: "#D3EAFB", screen: "HolidayDestination" },
  { id: "2", name: "Date Night", color: "#E3EFF2", screen: "DateNight" },
  {
    id: "3",
    name: "Meeting up with friends",
    color: "#ECD7D7",
    screen: "MeetingFriends",
  },
  { id: "4", name: "Day Activity", color: "#E8B5B5", screen: "DayActivity" },
];

const ActivityItem = ({ activity, onPress }) => (
  <TouchableOpacity
    style={[styles.activityItem, { backgroundColor: activity.color }]}
    onPress={onPress}
  >
    <View style={styles.activityColorBox}></View>
    <Text style={styles.activityName}>{activity.name}</Text>
    <Icon name="chevron-forward" size={20} color="#000" />
  </TouchableOpacity>
);

const ActivitiesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activities</Text>
        <TouchableOpacity>
          <Icon name="add" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={activities}
        renderItem={({ item }) => (
          <ActivityItem
            activity={item}
            onPress={() => navigation.navigate(item.screen)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.activityList}
      />
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
  activityList: {
    paddingHorizontal: 20,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  activityColorBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#999",
    marginRight: 10,
  },
  activityName: {
    flex: 1,
    fontSize: 16,
  },
});

export default ActivitiesScreen;
