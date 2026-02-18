import { useLocation } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { useState, useEffect } from 'react';
import './results.css';

import Header from '../home/header';
import Footer from '../home/footer';

function Results() {
  const { t } = useTranslation();
  const location = useLocation();
  const { text } = location.state || { text: "No text provided..." };

  const [score, setScore] = useState(null);
  const [verdict, setVerdict] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const analyze = async () => {
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        });

        if (!response.ok) throw new Error('Server error');

        const data = await response.json();
        setScore(data.score);
        setVerdict(data.verdict);
        setExplanation(data.explanation);
      } catch (err) {
        setError('Failed to analyze the review. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    analyze();
  }, [text]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="results-container">
          <p className="results-header">Analyzing your review...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="results-container">
          <p className="results-header">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="results-container">
        <p className="results-header">{t('results.header')}</p>
        <div className="dashboard-grid">     
          <div className="score-card">
            <div className="circle-chart">
              <svg viewBox="0 0 100 100">
                <path className="circle-bg" d="M18 50 A 32 32 0 1 1 82 50 A 32 32 0 1 1 18 50" />
                <path className="circle-progress" d="M18 50 A 32 32 0 1 1 82 50 A 32 32 0 1 1 18 50" />
              </svg>
              <div className="score-text">{score}</div>
            </div>
            <div>
              <h1 className="verdict-title">{verdict}</h1>
              <p className="verdict-desc">
                The AI has analyzed your review and assessed its authenticity.
              </p>
            </div>
          </div>

          <div className="credibility-scale">
            <div className="scale-marker"></div>
            <div className="scale-bar">
              <div className="scale-line"></div>
            </div>
            <div className="scale-labels">
              <span>100%</span>
              <span className="scale-center-label">{t('results.credibility')}</span>
              <span>100%</span>
            </div>
          </div>

        </div>

        <div className="content-container">
          <div className="text-card fake-theme">
            <p className="card-content">{text}</p>
            <span className="not-editable">*Not Editable</span>
          </div>

          <div>
            <div className="text-card explanation-theme">
              <span className="card-title">Explanation</span>
              <p className="card-content">{explanation}</p>
              <span className="not-editable">*Not Editable</span>
            </div>
            <p className="disclaimer">
              *AI Models can make mistakes. Make sure to verify information with other reliable sources/models.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Results;