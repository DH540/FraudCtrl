import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [translatedText, setTranslatedText] = useState({});
    const [loading, setLoading] = useState(false);

    const translations = {
        en: {
            header: {
                github: 'GitHub',
                contact: 'Contact Us',
            },
            hero: {
                title: 'FraudCtrl',
                subtitle: 'Your trusted Fake Product Review Checker',
                description: 'Fake reviews cost consumers billions every year. FraudCtrl uses advanced AI models to identify suspicious patterns, bot-generated text, and incentivized reviews — so you always know what is real and what is not.'
            },
            inputSection: {
                placeholder: 'Enter the review text here...',
                analyzeButton: 'Analyze',
                selectModel: 'Select Model'
            },
            description: {
                title: 'How the AI Works',
                feature1: 'Start by pasting any product review text into the input box above. FraudCtrl accepts reviews of up to 100 words, giving the AI enough context to perform a thorough and accurate analysis.',
                feature2: 'Once you click the "Analyze" button, our AI model will process the review text and evaluate its authenticity. The model is trained on a vast dataset of real and fake reviews, allowing it to identify subtle cues and patterns that may indicate fraudulent activity.',
                feature3: 'Within seconds, FraudCtrl delivers a clear verdict on the review\'s authenticity. You will receive a confidence score and key insights to help you decide whether the review can be trusted.'
            },
            note: {
                title: 'Important Note',
                content: 'Please be aware that while our AI system is designed to provide accurate and helpful information, it may occasionally produce incorrect or misleading content. Always verify critical information from reliable sources.'
            },
            footer: {
                title: 'Help us Improve!',
                description: 'We would like to know more from you. Please scan the QR Code for any concerns you\'d like us to address. Happy Shopping!',
                contact: 'ouremail@gmail.com | +63 123 456 7890',
                copyright: '© 2026 FraudCtrl. All rights reserved.'
            },
            results: {
                header: 'The product review you requested for review is',
                verdict: 'Most Likely Fake',
                explanation: 'According to the results of the analysis, the model has detected signs of a usual fake review.',
                credibility: 'Below Credibility Passing Rate'
            }
        }
    };

    const translateText = useCallback(async (text, targetLang) => {
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
    }, []);

    const allEnglishStrings = [
        translations.en.header.github,
        translations.en.header.contact,
        translations.en.header.documentation,
        translations.en.hero.title,
        translations.en.hero.subtitle,
        translations.en.hero.description,
        translations.en.inputSection.placeholder,
        translations.en.inputSection.analyzeButton,
        translations.en.inputSection.selectModel,
        translations.en.description.title,
        translations.en.description.feature1,
        translations.en.description.feature2,
        translations.en.description.feature3,
        translations.en.note.title,
        translations.en.note.content,
        translations.en.footer.title,
        translations.en.footer.description,
        translations.en.footer.contact,
        translations.en.footer.copyright,
        translations.en.results.header,
        translations.en.results.verdict,
        translations.en.results.explanation,
        translations.en.results.credibility
    ];

    const changeLanguage = useCallback(async (newLang) => {
        setLanguage(newLang);
        
        if (newLang === 'en') {
            setTranslatedText({});
            return;
        }

        setLoading(true);
        const translated = {};

        // Translate all strings from the English translations object
        try {
            for (const str of allEnglishStrings) {
                translated[str] = await translateText(str, newLang);
            }
            setTranslatedText(translated);
        } catch (error) {
            console.error('Batch translation error:', error);
        } finally {
            setLoading(false);
        }
    }, [translateText, allEnglishStrings]);

    const t = (key) => {
        // key format: "header.github"
        const keys = key.split('.');
        const englishText = keys.reduce((obj, k) => obj?.[k], translations.en);
        
        if (!englishText) return key;
        if (language === 'en') return englishText;
        
        return translatedText[englishText] || englishText;
    };

    return (
        <TranslationContext.Provider value={{ language, changeLanguage, t, loading }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => {
    const context = React.useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within TranslationProvider');
    }
    return context;
};
