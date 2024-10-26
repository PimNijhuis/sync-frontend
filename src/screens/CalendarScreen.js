import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarComponent from "../components/Calendar/CalendarComponent";
import { eventsByUser } from "../data/eventsFromNativeCalendar";
import { users } from "../data/users";
import { useAuth } from "../hooks/AuthContext";

function CalendarScreen() {
	const { user, logout } = useAuth();
	const [events, setEvents] = useState(eventsByUser[user] || []);
	const navigate = useNavigate();
	const username = users.find((u) => u.id === user).name;
	const [editingEventId, setEditingEventId] = useState(null); // Track the edited event

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const handleSelectSlot = (slotInfo) => {
		const newEvent = {
			id: Date.now(),
			title: "New Event",
			start: slotInfo.start,
			end: new Date(slotInfo.start.getTime() + 60 * 90 * 1000), // Set end time 1 hour after start
		};
		setEvents([...events, newEvent]);
		setEditingEventId(newEvent.id); // Set new event as the one being edited
	};

	const handleSelectEvent = (selectedEvent) => {
		console.log("Event selected:", selectedEvent);
	};
	const handleTitleChange = (eventId, newTitle) => {
		setEvents((prevEvents) =>
			prevEvents.map((event) =>
				event.id === eventId ? { ...event, title: newTitle } : event
			)
		);
	};

	const handleEventResize = (resizeInfo) => {
		const { event, start, end } = resizeInfo;
		console.log("Event resized:", { event, start, end });
		const updatedEvents = events.map((evt) =>
			evt.id === event.id ? { ...evt, start, end } : evt
		);
		setEvents(updatedEvents);
	};

	const handleEventDrop = (dropInfo) => {
		const { event, start, end } = dropInfo;

		// Check if the event has been moved to a different day
		const originalStartDate = new Date(event.start).setHours(0, 0, 0, 0);
		const newStartDate = new Date(start).setHours(0, 0, 0, 0);

		// Check if the time slot is the same
		const isSameTimeSlot =
			event.start.getHours() === start.getHours() &&
			event.start.getMinutes() === start.getMinutes() &&
			event.end.getHours() === end.getHours() &&
			event.end.getMinutes() === end.getMinutes();

		let updatedEvents;
		if (originalStartDate !== newStartDate && isSameTimeSlot) {
			// Duplicate the event if moved to a different day but the same time slot
			const newEvent = {
				...event,
				id: Date.now(), // New ID for the duplicated event
				start,
				end,
			};
			updatedEvents = [...events, newEvent];
		} else {
			// If the time slot changes or it's the same day, update the event
			updatedEvents = events.map((evt) =>
				evt.id === event.id ? { ...evt, start, end } : evt
			);
		}

		console.log("Event dropped:", { event, start, end });
		setEvents(updatedEvents);
	};

	const handleDeleteEvent = (eventToDelete) => {
		setEvents(events.filter((event) => event.id !== eventToDelete.id));
		console.log("Event deleted:", eventToDelete);
	};

	return (
		<div>
			<h2>Welcome, {username}!</h2>
			<button onClick={handleLogout}>Logout</button>
			<CalendarComponent
				events={events}
				onSelectSlot={handleSelectSlot}
				onSelectEvent={handleSelectEvent}
				onEventResize={handleEventResize}
				onEventDrop={handleEventDrop}
				onEventDelete={handleDeleteEvent}
				onTitleChange={handleTitleChange}
				editingEventId={editingEventId}
			/>
		</div>
	);
}

export default CalendarScreen;
