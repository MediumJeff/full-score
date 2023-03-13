import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import calendarService from "./calendarService";

const initialState = {
    events: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new event function
export const createEvent = createAsyncThunk('calendar',
    async (calendarData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await calendarService.createEvent(calendarData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get events function
export const getEvent = createAsyncThunk('calendar/events', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await calendarService.getEvent(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update event function
export const updateEvent = createAsyncThunk('calendar/eventUpdate',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await calendarService.updateEvent(id, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

// Delete event function
export const deleteEvent = createAsyncThunk('calendar/eventRemove',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await calendarService.deleteEvent(id, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

// Calendar reducers
export const calendarSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createEvent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.events.push(action.payload)
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getEvent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getEvent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.events = action.payload
            })
            .addCase(getEvent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateEvent.pending, (state) => {
                state.isLoading = true
            })
            // Not a push statement? Updating file from database need action.payload?
            .addCase(updateEvent.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteEvent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.events.push(action.payload)
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = calendarSlice.actions
export default calendarSlice.reducer