import React from "react";
import './footer.css';

const Footer = () => {
    const feature = {
        icon: "/qrcode.png",
        description: 'QRCode for feedback.'
    };
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <h3 className="footer-title">Help us Improve!</h3>
                    <p className="footer-description">
                        We would like to know more from you. Please scan the QR Code for any 
                        concerns you'd like us to address. Happy Shopping!
                    </p>
                    <p className="footer-contact">
                        email@gmail.com | +63 123 456 7890
                    </p>
                </div>

                <div className="footer-right">
                    <img src="/qr.png" alt="QR Code" className="qr-image" />
                    <p className="footer-text">© 2024 FraudCtrl. All rights reserved.</p>
                </div>   
            </div>     
        </footer>
    );
}

export default Footer;