import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {
	LoginFormValue,
	RegisterFormValue,
	LoginResponse,
} from "../model/authTypes";
import { clearAuthData } from "../model/authSlice";
import type { RootState } from "@/app/store/store";

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.accessToken;
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result.error?.status === 401) {
		const refreshToken = (api.getState() as RootState).auth.refreshToken;

		if (refreshToken) {
			const refreshResult = await baseQuery(
				{
					url: "/auth/refresh-tokens",
					method: "POST",
					body: { refreshToken },
				},
				api,
				extraOptions,
			);

			if (refreshResult.data) {
				const { accessToken, refreshToken: newRefreshToken } =
					refreshResult.data as LoginResponse;

				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("refreshToken", newRefreshToken);

				result = await baseQuery(args, api, extraOptions);
			} else {
				api.dispatch(clearAuthData());
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
			}
		}
	}
	return result;
};

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, LoginFormValue>({
			query: (credentials) => ({
				url: "/auth/login",
				method: "POST",
				body: credentials,
			}),
		}),
		register: builder.mutation<LoginResponse, RegisterFormValue>({
			query: (userData) => ({
				url: "/auth/register",
				method: "POST",
				body: userData,
			}),
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
	authApi;
