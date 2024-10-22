import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarComponent from "../components/Calendar/CalendarComponent";
import { eventsByUser } from "../data/events";
import { useAuth } from "../hooks/AuthContext";

function CalendarScreen() {
  const { user, logout } = useAuth();
  const [events, setEvents] = useState(eventsByUser[user] || []);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function to clear the user state
    navigate("/"); // Redirect to login page after logout
  };

  // Handle slot selection (dragging a time range)
  const handleSelectSlot = (slotInfo) => {
    const newEvent = {
      id: Date.now(), // Unique ID
      title: "New Event",
      start: slotInfo.start,
      end: slotInfo.end,
    };
    setEvents([...events, newEvent]); // Add the new event
  };

  // Handle event selection (clicking an event) to delete it
  const handleSelectEvent = (eventToDelete) => {
    const updatedEvents = events.filter(
      (event) => event.id !== eventToDelete.id
    );
    setEvents(updatedEvents); // Remove the selected event
  };

  return (
    <div>
      <h2>Welcome, User {user}!</h2>
      <button onClick={handleLogout}>Logout</button>
      <CalendarComponent
        events={events}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}

export default CalendarScreen;
