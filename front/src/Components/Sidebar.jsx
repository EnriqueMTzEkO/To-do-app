import React, { useEffect, useState } from "react";
import "../style/sidebar.css"


const Sidebar = () => {
    const [init, setInit] = useState(false);
    const [links, setLinks] = useState([]);
    useEffect(() => {
        async function t() {
            setTimeout(() => setLinks([{ text: "a", href: "#" },{ text: "a", href: "#" },{ text: "a", href: "#" },{ text: "a", href: "#" }]), 1000);
        }
        
        if (!init) {
            t();

            console.log(links);
            setInit(true);
        }
    }, [init]);
    return(
        <div className="sidebar">
            <div className="sidebar-profile">
                <a>Profile</a>
            </div>
            <div className="sidebar-notes">
                {links.map(Link)}
            </div>
        </div>
    );
}

export default Sidebar 

const Link = (link) => <a href={link.href} key={link.href}>{link.text}</a>
