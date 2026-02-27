import React from "react";
import { useTranslation } from '../context/TranslationContext';
import './desc.css';

const Description = () => {
    const { t } = useTranslation();
    const features = [
        {
            icon: "/input.png",
            description: t('description.feature1')
        },
        {
            icon: "/process.png",
            description: t('description.feature2')
        },
        {
            icon: "/approval.png",
            description: t('description.feature3')
        }
    ];

    return (
        <section className="features">
            <div className="features-container">
                <h2 className="section-title">{t('description.title')}</h2>

                <div className="features-grid">
                    {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <div className="feature-icon">
                            <img src={feature.icon} alt="feature icon" />
                        </div>
                        <p className="feature-content">{feature.description}</p>
                    </div>
                ))}
                </div> 
            </div>
        </section>
    );
}  

export default Description;