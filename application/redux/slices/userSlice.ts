import {createSlice} from "@reduxjs/toolkit"

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
		setUid : (state, action) => {
			state.uid = action.payload.uid;
		},
		setCid : (state, action) => {
			state.cid = action.payload.cid;
		},
		setToken : (state, action) => {
			state.token = action.payload.token;
		},
		setRid : (state, action) => {
			state.rid = action.payload.rid;
		}
	}
}) 

export const {setUid, setCid, setToken, setRid} = userSlice.actions;
export const selectUid = (state) => state.userState.uid;
export const selectCid = (state) => state.userState.cid;
export const selectRid = (state) => state.userState.rid;
export const selectToken = (state) => state.userState.token;
const userReducer = userSlice.reducer;
export default userReducer;


