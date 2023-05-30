import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

//Add Post
export const addPost = createAsyncThunk(
    "addPost",
    async (data, { getState, rejectWithValue }) => {
        const state = getState()
        const token = state.Auth.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return axios.put(`http://localhost:8080/post/add`, data, config)
            .then(response => {
                return response.data
            })
            .catch(error => {
                const err = error.response.data
                return rejectWithValue(err)
            });
    }
);
//Update Post
export const updatePost = createAsyncThunk(
    "updatePost",
    async (data, { getState, rejectWithValue }) => {
        console.log(data)
        const state = getState()
        const token = state.Auth.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return axios.post(`http://localhost:8080/post/update/${data[0]}`, data[1], config)
            .then(response => {
                return response.data
            })
            .catch(error => {
                const err = error.response.data
                return rejectWithValue(err)
            });
    }
);
//Delete Post
export const deletePost = createAsyncThunk(
    "deletePost",
    async (id, { getState, rejectWithValue }) => {
        const state = getState()
        const token = state.Auth.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return axios.delete(`http://localhost:8080/post/delete/${id}`, config)
            .then(response => {
                return response.data
            })
            .catch(error => {
                const err = error.response.data
                return rejectWithValue(err)
            });
    }
);
//Delete Post
export const getPost = createAsyncThunk(
    "getPost",
    async (args, { getState, rejectWithValue }) => {
        const state = getState()
        const token = state.Auth.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return axios.get(`http://localhost:8080/post/viewpost`, config)
            .then(response => {
                return response.data
            })
            .catch(error => {
                const err = error.response.data
                return rejectWithValue(err)
            });
    }
);


export const OrderSlice = createSlice({
    name: 'Posts',
    initialState: {
        posts: [],
        loading: false,
        error: '',
    },
    extraReducers: {
        //Delete Post
        [deletePost.pending]: (state) => {
            state.loading = true;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [deletePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //Add Post
        [addPost.pending]: (state) => {
            state.loading = true;
        },
        [addPost.fulfilled]: (state) => {
            state.loading = false;
        },
        [addPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //Update Post
        [updatePost.pending]: (state) => {
            state.loading = true;
        },
        [updatePost.fulfilled]: (state) => {
            state.loading = false;
        },
        [updatePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //Get Post
        [getPost.pending]: (state) => {
            state.loading = true;
        },
        [getPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        [getPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export default OrderSlice.reducer