import React, { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import "./style/home.css"

const Home = () => {
    


    return(
        <div id="home">
            <Sidebar />
            <div>
                <div>
                    <h1 id="title">Un lindo</h1>
                </div>
                <div id="note">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo molestias laboriosam eligendi architecto at! Atque, nisi. Excepturi facere optio dolores explicabo saepe doloribus officiis, provident amet itaque, quisquam dolor magnam deleniti cumque, facilis culpa iusto. Earum, quisquam numquam, neque quaerat porro voluptate in minus blanditiis harum, officia commodi ut doloremque sequi dolore? Architecto dolorum perspiciatis rerum aspernatur, excepturi doloribus neque quis blanditiis itaque quaerat eligendi, enim fugiat vel! Ut error vitae odio impedit iste magni veritatis, cum nobis, fugit aspernatur perspiciatis quo! Veritatis at aut porro ab tempora, vitae cum nihil saepe, temporibus et odit sed nisi quidem nostrum modi?</p>
                </div>
            </div>
        </div>
    );
}

export default Home 
