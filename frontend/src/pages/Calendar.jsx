import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEvent, reset } from "../features/calendar/calendarSlice";
import { FaCalendarAlt } from 'react-icons/fa';
import CalendarDisplay from "../components/CalendarDisplay";

function Calendar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate('/calendar')
        }
        dispatch(getEvent())

        return () => {
            dispatch(reset())
        }
    }, [user, isError, isSuccess, message, dispatch, navigate])

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
            <div>
                {user && user.admin ? (
                    <button className="btn">Add Event</button>
                ) : null
                }
            </div>
        </>
    )

}

export default Calendar;