import React from "react";
function Footer(){
    const currentYear = new Date().getFullYear();
    return(
    <footer>
        <p>made for fit54045 {currentYear}</p>
    </footer>
    )
}export default Footer;