import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import "../style/sidebar.css";

const Sidebar = () => {
    const [myNotes, setMyNotes] = useState([]);
    const [sharedNotes, setSharedNotes] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();
    const logout = useLogout();
    const currentUsr = auth?.userId;

    const nuevaNota = () =>{
        navigate('/notes/nueva_nota')
    }

    useEffect (() => {
        const getNotes = async () => {
            try {
                const response = await axiosPrivate.get('/notes', {
                    params:{
                        Id: currentUsr
                    }
                });
                
                const allNotes = response.data;
                const myNotes = allNotes.filter(note => note.ownerId === currentUsr);
                const sharedNotes = allNotes.filter(note => note.ownerId !== currentUsr);

                setMyNotes(myNotes);
                setSharedNotes(sharedNotes);
            } catch (err) {
                console.error('Error during refresh:', err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        };
        getNotes()
        
    }, [currentUsr, axiosPrivate, location, navigate]);

    const signOut = async () => {
            await logout();
            navigate('/login');
    }
    
    return (
        <div className="sidebar">
            <div className="sidebar-profile">
                <Link to={'/settings'}>
                <FaRegUser />
                </Link>
            </div>
            <div>
                <button onClick={nuevaNota}>Nueva Nota</button>
            </div>
            <div className="sidebar-myNotes">
                <h3>Mis Notas</h3>
                {myNotes.length ? (
                    <ul>
                        {myNotes.map((note, i) => 
                            <li key={i}>
                                <Link to={`/notes/${note._id}`}>{note?.title}</Link>
                            </li>
                        )}
                    </ul>
                ) : (
                    <p>No hay notas</p>
                )}
            </div>
            <div className="sidebar-sharedWithMe">
                <h3>Notas Compartidas</h3>
                {sharedNotes.length ? (
                    <ul>
                        {sharedNotes.map((note, i) => 
                            <li key={i}>
                                <Link to={`/notes/${note._id}`}>{note?.title}</Link>
                            </li>
                        )}
                    </ul>
                ) : (
                    <p>No hay notas compartidas</p>
                )}
            </div>
            <div>
                <button onClick={signOut}>Cerrar sesion</button>
            </div>
        </div>
    );
};

export default Sidebar;
