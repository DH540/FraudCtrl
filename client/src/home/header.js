import React from "react";
import { useTranslation } from '../context/TranslationContext';
import './header.css';

const Header = () => {
    const { t, language, changeLanguage } = useTranslation();
    const features = [
      {icon: "/logo1.png", description: 'WebsiteLogo'},
      {icon: "/globe.png", description: 'GlobeIcon'},  
    ];

    const handleLanguageChange = (e) => {
        changeLanguage(e.target.value);
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <img src={features[0].icon} alt={features[0].description} className="logo-icon"></img>
                    <span className="logo-text">FraudCtrl</span>
                </div>

                <div className="header-right">
                    <nav className="nav-links">
                        <a href="https://github.com/DH540/FraudCtrl/tree/main" className="nav-link">
                            {t('header.github')}
                        </a>
                        <a href="#contact" className="nav-link">
                            {t('header.contact')}
                        </a>
                        <a href="#documentation" className="nav-link">
                            {t('header.documentation')}
                        </a>
                    </nav>

                    <div className="language-selector">
                        <img src={features[1].icon} alt={features[1].description} className="globe-icon" />
                        <select className="language-dropdown" value={language} onChange={handleLanguageChange}>
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