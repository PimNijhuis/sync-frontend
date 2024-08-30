import React, { useEffect, useState } from "react";
import {
	Alert,
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import CalendarEvents from "react-native-calendar-events";
import { Agenda } from "react-native-calendars";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const DatePickerScreen = () => {
	const [events, setEvents] = useState({});
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const [preferenceArray, setPreferenceArray] = useState([]);

	useEffect(() => {
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

		CalendarEvents.fetchAllEvents(
			startDate.toISOString(),
			endDate.toISOString()
		)
			.then((events) => {
				const formattedEvents = formatEvents(events);
				setEvents(formattedEvents);
			})
			.catch((error) => {
				console.log("Error fetching events:", error);
			});
	};

	const handlePreference = (preference) => {
		// Check if the date already exists in the preferenceArray
		const dateExistsIndex = preferenceArray.findIndex(
			(item) => item.date === selectedDate
		);

		if (dateExistsIndex !== -1) {
			// Date exists, update the preference
			const updatedArray = [...preferenceArray];
			updatedArray[dateExistsIndex].preference = preference;
			setPreferenceArray(updatedArray);
		} else {
			// Date does not exist, create a new record
			setPreferenceArray([
				...preferenceArray,
				{
					date: selectedDate,
					preference: preference,
				},
			]);
		}
	};

	const formatEvents = (events) => {
		const formatted = {};
		events.forEach((event) => {
			const date = event.startDate.split("T")[0]; // Extract date part only
			if (!formatted[date]) {
				formatted[date] = [];
			}
			formatted[date].push({
				name: event.title,
				height: Math.max(50, Math.floor(Math.random() * 150)), // Random height for the item
				time: `${new Date(event.startDate).toLocaleTimeString()} - ${new Date(
					event.endDate
				).toLocaleTimeString()}`,
			});
		});
		return formatted;
	};
	useEffect(() => {
		console.log(preferenceArray);
	}, [preferenceArray]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>MOJOS</Text>
				<TouchableOpacity>
					<Icon name="add" size={24} color="#000" />
				</TouchableOpacity>
			</View>
			<Agenda
				items={events}
				selected={selectedDate}
				onDayPress={(day) => {
					setSelectedDate(day.dateString);
				}}
				renderItem={(item, firstItemInDay) => {
					return (
						<View style={[styles.item, { height: item.height }]}>
							<Text style={styles.eventTitle}>{item.name}</Text>
							<Text style={styles.eventDate}>{item.time}</Text>
						</View>
					);
				}}
				renderEmptyDate={() => {
					return (
						<View style={styles.emptyDate}>
							<Text>No Events</Text>
						</View>
					);
				}}
				theme={{
					selectedDayBackgroundColor: "#00B0FF",
					todayTextColor: "#00B0FF",
					agendaDayTextColor: "black",
					agendaDayNumColor: "black",
					agendaTodayColor: "#00B0FF",
					agendaKnobColor: "#00B0FF",
				}}
			/>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={[styles.button, styles.orangeButton]}
					onPress={() => handlePreference("maybe")}
				>
					<Icon name="help-circle-outline" size={30} color="#fff" />
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.redButton]}
					onPress={() => handlePreference("no")}
				>
					<Icon name="close-circle-outline" size={30} color="#fff" />
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.greenButton]}
					onPress={() => handlePreference("yes")}
				>
					<Icon name="checkmark-circle-outline" size={30} color="#fff" />
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.blueButton]}
					onPress={() => Alert.alert("Coming soon!")}
				>
					<Icon name="create-outline" size={30} color="#fff" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: "#fff",
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	item: {
		backgroundColor: "white",
		flex: 1,
		borderRadius: 5,
		padding: 10,
		marginRight: 10,
		marginTop: 17,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
	},
	emptyDate: {
		height: 15,
		flex: 1,
		paddingTop: 30,
	},
	eventTitle: {
		fontSize: 16,
		fontWeight: "bold",
	},
	eventDate: {
		fontSize: 14,
		color: "#555",
	},
	buttonContainer: {
		position: "absolute",
		bottom: 20,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	button: {
		width: width / 5,
		height: width / 5,
		borderRadius: width / 10,
		justifyContent: "center",
		alignItems: "center",
	},
	orangeButton: {
		backgroundColor: "#FFA726",
	},
	redButton: {
		backgroundColor: "#EF5350",
	},
	greenButton: {
		backgroundColor: "#66BB6A",
	},
	blueButton: {
		backgroundColor: "#42A5F5",
	},
});

export default DatePickerScreen;
