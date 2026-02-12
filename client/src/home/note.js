import React from "react";
import { useTranslation } from '../context/TranslationContext';
import './note.css';

const Note = () => {
    const { t } = useTranslation();
    const feature = {
        icon: "/exclamation.png",
        description: 'Disclaimer.'
    };
    return (
        <section className="note-section">
            <div className="note-container">
                <img src={feature.icon} alt="note icon" className="note-icon" />
                <h2 className="note-title">{t('note.title')}</h2>
                <p className="note-content">
                    {t('note.content')}
                </p>
            </div>
        </section>
    );
}

export default Note;