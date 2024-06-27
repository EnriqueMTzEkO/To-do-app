import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        const accessToken = response.data.accessToken;
        const userId = response.data._id;
        setAuth(prev => {
            console.log(prev);
            console.log(accessToken);
            console.log(userId);
            return { ...prev, accessToken, userId };
        });
        return {accessToken, userId};
    }
    return refresh;
}

export default useRefreshToken;