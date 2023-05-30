import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import jwtDecode from "jwt-decode";

export const login = createAsyncThunk(
    "login",
    async (user, { rejectWithValue }) => {
        return axios.post(`http://localhost:8080/user/login`, user)
            .then(res => {
                const response = res.data.Authorization
                const token = response && response.split(' ')[1];
                const decode = jwtDecode(token)
                const role = decode.Role
                sessionStorage.setItem('token', token)
                return { token, role }
            })
            .catch(error => {
                console.log(error)
                const err = error.response.data
                return rejectWithValue(err)
            });
    }
);

export const checkToken = createAsyncThunk(
    "checkToken",
    async (token, { rejectWithValue }) => {
        return axios.post(`http://localhost:8080/user/checktoken`, token)
            .then(res => {
                const response = res.data.Authorization
                const token = response && response.split(' ')[1];
                const decode = jwtDecode(token)
                const role = decode.Role
                return { token, role }
            })
            .catch(error => {
                const err = error.response.data
                return rejectWithValue(err)
            });
    }
);

const initialState = {
    isAuthenticate: false,
    isLogged: false,
    token: null,
    role: null,
    loading: false,
}
export const authSlice = createSlice({
    name: 'AuthState',
    initialState,
    reducers: {
        Logout: state => {
            sessionStorage.clear()
            return state = initialState;
        },
    },
    extraReducers: {

        //Login
        [login.pending]: (state) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.isAuthenticate = true;
            state.isLogged = true;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //Login
        [checkToken.pending]: (state) => {
            state.loading = true;
        },
        [checkToken.fulfilled]: (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.isAuthenticate = true;
            state.isLogged = true;
        },
        [checkToken.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const { Logout } = authSlice.actions
export default authSlice.reducer
