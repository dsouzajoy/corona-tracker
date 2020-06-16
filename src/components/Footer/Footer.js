import React from "react";
import "./Footer.css";
import aarogyaSetuBtn from "../../assets/aarogya_btn_img.png";
function Footer() {
    return (
        <div className="footer">
            <div className="authors">
                Crafted by <a href="http://joydsouza.me/portfolio" rel="noopener noreferrer" target="_blank" className="footer-link">Joy Dsouza</a>, <a href="https://www.linkedin.com/in/praneethrk"  rel="noopener noreferrer"  target="_blank"  className="footer-link">Praneeth RK</a> and <a href="https://www.linkedin.com/in/niranjan-malya-075525122"  rel="noopener noreferrer"  target="_blank"  className="footer-link">Niranjan Malya</a> while maintaining social distance and following necessary precautions.
            </div>
            <div className="footer-btns">
               <a   rel="noopener noreferrer" target="_blank" href="https://www.mygov.in/aarogya-setu-app/?app=aarogya&target=browser&t=1592196008"> <img src={aarogyaSetuBtn} />  </a>
               <a   rel="noopener noreferrer" target="_blank" href="https://github.com/dsouzajoy/corona-tracker/tree/master" className="footer-btn-link"> OPEN SOURCED ON GITHUB &nbsp; <i className="fab fa-github"></i> </a>
           
                 </div>
            <div className="copyrights">
                &copy; {new Date().getFullYear()} All Rights Reserved.
            </div>
        </div>   
    )
}

export default Footer;