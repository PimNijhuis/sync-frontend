import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarComponent = ({ events, onSelectSlot, onSelectEvent }) => {
  const now = new Date();

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Your Calendar</h2>
      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={events}
          defaultView="week"
          selectable
          onSelectSlot={onSelectSlot} // Attach the add event handler
          onSelectEvent={onSelectEvent} // Attach the remove event handler
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          scrollToTime={now}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
