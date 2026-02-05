import React from "react";
import './hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">FraudCtrl</h1>
                <p className="hero-subtitle">Your trusted Fake Product Review Checker</p>
                <p className="hero-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum euismod velit, quis auctor massa pellentesque tincidunt. Maecenas eu finibus lectus, quis tristique lectus. Donec vel blandit orci. Mauris pharetra.
                </p>
            </div>
        </section>
    );
}

export default Hero;