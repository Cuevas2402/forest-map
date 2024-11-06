import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer as createPersistReducer } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
	key : "root",
	version : 1,
	storage
}

const reducer = combineReducers({
	user : userReducer
})

const persistReducer = createPersistReducer(persistConfig, reducer);

export const store = configureStore({
	reducer : persistReducer,
})

