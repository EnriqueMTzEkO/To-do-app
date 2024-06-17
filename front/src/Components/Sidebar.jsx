import React, { useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import "../style/sidebar.css";

const Sidebar = () => {
    const [notes, setNotes] = useState();
    const refresh = useRefreshToken();

    const handleRefresh = async () => {
        try {
            await refresh();
        } catch (err) {
            console.error('Error during refresh:', err);
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar-profile">
                <a>Profile</a>
                <button onClick={handleRefresh}>Refresh</button>
            </div>
            <div className="sidebar-notes">
                <p>notas</p>
            </div>
        </div>
    );
};

export default Sidebar;
