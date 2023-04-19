import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import inventoryService from "./inventoryService";

const initialState = {
    instruments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new instrument function
export const createInstrument = createAsyncThunk('instruments/create',
    async (instData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await inventoryService.createInstrument(instData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get instruments function
export const getInstrument = createAsyncThunk('instruments', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await inventoryService.getInstrument(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getEventById = createAsyncThunk('instruments/', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await inventoryService.getInstById(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update event function
export const updateInstrument = createAsyncThunk('instruments/update',
    async ({ id, instData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await inventoryService.updateEvent(id, instData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

// Delete event function
export const deleteInstrument = createAsyncThunk('instruments/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await inventoryService.deleteInstrument(id, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

// Calendar reducers
export const inventorySlice = createSlice({
    name: 'instruments',
    initialState,
    reducers: {
        reset: (state) => {
            state.instruments = []
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createInstrument.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createInstrument.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.instruments.push(action.payload)
            })
            .addCase(createInstrument.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getInstrument.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getInstrument.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.instruments = action.payload
            })
            .addCase(getInstrument.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(updateInstrument.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateInstrument.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const instIndex = state.instruments.findIndex(inst => inst.id === action.payload.id);
                if (instIndex !== -1) {
                    state.instruments[instIndex] = action.payload;
                }
            })
            .addCase(updateInstrument.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(deleteInstrument.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteInstrument.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.instruments = state.instruments.filter((inst) => isnt !== action.payload)
                state.message = action.payload
            })
            .addCase(deleteInstrument.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = inventorySlice.actions
export default inventorySlice.reducer