import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Calendar.css";

const EventButton = ({ event, onDelete, onTitleChange, editingEventId }) => {
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		// Enter edit mode automatically if this is the editing event
		if (event.id === editingEventId) {
			setIsEditing(true);
		}
	}, [editingEventId, event.id]);

	const handleTitleChange = (e) => {
		onTitleChange(event.id, e.target.value);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			setIsEditing(false); // Confirm the title change on Enter key
		}
	};

	const handleClickOutside = (e) => {
		// If clicking outside of the input, close edit mode
		if (isEditing && !e.target.closest(".event-container")) {
			setIsEditing(false);
		}
	};

	// Attach a global click event to detect clicks outside the component
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isEditing]);

	return (
		<div className="event-container" onClick={() => setIsEditing(true)}>
			{isEditing ? (
				<TextField
					value={event.title}
					onChange={handleTitleChange}
					onKeyDown={handleKeyDown}
					variant="outlined"
					size="small"
					autoFocus
					fullWidth
					InputProps={{
						style: {
							color: "#FFFFFF", // Set text color to white
							paddingLeft: 0, // Remove left padding
						},
						sx: {
							"& .MuiOutlinedInput-notchedOutline": {
								borderColor: "transparent", // Transparent border
							},
							"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
								borderColor: "transparent", // No blue border on focus
							},
							"& .MuiInputBase-input": {
								paddingLeft: 0, // Remove padding inside the input
							},
							"& .MuiInputBase-input": {
								paddingLeft: 0, // Remove padding inside the input
								fontSize: "13px", // Set font size inside the input
							},
						},
					}}
					style={{
						backgroundColor: "transparent",
						fontSize: "14px",
					}}
				/>
			) : (
				<span className="event-title">{event.title}</span>
			)}
			<IconButton
				color="error"
				size="small"
				onClick={(e) => {
					e.stopPropagation(); // Prevent triggering edit mode
					onDelete(event);
				}}
				aria-label="delete"
			>
				<DeleteIcon fontSize="small" />
			</IconButton>
		</div>
	);
};

export default EventButton;
