import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
    "en-US": enUS
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})


function CalendarDisplay() {

    const { events } = useSelector((state) => state.events)
    const { user } = useSelector((state) => state.auth)

    console.log(events)

    return (
        <>
        <div>
            <Calendar
                localizer={localizer}

                style={{ height: 500 }}
            />
        </div>
        <div>
            <p>{user.firstName}</p>

        </div>

        </>
    )

    
}




export default CalendarDisplay;