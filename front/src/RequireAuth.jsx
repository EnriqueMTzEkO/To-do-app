import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "./hooks/userAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    
    return(
        auth?.user
            ? <Outlet />
            : <Navigate to="/login" state={{from: location}} replace />
    );
}

export default RequireAuth;