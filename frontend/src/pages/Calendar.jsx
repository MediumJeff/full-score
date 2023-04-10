import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEvent, deleteEvent, updateEvent, reset } from "../features/calendar/calendarSlice";
import { FaCalendarAlt } from 'react-icons/fa';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const localizer = momentLocalizer(moment)


export default function CalendarEvents() {

    // Get user info and pull event info from MongoAtlas
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


    // Display event details in a modal.
    const [show, setShow] = useState(false);
    const [eventData, setEventData] = useState([]);
    const [editShow, setEditShow] = useState(false)
    const [updatedEvent, setUpdatedEvent] = useState({})

    const handleClose = () => {
        setShow(false)
    };

    const handleShow = (e) => {
        setEventData(e)
        setShow(true)
    };

    // Add or delete an event and refresh page to reflect changes
    const newEvent = () => {
        navigate('/addEvent')
    }

    // TODO: Add confirmation option for deletion
    const removeEvent = () => {
        dispatch(deleteEvent(eventData._id))
        window.location.reload(true)
    }

    const updateEventModal = () => {
        setUpdatedEvent(eventData)
        handleClose()
        setEditShow(true)
    }

    const onChange = (e) => {
        setUpdatedEvent({ ...updatedEvent, [e.target.name]: e.target.value })
    }

    const editEvent = () => {
        dispatch(updateEvent(updatedEvent._id))
        console.log(updatedEvent)
        handleClose()
    }



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
            {/* Main dispaly of monthly calendar */}
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
            {/* Add Event button only available to admin users */}
            <div>
                {user && user.admin ? (
                    <button className="btn" variant="primary" onClick={newEvent}>Add Event</button>
                ) : null
                }
            </div>
            {/* Modal with event details */}
            <div>
                <Modal show={show}>
                    <Modal.Header>
                        <Modal.Title>Event Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Event Name: {eventData.title}</Modal.Body>
                    <Modal.Body>Start: {new Date(eventData.start).toLocaleString()}</Modal.Body>
                    <Modal.Body>End: {new Date(eventData.end).toLocaleString()}</Modal.Body>
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
                                    updateEventModal()
                                }
                                }
                                >Edit Event</Button>{' '}
                                <Button variant="danger" onClick={() => {
                                    removeEvent()
                                    handleClose()
                                }}>Delete Event</Button>{' '}
                            </>
                        ) : null
                        }
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Additional modal to edit event details. Admin only. */}
            <div>
                <Modal show={editShow}>
                    <Modal.Header>
                        <Modal.Title>Update Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="eventName">
                                <Form.Label>Event name: </Form.Label>
                                <Form.Control type="text" name="title" value={updatedEvent.title} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="eventStartTime">
                                <Form.Label>Event start: {new Date(eventData.start).toLocaleString()}</Form.Label>
                                <Form.Control type="datetime-local" name="start" value={new Date(updatedEvent.start).toISO} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="eventEndTime">
                                <Form.Label>Event end: {new Date(eventData.end).toLocaleString()}</Form.Label>
                                <Form.Control type="datetime-local" name="end" value={new Date(updatedEvent.end).toISO} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="eventLocation">
                                <Form.Label>Event location: </Form.Label>
                                <Form.Control type="text" name="location" value={updatedEvent.location} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="eventNotes">
                                <Form.Label>Additional information: </Form.Label>
                                <Form.Control type="text" name="notes" value={updatedEvent.notes} onChange={onChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" active onClick={() => { setEditShow(false) }}>Cancel</Button>
                        <Button variant="success" active onClick={() => { editEvent() }} >Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}