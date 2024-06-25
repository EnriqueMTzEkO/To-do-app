import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import "../style/home.css"

const Home = () => {
    


    return(
        <div id="home">
            <Sidebar />
            <div>
                <div>
                    <h1 id="title">Un lindo</h1>
                </div>
                <div id="note">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo molestias laboriosam eligendi architecto at! Atque, nisi. Excepturi facere optio dolores explicabo saepe doloribus officiis, provident amet itaque, quisquam dolor magnam deleniti cumque, facilis culpa iusto. Earum, quisquam numquam, neque quaerat porro voluptate in minus blanditiis harum, officia commodi ut doloremque sequi dolore? Architecto dolorum perspiciatis rerum aspernatur, excepturi doloribus neque quis blanditiis itaque quaerat eligendi, enim fugiat vel! Ut error vitae odio impedit iste magni veritatis, cum nobis, fugit aspernatur perspiciatis quo! Veritatis at aut porro? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi sapiente blanditiis deserunt quisquam mollitia rem, officia molestias voluptatum architecto. Ab reprehenderit, enim quaerat est non excepturi cum, nostrum blanditiis, similique doloremque molestiae. Aspernatur asperiores optio consequuntur ullam. Delectus excepturi soluta quae quas corrupti vel repellat ab, reprehenderit molestiae explicabo. Alias.</p>
                    <Link to={'settings'}>Configuracion</Link>
                </div>
            </div>
        </div>
    );
}

export default Home 
