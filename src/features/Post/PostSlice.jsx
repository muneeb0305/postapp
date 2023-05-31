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
//Add Comment
export const addComment = createAsyncThunk(
    "addComment",
    async (data, { getState, rejectWithValue }) => {
        const state = getState()
        const token = state.Auth.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return axios.put(`http://localhost:8080/post/addcomment`, data, config)
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
        const state = getState()
        const token = state.Auth.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return axios.post(`http://localhost:8080/post/updatepost`, data, config)
            .then(response => {
                return response.data
            })
            .catch(error => {
                const err = error.response.data
                return rejectWithValue(err)
            });
    }
);
//Update Comment
export const updateComment = createAsyncThunk(
    "updateComment",
    async (data, { getState, rejectWithValue }) => {
        const state = getState()
        const token = state.Auth.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return axios.post(`http://localhost:8080/post/updatecomment`, data, config)
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
//Delete Comment
export const deleteComment = createAsyncThunk(
    "deleteComment",
    async (data, { getState, rejectWithValue }) => {
        const state = getState()
        const token = state.Auth.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return axios.delete(`http://localhost:8080/post/deletecomment`, {
            ...config,
            data: data
        })
            .then(response => {
                return response.data
            })
            .catch(error => {
                const err = error.response.data
                return rejectWithValue(err)
            });
    }
);
//Get Post
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
//Get Post By ID
export const getPostByID = createAsyncThunk(
    "getPostByID",
    async (args, { getState, rejectWithValue }) => {
        const state = getState()
        const token = state.Auth.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return axios.get(`http://localhost:8080/post/viewpostbyID`, config)
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
        //Delete Comment
        [deleteComment.pending]: (state) => {
            state.loading = true;
        },
        [deleteComment.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [deleteComment.rejected]: (state, action) => {
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
        //Add Comment
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
        //Update Comment
        [updateComment.pending]: (state) => {
            state.loading = true;
        },
        [updateComment.fulfilled]: (state) => {
            state.loading = false;
        },
        [updateComment.rejected]: (state, action) => {
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
        //getPostByID
        [getPostByID.pending]: (state) => {
            state.loading = true;
        },
        [getPostByID.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        [getPostByID.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export default OrderSlice.reducer