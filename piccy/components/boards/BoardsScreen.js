import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const boards = [
  { id: "1", name: "Name Board", color: "#D3EAFB" },
  { id: "2", name: "", color: "#E3EFF2" },
  { id: "3", name: "", color: "#ECD7D7" },
  { id: "4", name: "", color: "#E8B5B5" },
];

const BoardItem = ({ board, onPress }) => (
  <TouchableOpacity
    style={[styles.boardItem, { backgroundColor: board.color }]}
    onPress={onPress}
  >
    <View style={styles.boardColorBox}></View>
    <Text style={styles.boardName}>{board.name}</Text>
    <Icon name="chevron-forward" size={20} color="#000" />
  </TouchableOpacity>
);

const BoardsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your boards</Text>
        <TouchableOpacity>
          <Icon name="add" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={boards}
        renderItem={({ item }) => (
          <BoardItem
            board={item}
            onPress={() =>
              navigation.navigate("BoardDetail", { boardId: item.id })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.boardList}
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
  boardList: {
    paddingHorizontal: 20,
  },
  boardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  boardColorBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#999",
    marginRight: 10,
  },
  boardName: {
    flex: 1,
    fontSize: 16,
  },
});

export default BoardsScreen;
