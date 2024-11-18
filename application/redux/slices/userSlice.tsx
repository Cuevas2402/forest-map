import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface UserState {
	uid : number,
	cid :  number,
	rid : number,
	token : string,
}

const initialState = {
	uid : -1,
	cid : -1,
	token : "",
	rid : -1
}

export const userSlice = createSlice({
	name : "userSlice",
	initialState,
	reducers : {
		setUid : (state, action : PayloadAction<{uid : number}>) => {
			state.uid = action.payload.uid;
		},
		setCid : (state, action : PayloadAction<{cid : number}>) => {
			state.cid = action.payload.cid;
		},
		setToken : (state, action : PayloadAction<{token : string}>) => {
			state.token = action.payload.token;
		},
		setRid : (state, action : PayloadAction<{rid : number}>) => {
			state.rid = action.payload.rid;
		}
	}
}) 

export const {setUid, setCid, setToken, setRid} = userSlice.actions;
export const selectUid = (state : {userState : UserState}) => state.userState.uid;
export const selectCid = (state : {userState : UserState}) => state.userState.cid;
export const selectRid = (state : {userState : UserState}) => state.userState.rid;
export const selectToken = (state : {userState : UserState}) => state.userState.token;
const userReducer = userSlice.reducer;
export default userReducer;


