import React from "react";
import { useTranslation } from '../context/TranslationContext';
import './hero.css';

const Hero = () => {
    const { t } = useTranslation();
    
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">{t('hero.title')}</h1>
                <p className="hero-subtitle">{t('hero.subtitle')}</p>
                <p className="hero-description">
                    {t('hero.description')}
                </p>
            </div>
        </section>
    );
}

export default Hero;