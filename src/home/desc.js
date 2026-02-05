import React from "react";
import './desc.css';

const Description = () => {
    const features = [
        {
            icon: "/input.png",
            description: 'Analyze product reviews using advanced machine learning models to gain insights into customer sentiment and feedback'
        },
        {
            icon: "/process.png",
            description: 'Analyze product reviews using advanced machine learning models to gain insights into customer sentiment and feedback'
        },
        {
            icon: "/approval.png",
            description: 'Analyze product reviews using advanced machine learning models to gain insights into customer sentiment and feedback'
        }
    ];

    return (
        <section className="features">
            <div className="features-container">
                <h2 className="section-title">How the AI Works</h2>

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