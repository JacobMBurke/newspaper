import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist'
import ExpoFileSystemStorage from "redux-persist-expo-filesystem"

import newspapersReducer from './newspapers/reducer'

const reducers = combineReducers({
    newspapersReducer
})

const persistConfig = {
    key: 'root',
    storage: ExpoFileSystemStorage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)

export default store
