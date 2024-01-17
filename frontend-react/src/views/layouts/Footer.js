import React from "react";
import { useStateContext } from "../../context/ContextProvider.js";
import './layouts.css';
import homeIcon from '../../assets/img/home-icon.svg';

const Footer = () => {
    const { user } = useStateContext();

    return (
        <div className="footer-line">
            <footer>
                <div className="fs-2 fw-bold text-center"><img className="icon" src={homeIcon} alt=""/>Jetimob</div>
                <div className="text-center">{user.name}</div>
            </footer>
        </div>
    );
};

export default Footer;
