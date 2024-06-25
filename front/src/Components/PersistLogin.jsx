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
                // console.log("don't have an accessToken")   
            } catch (err) {
                console.error(err)
            }
            finally{
                setIsLogin(false);
            }
        }
        if(!auth?.accessToken){
            verifyRefreshToken();
        } else{
            setIsLogin(false);
        }
    }, [])

    useEffect(() => {
        //console.log(`isLoading: ${isLoading}`);
        //console.log(`accessTkn: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading, auth])

    return(
        <>
            {isLoading
                ? <p>Loading...</p>
                : <Outlet />
                }
        </>
    )
}

export default PersistLogin