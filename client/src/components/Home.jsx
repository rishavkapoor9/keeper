import React from "react";


function Home(){
    return (
        <div>
            {/* <link rel="stylesheet" href="styles.css" /> */}
            <div className="m-auto home-form">
            <div className="home-top">
                <img alt="bulb" src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"></img>
                <h1>Keeper</h1>
            </div>
            <div className="home-bottom">
                <a href="/login"><button className="btn btn-primary btn-lg home-buttons">Login</button></a>
                <a href="/signup"><button className="btn btn-primary btn-lg  home-buttons">Signup</button></a>
                
            </div>
            </div>
        </div>
        
    )
    
}

export default Home;