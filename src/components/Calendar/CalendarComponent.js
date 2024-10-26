import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import React from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import CalendarBlock from "./CalendarBlock"; // Updated import

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
	getDay,
	locales,
});

const eventPropGetter = (event) => {
	let backgroundColor = "#A0D8EF"; // Default grey-blue color

	if (event.type === "availability") {
		backgroundColor = "#A0D8EF";
	} else if (event.type === "event") {
		backgroundColor = "#FF5722";
	} else if (event.type === "overlap") {
		backgroundColor = "#4CAF50";
	}

	return {
		style: {
			backgroundColor,
			color: "white",
			borderRadius: "15px",
			margin: "0px",
			border: "none",
		},
	};
};

const DragAndDropCalendar = withDragAndDrop(Calendar);

const CalendarComponent = ({
	events,
	onSelectSlot,
	onEventDelete,
	onEventResize,
	onEventDrop,
	editingEventId,
}) => {
	const now = new Date();

	// Wrapping resize and drop functions to only affect availability events
	const handleEventResize = (resizeInfo) => {
		if (resizeInfo.event.type === "availability") {
			onEventResize(resizeInfo);
		}
	};

	const handleEventDrop = (dropInfo) => {
		if (dropInfo.event.type === "availability") {
			onEventDrop(dropInfo);
		}
	};

	return (
		<div className="calendar-container">
			<div className="calendar-wrapper">
				<DragAndDropCalendar
					localizer={localizer}
					events={events}
					defaultView={Views.WEEK}
					selectable
					resizable
					onSelectSlot={onSelectSlot}
					onEventResize={handleEventResize}
					onEventDrop={handleEventDrop}
					startAccessor="start"
					endAccessor="end"
					style={{ height: "90vh" }}
					scrollToTime={now}
					eventPropGetter={eventPropGetter}
					components={{
						event: (props) => (
							<CalendarBlock
								event={props.event}
								onDelete={onEventDelete}
								editingEventId={editingEventId}
							/>
						),
					}}
				/>
			</div>
		</div>
	);
};

export default CalendarComponent;
