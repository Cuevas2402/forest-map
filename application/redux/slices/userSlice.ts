import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	user : {
		uid : -1,
		cid : -1,
		token : "",
		rid : -1
	}
}

export const userSlice = createSlice({
	name : "userSlice",
	initialState,
	reducers : {
		setUser : (state, action) => {
			state.user = action.payload.user;
		}
	}
}) 

export const {setUser} = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;