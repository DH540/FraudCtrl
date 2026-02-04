import React from "react";
import './inputSection.css';

const InputSection = ({
    textToReview = "", 
    onChange = () => {}, 
    selectedModel = "", 
    onModelChange = () => {}, 
    onAnalyze = () => {}
}) => {
    const MAX_WORDS = 100;

    const wordCount = textToReview.trim()
        ? textToReview.trim().split(/\s+/).length
        : 0;

    return (
        <section className="input-section">
            <div className="input-container">
                <label className="input-label">Paste the Product Review Text Below</label>

                <div className="textarea-wrapper">
                    <textarea
                        className="review-textarea" 
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
                        value={textToReview}
                        onChange={(e) => onChange(e.target.value)}
                    />

                    <div className="input-footer">
                        <span>{wordCount} / {MAX_WORDS} words</span>
                    </div>
                </div>

                <div className="controls">
                    <select className="model-selector" value={selectedModel} onChange={(e) => onModelChange(e.target.value)}>
                        <option value="">Select Model</option>
                        <option value="lightgbm">LightGBM</option>
                        <option value="xgboost">XGBoost</option>
                        <option value="catboost">CatBoost</option>
                    </select>
                    
                    <button className="analyze-button" onClick={onAnalyze} disabled={!textToReview.trim() || !selectedModel || wordCount > MAX_WORDS}>
                        Analyze
                    </button>
                </div>
            </div>
        </section>
    );
}

export default InputSection;