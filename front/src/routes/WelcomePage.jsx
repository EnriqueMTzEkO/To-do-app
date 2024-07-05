import { useNavigate } from "react-router-dom"

const WelcomePage = () => {
    const navigate = useNavigate();

    const goRegister = () => navigate('register');

    return (
        <section>
            <h1>Aqui debe tener una pagina que diga que hacemos y la imagen que hicimos</h1>
            <br />
            <p>Hola</p>
            <div>
                <button onClick={goRegister}>registreate aqui</button>
            </div>
        </section>
    )
}

export default WelcomePage