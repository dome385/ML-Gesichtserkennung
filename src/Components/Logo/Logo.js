import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png'

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <div className="ma4 mt0 br2" style={{ height: '150px', width:'150px', transitionSpeed: 2}}>
            <Tilt>
            <img style={{paddingTop: '5px'}} src={brain} alt="logo"></img>
            </Tilt>
            </div>

        </div>
    );
}
export default Logo;