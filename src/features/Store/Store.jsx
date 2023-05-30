import { configureStore } from '@reduxjs/toolkit'
import AppReducer from '../App/AppSlice'

export default configureStore({
  reducer: {
    appState: AppReducer,
  }
})