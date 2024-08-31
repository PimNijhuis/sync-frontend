import React, { useCallback, useEffect, useState } from "react";
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import CalendarEvents from "react-native-calendar-events";
import { Agenda } from "react-native-calendars";

const { width } = Dimensions.get("window");

const DatePickerScreen = () => {
	const [events, setEvents] = useState({});
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const [preferenceArray, setPreferenceArray] = useState([]);
	const [calendars, setCalendars] = useState([]); // Save calendar objects here
	const [refresh, setRefresh] = useState(false); // Save calendar objects here

	// Function to move to the next day
	const goToNextDay = () => {
		const currentDate = new Date(selectedDate);
		const nextDate = new Date(currentDate);
		nextDate.setDate(currentDate.getDate() + 1); // Increment day by 1
		const formattedDate = nextDate.toISOString().split("T")[0];
		setSelectedDate(formattedDate);
	};

	useEffect(() => {
		// Request permission to access the calendar
		CalendarEvents.requestPermissions().then((result) => {
			if (result === "authorized") {
				loadCalendars(); // Load calendars first
			}
		});
	}, [refresh]);

	const loadCalendars = useCallback(() => {
		CalendarEvents.findCalendars()
			.then((calendars) => {
				// Add the includedForPreference flag to each calendar and sort by title
				const calendarsWithPreference = calendars
					.map((calendar) => ({
						...calendar,
						includedForPreference: true, // Set initial flag to true
					}))
					.sort((a, b) => a.title.localeCompare(b.title)); // Sort calendars by title

				setCalendars(calendarsWithPreference);
			})
			.catch((error) => {
				console.log("Error fetching calendars:", error);
			});
	}, []);

	useEffect(() => {
		if (calendars.length > 0) {
			loadEvents(calendars); // Load events only after calendars are fetched
		}
	}, [calendars]);

	const loadEvents = useCallback(
		(calendars) => {
			const startDate = new Date();
			const endDate = new Date();
			endDate.setDate(endDate.getDate() + 30);

			// Filter calendars based on includedForPreference flag
			const filteredCalendars = calendars.filter(
				(calendar) => calendar.includedForPreference
			);

			// Extract the IDs of the calendars to fetch events from
			const calendarIds = filteredCalendars.map((calendar) => calendar.id);

			CalendarEvents.fetchAllEvents(
				startDate.toISOString(),
				endDate.toISOString(),
				calendarIds // Pass the filtered calendar IDs here
			)
				.then((events) => {
					const formattedEvents = formatEvents(events);
					setEvents(formattedEvents);
				})
				.catch((error) => {
					console.log("Error fetching events:", error);
				});
		},
		[calendars]
	);

	const toggleCalendarPreference = useCallback((calendarId) => {
		setCalendars((prevCalendars) =>
			prevCalendars.map((calendar) =>
				calendar.id === calendarId
					? {
							...calendar,
							includedForPreference: !calendar.includedForPreference,
					  }
					: calendar
			)
		);
		setRefresh(!refresh);
	}, []);

	const handlePreference = useCallback(
		(preference) => {
			const dateExistsIndex = preferenceArray.findIndex(
				(item) => item.date === selectedDate
			);

			if (dateExistsIndex !== -1) {
				const updatedArray = [...preferenceArray];
				updatedArray[dateExistsIndex].preference = preference;
				setPreferenceArray(updatedArray);
			} else {
				setPreferenceArray([
					...preferenceArray,
					{
						date: selectedDate,
						preference: preference,
					},
				]);
			}
			goToNextDay();
		},
		[preferenceArray, selectedDate]
	);

	const renderItem = useCallback((item) => {
		// console.log("Rendering item:", item.name);

		if (!item) {
			return (
				<View style={[styles.item, { height: 50 }]}>
					<Text style={styles.eventTitle}>Unknown Event</Text>
					<Text style={styles.eventDate}>No Time Available</Text>
				</View>
			);
		}

		return (
			<View style={[styles.item, { height: item.height || 50 }]}>
				<Text style={styles.eventTitle}>{item.name || "Unnamed Event"}</Text>
				<Text style={styles.eventDate}>{item.time || "No Time Available"}</Text>
			</View>
		);
	}, []);

	const formatEvents = useCallback(
		(events) => {
			// Filter out events that are not from the included calendars

			const includedCalendars = calendars
				.filter((calendar) => calendar.includedForPreference)
				.map((calendar) => calendar.id);

			const formatted = {};
			events.forEach((event) => {
				// Check if the event belongs to an included calendar
				// console.log(
				// 	"includedCalendars:",
				// 	JSON.stringify(includedCalendars, null, 2)
				// );
				// console.log("event:", JSON.stringify(event, null, 2));
				if (!includedCalendars.includes(event.calendar.id)) {
					return;
				}

				const date = event.startDate.split("T")[0];
				if (!formatted[date]) {
					formatted[date] = [];
				}

				// Calculate the duration of the event in hours
				const startTime = new Date(event.startDate);
				const endTime = new Date(event.endDate);
				const durationInHours = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours

				// Set height proportional to the duration
				const baseHeight = 50; // Minimum height for short events
				const height = baseHeight + durationInHours * 5; // Adjust the multiplier as needed

				formatted[date].push({
					name: event.title,
					height: height,
					time: `${startTime.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})} - ${endTime.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}`,
				});
			});
			return formatted;
		},
		[calendars]
	);

	// Generate marked dates directly from preferenceArray
	const getMarkedDates = () => {
		const markedDates = {};

		preferenceArray.forEach((item) => {
			let color = "#00B0FF"; // Default blue
			switch (item.preference) {
				case "yes":
					color = "#66BB6A"; // Green
					break;
				case "no":
					color = "#EF5350"; // Red
					break;
				case "maybe":
					color = "#FFA726"; // Orange
					break;
				default:
					break;
			}
			markedDates[item.date] = {
				selected: true,
				selectedColor: color,
			};
		});

		// Override the color to blue for the currently selected date
		if (markedDates[selectedDate]) {
			markedDates[selectedDate] = {
				...markedDates[selectedDate],
				selected: true,
				selectedColor: "#00B0FF", // Temporarily set to blue
			};
		} else {
			// If the selected date is not in the preference array, mark it as blue
			markedDates[selectedDate] = {
				selected: true,
				selectedColor: "#00B0FF",
			};
		}

		return markedDates;
	};

	// Filter the events to only include the selected date
	const filteredEvents = { [selectedDate]: events[selectedDate] || [] };

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>MOJOS</Text>
			</View>

			{/* Calendar selection */}
			<ScrollView
				horizontal
				style={styles.calendarButtonsContainer}
				showsHorizontalScrollIndicator={false}
			>
				{calendars.map((calendar) => (
					<TouchableOpacity
						key={calendar.id}
						style={[
							styles.calendarButton,
							{
								backgroundColor: calendar.color,
								opacity: calendar.includedForPreference ? 1 : 0.3,
							},
						]}
						onPress={() => toggleCalendarPreference(calendar.id)}
					>
						<Text style={styles.calendarButtonText}>{calendar.title}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>

			{/* Agenda view */}
			<Agenda
				items={filteredEvents}
				selected={selectedDate}
				onDayPress={(day) => {
					setSelectedDate(day.dateString);
				}}
				renderItem={(item) => renderItem(item)}
				renderEmptyDate={() => {
					return (
						<View style={styles.emptyDate}>
							<Text>No Events</Text>
						</View>
					);
				}}
				markedDates={getMarkedDates()} // Apply the marked dates directly from the preference array
				theme={{
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
				/>
				<TouchableOpacity
					style={[styles.button, styles.redButton]}
					onPress={() => handlePreference("no")}
				/>
				<TouchableOpacity
					style={[styles.button, styles.greenButton]}
					onPress={() => handlePreference("yes")}
				/>
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
	calendarButtonsContainer: {
		paddingLeft: 10,
		height: 35, // Explicitly set height for the container
		backgroundColor: "#fff",
		maxHeight: 35,
	},
	calendarButton: {
		height: 30, // Set explicit height for each button
		paddingHorizontal: 8,
		justifyContent: "center", // Ensure the text is centered vertically
		borderRadius: 5,
		marginRight: 10,
		maxHeight: 35,
	},
	calendarButtonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 12, // Smaller font size for better fit
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
		width: width / 6,
		height: width / 6,
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
