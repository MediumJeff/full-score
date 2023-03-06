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

    const { events, isLoading, isError, message } = useSelector((state) => state.events)

    const [eventsAll, setEventsAll] = useState(events)


    useEffect(() => {
        if(isError){
            console.log(message)
        }
        
        setEventsAll([...events])
    }, [events, isError, message])

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
        <div>
            <Calendar
                localizer={localizer}
                events={eventsAll}
                style={{ height: 500 }}
            />
        </div>

        </>
    )
}

export default CalendarDisplay;