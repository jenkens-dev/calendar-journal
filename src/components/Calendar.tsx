import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { DateSelectArg } from "@fullcalendar/core";

export const Calendar: React.FC = () => {
  const handleDateSelect = (arg: DateSelectArg) => {
    console.log(arg);
    console.log(arg.startStr);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      selectable
      select={handleDateSelect}
    />
  );
};
