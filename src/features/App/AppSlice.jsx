import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'AppState',
    initialState: {
        changeName: [],
    },
    reducers: {
        changeName: (state, action) => {
            return { ...state, changeName: [action.payload] };
        },
    }
})

export const { changeName } = appSlice.actions
export default appSlice.reducer