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
// change Password
export const changePassword = createAsyncThunk(
    "changePassword",
    async (data, { getState, rejectWithValue }) => {
        const state = getState()
        const token = state.Auth.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return axios.post(`http://localhost:8080/user/changepassword`, data, config)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error)
                const err = error.response.data
                return rejectWithValue(err)
            });
    }
);
// change Email
export const changeEmail = createAsyncThunk(
    "changeEmail",
    async (data, { getState, rejectWithValue }) => {
        const state = getState()
        const token = state.Auth.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return axios.post(`http://localhost:8080/user/changeemail`, data, config)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error)
                const err = error.response.data
                return rejectWithValue(err)
            });
    }
);
// Delete Account
export const deleteAccount = createAsyncThunk(
    "deleteAccount",
    async (args, { getState, rejectWithValue }) => {
        const state = getState()
        const token = state.Auth.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return axios.delete(`http://localhost:8080/user/deleteaccount`, config)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error)
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
        //change Password
        [changePassword.pending]: (state) => {
            state.loading = true;
        },
        [changePassword.fulfilled]: (state) => {
            state.loading = false;
        },
        [changePassword.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //change Email
        [changeEmail.pending]: (state) => {
            state.loading = true;
        },
        [changeEmail.fulfilled]: (state) => {
            state.loading = false;
        },
        [changeEmail.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //Delete Account
        [deleteAccount.pending]: (state) => {
            state.loading = true;
        },
        [deleteAccount.fulfilled]: (state) => {
            state.loading = false;
        },
        [deleteAccount.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export default UserSlice.reducer