import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading, ProtectedRoute } from "@/shared/ui";

export const LoginPage = lazy(() => import("@pages/auth/LoginPage"));
export const RegisterPage = lazy(() => import("@pages/auth/RegisterPage"));
export const ChatPage = lazy(() => import("@pages/chat/ChatPage"));
export default function AppRouter() {
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route path='/' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route element={<ProtectedRoute />}>
					<Route path='/chat' element={<ChatPage />} />
				</Route>
			</Routes>
		</Suspense>
	);
}
