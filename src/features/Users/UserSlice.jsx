import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

//Add User
export const addUser = createAsyncThunk(
    "addUser",
    async (data, { rejectWithValue }) => {
        return axios.put(`http://localhost:8080/user/add`, data)
            .then(response => {
                return response.data
            })
            .catch(error => {
                const err = error.response.data
                return rejectWithValue(err)
            });
    }
);

export const UserSlice = createSlice({
    name: 'User',
    initialState: {
        loading: false,
        error: null,
    },
    extraReducers: {
        //Add User
        [addUser.pending]: (state) => {
            state.loading = true;
        },
        [addUser.fulfilled]: (state) => {
            state.loading = false;
        },
        [addUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export default UserSlice.reducer