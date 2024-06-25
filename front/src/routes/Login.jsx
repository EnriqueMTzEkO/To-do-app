import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../style/index.css";
import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/notes";


    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            //console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            setAuth({ user, pwd, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { reaplace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('El servidor no responde.');
            } else if (err.response?.status === 400) {
                setErrMsg('Revisa tus datos y vuelve a intentarlo.');
            } else if (err.response?.status === 401) {
                setErrMsg('Tu usuario o contraseña no coinciden');
            } else {
                setErrMsg('Inicio de sesion fallido');
            }
            errRef.current.focus();
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Inicia sesion</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Nombre de usuario:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Inicia Sesion</button>
                    </form>
                    <p>
                        Aun no tienes cuenta??<br />
                        <span className="line">
                            {/*put router link here*/}
                            <Link to={"/register"}>Registrate</Link>
                        </span>
                    </p>
                </section>
    )
}

export default Login
