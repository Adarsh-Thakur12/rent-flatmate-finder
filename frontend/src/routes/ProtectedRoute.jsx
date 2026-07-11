import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {

    const { user, loading } = useContext(AuthContext);

    if (loading) {

        return (
            <div className="min-h-screen flex justify-center items-center text-xl">
                Loading...
            </div>
        );

    }

    if (!user) {

        return <Navigate to="/login" replace />;

    }

    if (role && user.role !== role) {

        return <Navigate to="/" replace />;

    }

    return children;

}

export default ProtectedRoute;