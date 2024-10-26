import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarComponent from "../components/Calendar/CalendarComponent";
import { availabilityByUser } from "../data/availabilityByUser";
import { eventsByUser } from "../data/eventsByUser";
import { overlapByUser } from "../data/overlapByUser";
import { users } from "../data/users";
import { useAuth } from "../hooks/AuthContext";

function CalendarScreen() {
	const { user, login } = useAuth();
	const [events, setEvents] = useState(eventsByUser[user] || []);
	const [availability, setAvailablity] = useState(
		availabilityByUser[user] || []
	);
	const [overlap, setOverlap] = useState(overlapByUser[user] || []);
	const [viewMode, setViewMode] = useState("onlyMe"); // New state for toggle
	const username = users?.find((u) => u.id === user)?.name;
	const [editingEventId, setEditingEventId] = useState(null);
	const [selectedUser, setSelectedUser] = useState(user);
	const navigate = useNavigate();

	// Update events based on user or viewMode changes
	useEffect(() => {
		if (selectedUser) {
			setEvents(eventsByUser[selectedUser]);
			setAvailablity(availabilityByUser[selectedUser]);
			setOverlap(overlapByUser[selectedUser]);
		} else {
			navigate("/");
		}
	}, [selectedUser, viewMode, navigate]);

	// Toggle view mode between "Only me" and "Me and others"
	const toggleViewMode = () => {
		setViewMode((prevMode) =>
			prevMode === "onlyMe" ? "meAndOthers" : "onlyMe"
		);
	};

	const handleUserSwitch = (e) => {
		const newUserId = Number(e.target.value);
		setSelectedUser(newUserId);
		login(newUserId);
	};

	const handleSelectSlot = (slotInfo) => {
		const newStart = slotInfo.start;
		const newEnd = new Date(
			Math.max(
				new Date(slotInfo.start.getTime() + 60 * 120 * 1000),
				slotInfo.end.getTime()
			)
		);

		// Find all slots that are adjacent to or overlap with the new slot
		const connectedSlots = availability.filter((evt) => {
			if (evt.type === "availability") {
				return (
					(newStart <= evt.end && newStart >= evt.start) || // New start is within existing slot
					(newEnd >= evt.start && newEnd <= evt.end) || // New end is within existing slot
					(evt.start <= newEnd && evt.end >= newStart) || // Existing slot is within new slot
					newStart === evt.end ||
					newEnd === evt.start // New slot is exactly adjacent
				);
			}
			return false;
		});

		// If there are connected slots, merge them
		if (connectedSlots.length > 0) {
			// Calculate the merged start and end times
			const mergedStart = new Date(
				Math.min(
					newStart.getTime(),
					...connectedSlots.map((evt) => evt.start.getTime())
				)
			);
			const mergedEnd = new Date(
				Math.max(
					newEnd.getTime(),
					...connectedSlots.map((evt) => evt.end.getTime())
				)
			);

			// Remove the connected slots from availability and add the merged slot
			const remainingAvailability = availability.filter(
				(evt) => !connectedSlots.includes(evt)
			);
			const mergedSlot = {
				id: Date.now(),
				title: "Available",
				start: mergedStart,
				end: mergedEnd,
				type: "availability",
			};
			setAvailablity([...remainingAvailability, mergedSlot]);
		} else {
			// No connected slots found, so add the new slot as a separate entry
			const newAvailability = {
				id: Date.now(),
				title: "Available",
				start: newStart,
				end: newEnd,
				type: "availability",
			};
			setAvailablity([...availability, newAvailability]);
		}

		setEditingEventId(null); // Reset editing event if needed
	};

	const handleAvailabilityResize = (resizeInfo) => {
		const { event, start, end } = resizeInfo;

		if (event.type === "availability") {
			// Find all slots that are adjacent to or overlap with the resized slot
			const connectedSlots = availability.filter((evt) => {
				if (evt.type === "availability" && evt.id !== event.id) {
					return (
						(start <= evt.end && start >= evt.start) || // Resized start is within an existing slot
						(end >= evt.start && end <= evt.end) || // Resized end is within an existing slot
						(evt.start <= end && evt.end >= start) || // Existing slot is within resized slot
						start === evt.end ||
						end === evt.start // Resized slot is exactly adjacent
					);
				}
				return false;
			});

			// Calculate the merged start and end times
			const mergedStart = new Date(
				Math.min(
					start.getTime(),
					...connectedSlots.map((evt) => evt.start.getTime())
				)
			);
			const mergedEnd = new Date(
				Math.max(
					end.getTime(),
					...connectedSlots.map((evt) => evt.end.getTime())
				)
			);

			// Remove the connected slots from availability and add the merged slot
			const remainingAvailability = availability.filter(
				(evt) => evt.id !== event.id && !connectedSlots.includes(evt)
			);
			const mergedSlot = {
				id: Date.now(),
				title: "Available",
				start: mergedStart,
				end: mergedEnd,
				type: "availability",
			};

			// Update availability with the merged slot
			setAvailablity([...remainingAvailability, mergedSlot]);
		}
	};

	const handleEventDrop = (dropInfo) => {
		const { event, start, end } = dropInfo;

		if (event.type === "availability") {
			// Define new start and end times for the dropped event
			const newStart = start;
			const newEnd = end;

			// Check if the event has been moved to a different day with the same time slot
			const originalStartDate = new Date(event.start).setHours(0, 0, 0, 0);
			const newStartDate = new Date(newStart).setHours(0, 0, 0, 0);

			const isSameTimeSlot =
				event.start.getHours() === newStart.getHours() &&
				event.start.getMinutes() === newStart.getMinutes() &&
				event.end.getHours() === newEnd.getHours() &&
				event.end.getMinutes() === newEnd.getMinutes();

			// If moved to a new day but with the same time slot, duplicate the event
			if (originalStartDate !== newStartDate && isSameTimeSlot) {
				const newEvent = {
					...event,
					id: Date.now(), // Assign a new ID for the duplicated event
					start: newStart,
					end: newEnd,
				};
				setAvailablity([...availability, newEvent]);
				return;
			}

			// Otherwise, continue with merging logic if slots are connected
			const connectedSlots = availability.filter((evt) => {
				if (evt.type === "availability" && evt.id !== event.id) {
					return (
						(newStart <= evt.end && newStart >= evt.start) || // New start is within an existing slot
						(newEnd >= evt.start && newEnd <= evt.end) || // New end is within an existing slot
						(evt.start <= newEnd && evt.end >= newStart) || // Existing slot is within new slot
						newStart === evt.end ||
						newEnd === evt.start // New slot is exactly adjacent
					);
				}
				return false;
			});

			// Merge logic if there are connected slots
			if (connectedSlots.length > 0) {
				const mergedStart = new Date(
					Math.min(
						newStart.getTime(),
						...connectedSlots.map((evt) => evt.start.getTime())
					)
				);
				const mergedEnd = new Date(
					Math.max(
						newEnd.getTime(),
						...connectedSlots.map((evt) => evt.end.getTime())
					)
				);

				// Remove the connected slots and the current event, then add the merged slot
				const remainingAvailability = availability.filter(
					(evt) => evt.id !== event.id && !connectedSlots.includes(evt)
				);
				const mergedSlot = {
					id: Date.now(),
					title: "Available",
					start: mergedStart,
					end: mergedEnd,
					type: "availability",
				};
				setAvailablity([...remainingAvailability, mergedSlot]);
			} else {
				// No connected slots found, so update only the dropped event
				const updatedAvailability = availability.map((evt) =>
					evt.id === event.id ? { ...evt, start: newStart, end: newEnd } : evt
				);
				setAvailablity(updatedAvailability);
			}
		}
	};

	const handleDeleteEvent = (eventToDelete) => {
		setAvailablity(
			availability.filter((event) => event.id !== eventToDelete.id)
		);
	};

	// Create the combined blocks based on view mode
	let calendarBlocks =
		viewMode === "onlyMe"
			? [...events, ...availability]
			: [
					// Only overlap for the current user
					...(events || []),
					...(availability || []),
					...(overlap || []),
			  ];

	return (
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<h2>Hi, {username}!</h2>
				<select
					value=""
					onChange={handleUserSwitch}
					style={{ marginLeft: "10px", padding: "5px" }}
				>
					<option value="" disabled>
						Switch to
					</option>
					{users
						.filter((user) => user.id !== selectedUser)
						.map((user) => (
							<option key={user.id} value={user.id}>
								{user.name}
							</option>
						))}
				</select>
				<button
					onClick={toggleViewMode}
					style={{
						marginLeft: "10px",
						padding: "5px 10px",
						backgroundColor: "#007bff",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}
				>
					{viewMode === "onlyMe" ? "Only me" : "Me and others"}
				</button>
			</div>
			<CalendarComponent
				events={calendarBlocks}
				onSelectSlot={handleSelectSlot}
				onEventResize={handleAvailabilityResize}
				onEventDrop={handleEventDrop}
				onEventDelete={handleDeleteEvent}
				editingEventId={editingEventId}
			/>
		</div>
	);
}

export default CalendarScreen;
