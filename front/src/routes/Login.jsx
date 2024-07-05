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
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

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
            const accessToken = response?.data?.accessToken;
            const userId = response?.data?._id;
            setAuth({ user, accessToken, userId });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('El servidor no responde.');
            } else if (err.response?.status === 400) {
                setErrMsg('Revisa tus datos y vuelve a intentarlo.');
            } else if (err.response?.status === 401) {
                setErrMsg('Tu usuario o contraseña no coinciden');
            } else {
                setErrMsg('Inicio de sesión fallido');
            }
            errRef.current.focus();
        }
    }

    return (
        <div id='container'>
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Inicia sesión</h1>
            <form onSubmit={handleSubmit}>
                <label className='label_login' htmlFor="username">Nombre de usuario:</label>
                <input
                    type="text"
                    id="username"
                    className='login_input'
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label className='label_login' htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    className='login_input'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button id='auth_btn'>Inicia Sesión</button>
            </form>
            <p>
                ¿Aún no tienes cuenta?<br />
                <span className="line">
                    <Link to={"/register"}>Regístrate</Link>
                </span>
            </p>
        </section>
        </div>
    )
}

export default Login;
