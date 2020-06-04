import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <div className="authors">
                Made with <i className="fas fa-heart"></i> by Joy Dsouza, Praneeth R K and Niranjan Malya.
            </div>
            <div className="copyrights">
                &copy; {new Date().getFullYear()} All Rights Reserved.
            </div>
        </div>   
    )
}

export default Footer;