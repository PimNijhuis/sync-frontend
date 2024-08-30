import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const items = [
  { id: "1", name: "Date Picker", color: "#D3EAFB", screen: "DatePicker" },
  { id: "2", name: "Activities", color: "#E3EFF2", screen: "Activities" },
  //   { id: "3", name: "Who Pays Who", color: "#ECD7D7", screen: "WhoPaysWho" },
  //   { id: "4", name: "Planner", color: "#E8B5B5", screen: "Planner" },
];

const Item = ({ item, onPress }) => (
  <TouchableOpacity
    style={[styles.item, { backgroundColor: item.color }]}
    onPress={onPress}
  >
    <Text style={styles.itemName}>{item.name}</Text>
  </TouchableOpacity>
);

const BoardDetailScreen = ({ route, navigation }) => {
  const { boardId, boardName } = route.params;
  console.log(boardId);
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Item item={item} onPress={() => navigation.navigate(item.screen)} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.itemsContainer}
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
  itemsContainer: {
    paddingHorizontal: 20,
  },
  item: {
    flex: 1,
    height: 150,
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
  },
});

export default BoardDetailScreen;
