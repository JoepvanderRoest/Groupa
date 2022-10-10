import React from "react";
import './Header.css'
import logo from '../images/running-logo.png'
const Header = () => {

    return(
    <div className="HeaderBar">
        <img style={{width:"50px"}} className="headerimage" src={logo}></img>
        <span className="appTitle">Sprint Board</span>
    </div>
    );

}

export default Header;
