import React from "react";
import './note.css';

const Note = () => {
    const feature = {
        icon: "/exclamation.png",
        description: 'Disclaimer.'
    };
    return (
        <section className="note-section">
            <div className="note-container">
                <img src={feature.icon} alt="note icon" className="note-icon" />
                <h2 className="note-title">Important Note</h2>
                <p className="note-content">
                    Please be aware that while our AI system is designed to provide accurate and helpful information, it may occasionally produce incorrect or misleading content. Always verify critical information from reliable sources.
                </p>
            </div>
        </section>
    );
}

export default Note;