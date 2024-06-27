import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Acceso no autorizado</h1>
            <br />
            <p>No tienes autorizado ingresar a esta pagina.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Regresar</button>
            </div>
        </section>
    )
}

export default Unauthorized