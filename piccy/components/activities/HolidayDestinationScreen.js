import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const holidayDestinations = [
  { id: "1", name: "Spain", color: "#D3EAFB" },
  { id: "2", name: "Italy", color: "#E3EFF2" },
  { id: "3", name: "France", color: "#ECD7D7" },
  { id: "4", name: "Greece", color: "#E8B5B5" },
];

const Card = ({ destination }) => (
  <View style={[styles.card, { backgroundColor: destination.color }]}>
    <Text style={styles.cardTitle}>{destination.name}</Text>
  </View>
);

const HolidayDestinationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Holiday Destination</Text>
        <TouchableOpacity>
          <Icon name="add" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <Swiper
        cards={holidayDestinations}
        renderCard={(card) => <Card destination={card} />}
        onSwiped={(cardIndex) => {
          console.log(cardIndex);
        }}
        onSwipedAll={() => {
          console.log("All cards swiped");
        }}
        cardIndex={0}
        backgroundColor={"#f0f0f0"}
        stackSize={3}
      />
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="close" size={40} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart" size={40} color="#000" />
        </TouchableOpacity>
      </View>
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
  card: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.6,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#D3EAFB",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HolidayDestinationScreen;
