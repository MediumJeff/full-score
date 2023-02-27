
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parseJSON from "date-fns/parseJSON";
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
    "en-US": require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer({
    format,
    parseJSON,
    startOfWeek,
    getDay,
    locales
})

function CalendarDisplay() {

    return (
        <div>
            <Calendar
                localizer={localizer}
                startAccessor='eventStartTime'
                endAccessor="eventEndTime"
                style={{ height: 500, margin: "50px" }}
            />
        </div>
    )
}

export default CalendarDisplay;