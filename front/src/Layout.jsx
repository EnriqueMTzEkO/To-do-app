import { Outlet } from "react-router";
import './style/index.css';

const Layout = () => {

    return(
        <main className="App">
            <Outlet />
            <div>Esto es del layout.jsx</div>
        </main>
    );
}

export default Layout