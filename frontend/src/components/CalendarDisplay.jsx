import { useSelector } from "react-redux";
import { useMemo } from "react";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const localizer = momentLocalizer(moment)


function CalendarDisplay() {
    const { events } = useSelector((state) => state.events)


    // Details for react-big-calendar display
    const { defaultDate, formats, views } = useMemo(
        () => ({
            defaultDate: new Date(),
            formats: {
                dayFormat: (date, culture, localizer) =>
                    localizer.format(date, 'ddd MM/DD', culture),
                eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
                    localizer.format(start, 'hh:mm a', culture) +
                    ' - ' +
                    localizer.format(end, 'hh:mm a', culture),
            },
            views: [Views.MONTH, Views.WEEK, Views.DAY],
        }),
        []
    )

    // TODO: Make Dialog via MUI to send to edit/delete functions? React-bootstrap modal?
    // Try to avoid separate page if at all possible

    const handleSelectedEvent = (e) => {
        alert(`Event name: ${e.title}\nEvent start: ${new Date(e.start).toLocaleDateString()}, ${new Date(e.start).toLocaleTimeString()}\nEvent end: ${new Date(e.end).toLocaleDateString()}, ${new Date(e.end).toLocaleTimeString()}\nLocation: ${e.location}\nAdditional information: ${e.notes}`)
    }

    return (
        <>
            <div>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor={(events) => { return new Date(events.start) }}
                    endAccessor={(events) => { return new Date(events.end) }}
                    style={{ height: 500 }}
                    defaultDate={defaultDate}
                    formats={formats}
                    views={views}
                    scrollToTime={new Date()}
                    selectable
                    popup
                    onSelectEvent={handleSelectedEvent}
                />
            </div>
        </>
    )
}

export default CalendarDisplay;