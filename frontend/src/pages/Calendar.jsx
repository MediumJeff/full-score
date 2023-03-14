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
            navigate('/')
        }
        dispatch(getEvent())

        return () => {
            dispatch(reset())
        }
    }, [user, isError, isSuccess, message, dispatch, navigate])

    const onClick = () => {
        navigate('/addEvent')
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
            <div>
                {user && user.admin ? (
                    <button className="btn" onClick={onClick}>Add Event</button>
                ) : null
                }
            </div>
        </>
    )

}

export default Calendar;