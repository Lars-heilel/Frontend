import type { AuthState, LoginResponse } from "./authTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
	user: null,
	accessToken: null,
	refreshToken: null,
	status: "idle",
	error: null,
	isAuthenticated: false,
};
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<LoginResponse>) => {
			state.user = action.payload.user;
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
			state.isAuthenticated = true;
		},
		clearAuthData: (state) => {
			state.user = null;
			state.accessToken = null;
			state.refreshToken = null;
			state.isAuthenticated = false;
		},
	},
});
export const { setCredentials, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
