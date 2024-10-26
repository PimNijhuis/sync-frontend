import CloseIcon from "@mui/icons-material/Close";
import { IconButton, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import "./Calendar.css";

const CalendarBlock = ({ event, onDelete, editingEventId }) => {
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (event.id === editingEventId) {
			setIsEditing(true);
		}
	}, [editingEventId, event.id]);

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			setIsEditing(false);
		}
	};

	// Memoize handleClickOutside using useCallback
	const handleClickOutside = useCallback(
		(e) => {
			if (isEditing && !e.target.closest(".event-container")) {
				setIsEditing(false);
			}
		},
		[isEditing]
	);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClickOutside]); // Add handleClickOutside to the dependency array

	return (
		<div
			className={`event-container ${event.type}`}
			onClick={() => event.type === "event" && setIsEditing(true)}
		>
			<div className="event-title-container">
				{isEditing && event.type === "event" ? (
					<TextField
						value={event.title}
						onKeyDown={handleKeyDown}
						variant="outlined"
						size="small"
						autoFocus
						fullWidth
						InputProps={{
							style: {
								color: "#FFFFFF",
								paddingLeft: 0,
							},
							sx: {
								"& .MuiOutlinedInput-notchedOutline": {
									borderColor: "transparent",
								},
								"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
									borderColor: "transparent",
								},
								"& .MuiInputBase-input": {
									paddingLeft: 0,
									fontSize: "13px",
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
			</div>
			{event.type === "availability" && (
				<div className="icon-container">
					<IconButton
						color="inherit"
						size="small"
						onClick={(e) => {
							e.stopPropagation();
							onDelete(event);
						}}
						aria-label="delete"
						style={{ backgroundColor: "rgb(255, 255, 255, 0.3)" }}
					>
						<CloseIcon fontSize="medium" style={{ color: "#FFFFFF" }} />
					</IconButton>
				</div>
			)}
		</div>
	);
};

export default CalendarBlock;
