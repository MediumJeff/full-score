import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import calendarService from "./calendarService";

const initialState = {
    events: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new event function
export const createEvent = createAsyncThunk('calendar/create',
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
export const getEvent = createAsyncThunk('calendar', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await calendarService.getEvent(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getEventById = createAsyncThunk('calendar/', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await calendarService.getEventById(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update event function
export const updateEvent = createAsyncThunk('calendar/update',
    async ({ id, eventData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await calendarService.updateEvent(id, eventData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

// Delete event function
export const deleteEvent = createAsyncThunk('calendar/delete',
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
    name: 'events',
    initialState,
    reducers: {
        reset: (state) => {
            state.events = []
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        }
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
            .addCase(getEvent.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(updateEvent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const eventIndex = state.events.findIndex(event => event.id === action.payload.id);
                if (eventIndex !== -1) {
                    state.events[eventIndex] = action.payload;
                }
            })
            .addCase(updateEvent.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(deleteEvent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.events = state.events.filter((event) => event !== action.payload)
                state.message = action.payload
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