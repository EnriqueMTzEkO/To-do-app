import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLogin] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                setIsLogin(false);
            }
        }

        if (!auth?.accessToken) {
            verifyRefreshToken();
        } else {
            setIsLogin(false);
        }
    }, [auth?.accessToken, refresh]);

    useEffect(() => {
        console.log(`accessTkn: ${JSON.stringify(auth?.accessToken)}`);
        console.log(`userId: ${JSON.stringify(auth?.userId)}`);
    }, [isLoading, auth]);

    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin;
