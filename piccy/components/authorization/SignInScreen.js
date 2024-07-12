import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { signIn_API } from "../../services/users/actions.js";

const boards = [
  { id: "1", name: "Board One", color: "#D3EAFB" },
  { id: "2", name: "Board Two", color: "#E3EFF2" },
  { id: "3", name: "Board Three", color: "#ECD7D7" },
  { id: "4", name: "Board Four", color: "#E8B5B5" },
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

const SignInScreen = ({ navigation }) => {
  const [boards, setBoards] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      signIn_API("Pim").then((res) => {
        if (res) {
          setBoards(res);
        }
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={boards}
        renderItem={({ item }) => (
          <BoardItem
            board={item}
            onPress={() =>
              navigation.navigate("BoardDetail", {
                boardId: item.id,
                boardName: item.name,
              })
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

export default SignInScreen;
