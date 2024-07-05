import { Outlet } from "react-router";
import './style/index.css';

const Layout = () => {

    return(
        <main className="App">
            <Outlet />
        </main>
    );
}

export default Layout