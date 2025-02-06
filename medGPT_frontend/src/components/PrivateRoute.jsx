import { Navigate } from "react-router-dom";
import { useAuthStore } from "../utils/authStore";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        console.log("User not authenticated, redirecting to signin");
        return <Navigate to="/signin" />;
    }

    return children;
};

export default PrivateRoute;
