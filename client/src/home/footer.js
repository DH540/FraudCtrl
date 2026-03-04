import React from "react";
import { useTranslation } from '../context/TranslationContext';
import './footer.css';

const Footer = () => {
    const { t } = useTranslation();
    const feature = {
        icon: "/qrcode.png",
        description: 'QRCode for feedback.'
    };
    return (
        <footer className="footer" id="contact">
            <div className="footer-container">
                <div className="footer-left">
                    <h3 className="footer-title">{t('footer.title')}</h3>
                    <p className="footer-description">
                        {t('footer.description')}
                    </p>
                    <p className="footer-contact">
                        {t('footer.contact')}
                    </p>
                </div>

                <div className="footer-right">
                    <img src="/qr-code.png" alt="QR Code" className="qr-image" />
                    <p className="footer-text">{t('footer.copyright')}</p>
                </div>   
            </div>     
        </footer>
    );
}

export default Footer;