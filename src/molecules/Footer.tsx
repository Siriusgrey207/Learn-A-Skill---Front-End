import Logo from "../quarks/Logo";
import Navigation from "./Navigation";

import XIcon from "../icons/XIcon";
import FacebookIcon from "../icons/FacebookIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import NDZNIcon from "../icons/NDZNIcon";

export default function Footer() {
    return (
        <div id="ndzn-footer">
            <div className="footer__main">
                <div className="container">
                    <div className="footer__logo">
                        <Logo />
                        <div className="footer__logo__text">
                            <h6>© Copyright 2024. Learn A Skill</h6>
                            <span>Uniting teachers and learners</span>
                        </div>
                    </div>
                    <div className="footer__links">
                        <Navigation className="navigation-container--footer" />
                    </div>
                </div>
            </div>
            <div className="footer__socials">
                <div className="container">
                    <div className="socials__left">
                        <a href="/" target="_blank" className="socials-link">
                            <XIcon />
                        </a>
                        <a href="/" target="_blank" className="socials-link">
                            <FacebookIcon />
                        </a>
                        <a href="/" target="_blank" className="socials-link">
                            <LinkedInIcon />
                        </a>
                    </div>
                    <div className="socials__right">
                        <a href="/" target="_blank" id="#tm">
                            <span>In colaboration with</span>
                            <NDZNIcon />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
