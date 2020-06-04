import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <div className="authors">
                Crafted by <a href="http://joydsouza.me/portfolio" rel="noopener noreferrer" target="_blank" className="footer-link">Joy Dsouza</a>, <a href="https://www.linkedin.com/in/praneethrk"  rel="noopener noreferrer"  target="_blank"  className="footer-link">Praneeth RK</a> and <a href="https://www.linkedin.com/in/niranjan-malya-075525122"  rel="noopener noreferrer"  target="_blank"  className="footer-link">Niranjan Malya</a> while maintaining social distance and following necessary precausions.
            </div>
            <div className="copyrights">
                &copy; {new Date().getFullYear()} All Rights Reserved.
            </div>
        </div>   
    )
}

export default Footer;