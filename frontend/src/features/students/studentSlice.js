import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "./studentService";

const initialState = {
    students: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new student function
export const createStudent = createAsyncThunk('students/create',
    async (studentData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await studentService.createStudent(studentData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get students function
export const getStudent = createAsyncThunk('students', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await studentService.getStudent(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getStudentById = createAsyncThunk('students/', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await studentService.getStudentById(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update student function
export const updateStudent = createAsyncThunk('students/update',
    async ({ studentId, studentData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await studentService.updateStudent(studentId, studentData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

// Delete student function
// Create archive system for tracking alumni?
export const deleteStudent = createAsyncThunk('students/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await studentService.deleteStudent(id, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

// Calendar reducers
export const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        reset: (state) => {
            state.students = []
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createStudent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createStudent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.students.push(action.payload)
            })
            .addCase(createStudent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getStudent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getStudent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.students = action.payload
            })
            .addCase(getStudent.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(updateStudent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const studentIndex = state.students.findIndex(student => student.id === action.payload.id);
                if (studentIndex !== -1) {
                    state.students[studentIndex] = action.payload;
                }
            })
            .addCase(updateStudent.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(deleteStudent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.students = state.students.filter((student) => student !== action.payload)
                state.message = action.payload
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = studentSlice.actions
export default studentSlice.reducer