import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-deck-swiper";

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
    <View style={styles.cardButtonWrapper}>
      <TouchableOpacity style={styles.buttonWrapper}>
        <Image
          source={require("../../images/Cross.png")} // Adjust the path to your image
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonWrapper}>
        <Image
          source={require("../../images/Heart.png")} // Adjust the path to your image
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const HolidayDestinationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
      {/* <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="close" size={40} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart" size={40} color="#000" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    //paddingTop: 50,
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
    // flex: 1,
    borderRadius: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    height: height * 0.6,
    //marginTop: 20,
  },
  buttonWrapper: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Black with 50% opacity
    justifyContent: "center",
    alignItems: "center",
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
  cardButtonWrapper: {
    padding: 40,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default HolidayDestinationScreen;
