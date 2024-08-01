import { useNavigate } from "react-router-dom"
import "../style/welcomepage.css"

const WelcomePage = () => {
    const navigate = useNavigate();

    const goRegister = () => navigate('register');

    return (
        <section className="welcome-page">
        <div className="content">
            <h1>Bienvenido a Nuestra Plataforma</h1>
            <p>Descubre qué hacemos y explora </p>
            <p>Únete a nosotros y forma parte de nuestra comunidad.</p>
            <button onClick={goRegister} className="register-button">Regístrate Aquí</button>
        </div>
    </section>
    )
}

export default WelcomePage