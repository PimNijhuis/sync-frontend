import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import React from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import EventButton from "./EventButton";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }), // 1 = Monday
	getDay,
	locales,
});

const DragAndDropCalendar = withDragAndDrop(Calendar);

const CalendarComponent = ({
	events,
	onSelectSlot,
	onEventDelete,
	onTitleChange,
	onSelectEvent,
	onEventResize,
	onEventDrop,
	editingEventId,
}) => {
	const now = new Date();

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
					onSelectEvent={onSelectEvent}
					onEventResize={onEventResize}
					onEventDrop={onEventDrop}
					startAccessor="start"
					endAccessor="end"
					style={{ height: "80vh" }}
					scrollToTime={now}
					components={{
						event: (props) => (
							<EventButton
								event={props.event}
								onDelete={onEventDelete}
								onTitleChange={onTitleChange}
								editingEventId={editingEventId} // Pass the editing ID to control edit mode
							/>
						),
					}}
				/>
			</div>
		</div>
	);
};

export default CalendarComponent;
