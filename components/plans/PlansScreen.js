import React, { useEffect, useState } from "react";
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Make sure this is the correct icon set you're using
import { getPlansAPI } from "../../services/plans/actions";

// Define a list of calm colors.
const calmColors = [
	"#A8D5BA", // Light green
	"#FFD3B4", // Light peach
	"#FFAAA7", // Light coral
	"#FFC3A0", // Light orange
	"#D4A5A5", // Soft red
	"#B5EAD7", // Light mint
	"#C7CEEA", // Light lavender
	"#E2CFC4", // Light tan
	"#AFCBFF", // Light blue
	"#FFDAA5", // Light yellow
	"#FFB7B2", // Light rose
	"#E4D1D1", // Light pink
	"#D9D7F1", // Light periwinkle
	"#B2F9FC", // Light cyan
	"#FFE5D9", // Light cream
	"#F3D9DC", // Light blush
	"#D6E6FF", // Light sky blue
	"#CDE2B6", // Light lime
	"#FFEFD5", // Light papaya
	"#FFD1D1", // Light blush pink
	"#D8E2DC", // Light coral pink
	"#B8E0D2", // Light teal
	"#F4E1D2", // Light sand
	"#ECE2D0", // Light mocha
];

// Define a list of valid FontAwesome icons
const icons = [
	"star",
	"heart",
	"check",
	"leaf",
	"smile-o",
	"gift",
	"coffee",
	"thumbs-up",
];

const getRandomCalmColor = () => {
	return calmColors[Math.floor(Math.random() * calmColors.length)];
};

const getRandomIcon = () => {
	return icons[Math.floor(Math.random() * icons.length)];
};

const PlanItem = ({ plan, onPress }) => (
	<TouchableOpacity
		style={[styles.planItem, { backgroundColor: plan.color }]}
		onPress={onPress}
	>
		<View style={styles.planColorBox}>
			<Icon name={plan.icon} size={24} color="#fff" />
		</View>
		<Text style={styles.planName}>{plan.name}</Text>
		<Image source={require("../../images/ArrowRight.png")} />
	</TouchableOpacity>
);

const PlansScreen = ({ navigation }) => {
	const [plans, setPlans] = useState([]);

	useEffect(() => {
		getPlansAPI()
			.then((plans) => {
				// Assign a random calm color and icon to each plan
				const plansWithColorsAndIcons = plans.map((plan) => ({
					...plan,
					color: getRandomCalmColor(),
					icon: getRandomIcon(),
				}));
				setPlans(plansWithColorsAndIcons);
			})
			.catch((error) => {
				console.log("Error fetching plans:", error);
			});
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={plans}
				renderItem={({ item }) => (
					<PlanItem
						key={item.id}
						plan={item}
						onPress={() =>
							navigation.navigate("Checkpoints", {
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
		marginRight: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	planName: {
		flex: 1,
		fontSize: 16,
	},
});

export default PlansScreen;
