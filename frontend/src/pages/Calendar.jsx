import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEvent, deleteEvent, reset } from "../features/calendar/calendarSlice";
import { FaCalendarAlt } from 'react-icons/fa';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const localizer = momentLocalizer(moment)


function CalendarEvents() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector((state) => state.auth)
    const { events } = useSelector((state) => state.events)

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

    const newEvent = () => {
        navigate('/addEvent')
    }

    // Display event details in a modal.
    const [show, setShow] = useState(false);
    const [eventData, setEventData] = useState([])

    const handleClose = () => {
        setShow(false)
    };

    const handleShow = (e) => {
        setEventData(e)
        setShow(true)
    };

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


    return (
        <>
            <section className="heading">
                <h1>
                    <FaCalendarAlt /> Calendar
                </h1>
            </section>
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
                    popup
                    onSelectEvent={handleShow}
                />
            </div>
            <div>
                {user && user.admin ? (
                    <button className="btn" variant="primary" onClick={newEvent}>Add Event</button>
                ) : null
                }
            </div>
            <div>
                <Modal show={show}>
                    <Modal.Header>
                        <Modal.Title>Event Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Event Name: {eventData.title}</Modal.Body>
                    <Modal.Body>Start: {new Date(eventData.start).toLocaleDateString()}, {new Date(eventData.start).toLocaleTimeString()}</Modal.Body>
                    <Modal.Body>End: {new Date(eventData.end).toLocaleDateString()}, {new Date(eventData.end).toLocaleTimeString()}</Modal.Body>
                    <Modal.Body>Location: {eventData.location}</Modal.Body>
                    <Modal.Body>Additional Information: {eventData.notes}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                        {/* Edit and Delete options for admin accounts */}
                        {user && user.admin ? (
                            <>
                                <Button variant="success" onClick={() => {
                                        console.log('event edited')
                                        handleClose()
                                }
                                }>Edit Event</Button>{' '}
                                <Button variant="danger" onClick={() => {
                                        handleClose()
                                        dispatch(deleteEvent(eventData._id))
                                }
                                }>Delete Event</Button>{' '}
                            </>
                        ) : null
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default CalendarEvents;