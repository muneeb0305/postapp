import { configureStore } from '@reduxjs/toolkit'
import AppReducer from '../App/AppSlice'
import UserReducer from '../Users/UserSlice'
import AuthReducer from '../Auth/AuthSlice'
import PostReducer from '../Post/PostSlice'

export default configureStore({
  reducer: {
    appState: AppReducer,
    user: UserReducer,
    Auth: AuthReducer,
    post: PostReducer
  }
})