export interface User {
	id: number;
	name: string;
	email: string;
}
export interface LoginResponse {
	user: User;
	accessToken: string;
	refreshToken: string;
}
export interface LoginFormValue {
	email: string;
	password: string;
}
export interface RegisterFormValue extends LoginFormValue {
	name: string;
	confirmPassword: string;
}
export interface AuthState {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	isAuthenticated: boolean;
}
