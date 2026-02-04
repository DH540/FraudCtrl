import React from "react";
import './header.css';

const Header = () => {
    const features = [
      {icon: "/logo1.png", description: 'WebsiteLogo'},  
    ];
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <img src={features[0].icon} alt={features[0].description} className="logo-icon"></img>
                    <span className="logo-text">FraudCtrl</span>
                </div>

                <div className="header-right">
                    <nav className="nav-links">
                        <a href="#github" className="nav-link">GitHub</a>
                        <a href="#contact" className="nav-link">Contact Us</a>
                        <a href="#documentation" className="nav-link">Documentation</a>
                    </nav>

                    <div className="language-selector">
                        <span className="globe-icon">🌐</span>
                        <select className="language-dropdown">
                            <option value="en">EN</option>
                            <option value="es">ES</option>
                            <option value="fr">FR</option>
                            <option value="tl">TL</option>
                            <option value="zh">ZH</option>
                            <option value="ja">JA</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;