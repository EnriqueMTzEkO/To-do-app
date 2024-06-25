import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../style/sidebar.css";

const Sidebar = () => {
    const [notes, setNotes] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();



    useEffect (() => {
        const getNotes = async () => {
            try {
                const response = await axiosPrivate.get('/notes', {
                });
                setNotes(response.data)
            } catch (err) {
                console.error('Error during refresh:', err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        };
        getNotes()
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar-profile">
                <a>Profile</a>
            </div>
            <div>
                <button>Nuevo boton</button>
            </div>
            <div className="sidebar-notes">
                {notes?.length
                ? (
                    <ul>
                    {notes.map((note, i) => 
                    <li key={i}>
                        <Link to={`/notes/${note._id}`}>{note?.title}</Link>
                    </li>)}
                    </ul>
                ) : 
                <p>no hay notas</p> }
                
            </div>
        </div>
    );
};

export default Sidebar;
