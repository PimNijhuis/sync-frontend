import React, { useEffect, useState } from "react";
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { getUserBoardsAPI } from "../../services/users/actions.js";

const BoardItem = ({ board, onPress }) => (
	<TouchableOpacity
		style={[styles.boardItem, { backgroundColor: board.color }]}
		onPress={onPress}
	>
		<View style={styles.boardColorBox}></View>
		<Text style={styles.boardName}>{board.name}</Text>
		<Image source={require("../../images/ArrowRight.png")} />
	</TouchableOpacity>
);

const BoardsScreen = ({ navigation }) => {
	const [boards, setBoards] = useState([]);

	useEffect(() => {
		getUserBoardsAPI("66912b3b46838e95c3ba6147")
			.then((boards) => {
				setBoards(boards);
			})
			.catch((error) => {
				console.log("Error fetching boards:", error);
			});
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={boards}
				renderItem={({ item }) => (
					<BoardItem
						key={item.id}
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

export default BoardsScreen;
