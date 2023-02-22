import axios from "axios";

const API_URL = '/api/calendar/';

// Create new event
const newEvent = async(calendarData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, calendarData, config)

    return response.data
}

// Retrieve events
const getEvents = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Update event
const updateEvent = async(eventId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + eventId, config)

    return response.data
}

// Delete event
const deleteEvent = async(eventId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + eventId, config)

    return response.data
}

const calendarService = {
    newEvent,
    getEvents,
    updateEvent,
    deleteEvent
}

export default calendarService;