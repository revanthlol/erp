import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Check for the backend token which is the source of truth for session
  // checking "erp-auth" is legacy, we should rely on "auth_token" logic if we moved to that
  // for now, we check both or prioritize the token presence.
  const isAuthenticated = localStorage.getItem("auth_token");

  if (!isAuthenticated) {
    // FIX: Redirect to /login, not /
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}