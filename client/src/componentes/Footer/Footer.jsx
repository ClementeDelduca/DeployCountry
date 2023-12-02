import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import github from "./icone-github-noir.png";
import linkedin from "./logo-linkedin-removebg-preview.png";

function Footer() {
  return (
    <div className="footer">
      <div>
        <a href="https://github.com/ClementeDelduca">
          <img src={github} className="footer-icon-github" alt="" />
          <a href="https://linkedin.com/in/clemente-delduca-6691181a7">
            <img src={linkedin} className="footer-icon-linkedin" alt />
          </a>
        </a>
      </div>
      <div>
        copyright &copy;2023 Pi countries Henry. by{" "}
        <span>Clemente Delduca</span>
      </div>
    </div>
  );
}

export default Footer;
