import React, { useState } from "react";
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
// import { getUserPlansAPI } from "../../services/users/actions.js";

const PlanItem = ({ plan, onPress }) => (
	<TouchableOpacity
		style={[styles.planItem, { backgroundColor: plan.color }]}
		onPress={onPress}
	>
		<View style={styles.planColorBox}></View>
		<Text style={styles.planName}>{plan.name}</Text>
		<Image source={require("../../images/ArrowRight.png")} />
	</TouchableOpacity>
);

const PlansScreen = ({ navigation }) => {
	const [plans, setPlans] = useState([]);

	// useEffect(() => {
	// 	getUserPlansAPI("66912b3b46838e95c3ba6147")
	// 		.then((plans) => {
	// 			setPlans(plans);
	// 		})
	// 		.catch((error) => {
	// 			console.log("Error fetching plans:", error);
	// 		});
	// }, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={plans}
				renderItem={({ item }) => (
					<PlanItem
						key={item.id}
						plan={item}
						onPress={() =>
							navigation.navigate("PlanDetail", {
								planId: item.id,
								planName: item.name,
							})
						}
					/>
				)}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.planList}
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
	planList: {
		paddingHorizontal: 20,
	},
	planItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
	},
	planColorBox: {
		width: 40,
		height: 40,
		borderRadius: 10,
		backgroundColor: "#999",
		marginRight: 10,
	},
	planName: {
		flex: 1,
		fontSize: 16,
	},
});

export default PlansScreen;
