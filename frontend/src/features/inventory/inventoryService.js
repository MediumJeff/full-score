import axios from "axios";

const API_URL = '/api/instruments/';

// Create new instrument
const createInstrument = async(instData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, instData, config)

    return response.data
}

// Retrieve instrument list
const getInstrument = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const getInstById = async(eventId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.get(API_URL + eventId, config)

    return response.data
}


// Update instrument file
const updateInstrument = async(instId, instData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.put(API_URL + instId, instData, config)

    return response.data
}

// Delete instrument
const deleteInstrument = async(instId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + instId, config)

    return response.data
}

const inventoryService = {
    createInstrument,
    getInstrument,
    getInstById,
    updateInstrument,
    deleteInstrument
}

export default inventoryService;