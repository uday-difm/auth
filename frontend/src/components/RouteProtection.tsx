import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

interface RouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: RouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-purple-500 border-l-transparent animate-spin [animation-duration:1s] [animation-direction:reverse]"></div>
        </div>
        <p className="text-stone-400 font-medium tracking-wider text-sm animate-pulse">
          Securing Session...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export function PublicRoute({ children }: RouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-purple-500 border-l-transparent animate-spin [animation-duration:1s] [animation-direction:reverse]"></div>
        </div>
        <p className="text-stone-400 font-medium tracking-wider text-sm animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
