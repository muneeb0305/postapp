import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../Users/UserSlice'
import AuthReducer from '../Auth/AuthSlice'
import PostReducer from '../Post/PostSlice'

export default configureStore({
  reducer: {
    user: UserReducer,
    Auth: AuthReducer,
    post: PostReducer
  }
})