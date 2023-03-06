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
import Spinner from "../components/Spinner";
import { getEvent } from "../features/calendar/calendarSlice";

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

    const { events, isLoading } = useSelector((state) => state.events)

    if(isLoading){
        return <Spinner />
    }

    console.log(events)

    return (
        <>
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="eventDate"
                style={{ height: 500 }}
            />
        </div>

        </>
    )
}

export default CalendarDisplay;