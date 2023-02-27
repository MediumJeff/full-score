import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newEvent, reset } from "../features/calendar/calendarSlice";
import { FaCalendarAlt } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import CalendarDisplay from "../components/CalendarDisplay";

function Calendar() {
    const [calendarData, setCalendarData] = useState({
        eventName: '',
        eventDate: new Date(),
        startTime: '',
        endTime: '',
        location: ''
    })

    const { eventName, eventDate, startTime, endTime, location } = calendarData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate('/calendar')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, dispatch, navigate])

    const onChange = (e) => {
        setCalendarData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!user.admin) {
            toast.error('Must have admin account to alter calendar.')
        } else {
            dispatch(newEvent(calendarData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaCalendarAlt /> Calendar
                </h1>
            </section>
            <div>
                <CalendarDisplay />
            </div>
        </>
    )

}

export default Calendar;