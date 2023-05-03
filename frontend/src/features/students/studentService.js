import axios from "axios";

const API_URL = '/api/students/';

// Create new Student
const createStudent = async(studentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, studentData, config)

    return response.data
}

// Retrieve Student list
const getStudent = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const getStudentById = async(studentId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.get(API_URL + studentId, config)

    return response.data
}


// Update Student file
const updateStudent = async(studentId, instData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.put(API_URL + studentId, instData, config)

    return response.data
}

// Delete Student
const deleteStudent = async(studentId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + studentId, config)

    return response.data
}

const studentService = {
    createStudent,
    getStudent,
    getStudentById,
    updateStudent,
    deleteStudent
}

export default studentService;