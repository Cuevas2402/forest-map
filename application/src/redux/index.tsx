import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

const persistConfig = {
	key : "root",
	storage,
	whitelist : ['userState']
}

const rootReducers = combineReducers({
	userState : userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
	reducer : persistedReducer,
	middleware : (getDefaultMiddelware) => getDefaultMiddelware({serializableCheck : false}).concat(thunk),
})

export default store;

