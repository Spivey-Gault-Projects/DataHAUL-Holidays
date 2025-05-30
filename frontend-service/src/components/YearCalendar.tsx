import { useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addDays } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Holiday } from "../types/types";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

interface YearCalendarProps {
  holidays: Holiday[];
  onHolidayClick: (h: Holiday) => void;
}

export default function YearCalendar({
  holidays,
  onHolidayClick,
}: YearCalendarProps) {
  const [viewDate, setViewDate] = useState(() => new Date());

  const events: Event[] = holidays.map((h) => ({
    title: h.localName,
    start: new Date(h.date),
    end: new Date(h.date),
    allDay: true,
  }));

  const minDate = new Date(); // today
  const maxDate = addDays(new Date(), 365); // one year ahead

  // only allow forward navigation
  const handleNavigate = (date: Date) => {
    if (date < minDate) return;
    if (date > maxDate) return;
    setViewDate(date);
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      view="month"
      views={["month"]}
      date={viewDate}
      onNavigate={handleNavigate}
      onSelectEvent={(event: Event) => {
        // find the Holiday object by matching
        const hit = holidays.find(
          (h) =>
            h.localName === event.title &&
            new Date(h.date).toDateString() === event.start?.toDateString()
        );
        if (hit) onHolidayClick(hit);
      }}
      toolbar={true}
      style={{ height: 600 }}
    />
  );
}
