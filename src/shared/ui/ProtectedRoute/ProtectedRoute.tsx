import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "@/app/store/store";

export function ProtectedRoute() {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	return isAuthenticated ? <Outlet /> : <Navigate to='/' replace />;
}
