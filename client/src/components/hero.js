import React from "react";
import './hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Welcome to FraudCtrl</h1>
                <p className="hero-subtitle">Your trusted partner in fraud detection and prevention.</p>
                <a href="#get-started" className="hero-button">Get Started</a>
            </div>
        </section>
    );
}