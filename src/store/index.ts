import { configureStore } from '@reduxjs/toolkit'
import newspapersReducer from './newspapers/reducer'

export default configureStore({
    reducer: {
        newspapers: newspapersReducer   
    }
})
