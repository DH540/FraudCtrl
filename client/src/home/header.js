import React, { useState } from "react";
import axios from 'axios';
import './header.css';

const Header = () => {
    const features = [
      {icon: "/logo1.png", description: 'WebsiteLogo'},
      {icon: "/globe.png", description: 'GlobeIcon'},  
    ];

    const [language, setLanguage] = useState('en');
    const [translations, setTranslations] = useState({});

    const translateText = async (text, targetLang) => {
        if (targetLang === 'en') return text;
        
        try {
            const response = await axios.get(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
            );
            return response.data.responseData.translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            return text;
        }
    };  

    const handleLanguageChange = async (e) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        
        // Translate all navigation links
        const github = await translateText('GitHub', newLang);
        const contact = await translateText('Contact Us', newLang);
        const docs = await translateText('Documentation', newLang);
        
        setTranslations({ github, contact, docs });
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
                            {translations.github || 'GitHub'}
                        </a>
                        <a href="#contact" className="nav-link">
                            {translations.contact || 'Contact Us'}
                        </a>
                        <a href="#documentation" className="nav-link">
                            {translations.docs || 'Documentation'}
                        </a>
                    </nav>

                    <div className="language-selector">
                        <img src={features[1].icon} alt={features[1].description} className="globe-icon" />
                        <select className="language-dropdown" onChange={handleLanguageChange}>
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