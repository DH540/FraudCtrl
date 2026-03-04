import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { useState, useEffect } from 'react';
import { analyzeReview } from '../services/api';
import './results.css';

import Header from '../home/header';
import Footer from '../home/footer';

function Results() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { text } = location.state || { text: "No text provided..." };

  const [score, setScore] = useState(null);
  const [verdict, setVerdict] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine color class based on score
  const getScoreColor = (score) => {
    if (score < 33) return 'legitimate';
    if (score < 66) return 'suspicious';
    return 'fraudulent';
  };

  // Calculate circle progress offset (0-251 for full circumference)
  const getCircleOffset = (score) => {
    if (!score && score !== 0) return 251;
    return 251 * (1 - score / 100);
  };

  // Calculate marker position (0-100%) - inverted so high fraud score goes left
  const getMarkerPosition = (score) => {
    if (!score && score !== 0) return 50;
    return 100 - score; // Inverted: high fraud = left (red), low fraud = right (green)
  };

  useEffect(() => {
    const analyze = async () => {
      try {
        const result = await analyzeReview(text);
        const analysis = result.analysis;
        
        setScore(analysis.fraudScore);
        setVerdict(analysis.isFraudulent ? 'Likely Fraudulent' : 'Likely Legitimate');
        setExplanation(
          `Confidence: ${analysis.confidence}%\n\nIndicators: ${analysis.indicators.length > 0 ? analysis.indicators.join(', ') : 'None detected'}\n\nAnalysis: ${analysis.reasoning}`
        );
      } catch (err) {
        console.error('Analysis error:', err);
        setError(err.message || 'Failed to analyze the review. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (text) {
      analyze();
    }
  }, [text]);

  const handleAnalyzeNewText = () => {
    navigate('/', { state: { resetInput: true } });
  };

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
          <div className="results-actions">
            <button className="new-analysis-button" onClick={handleAnalyzeNewText}>
              Analyze New Text
            </button>
          </div>
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
            <div className={`circle-chart ${getScoreColor(score)}`}>
              <svg viewBox="0 0 100 100">
                <path className="circle-bg" d="M18 50 A 32 32 0 1 1 82 50 A 32 32 0 1 1 18 50" />
                <path
                  className="circle-progress"
                  d="M18 50 A 32 32 0 1 1 82 50 A 32 32 0 1 1 18 50"
                  style={{ strokeDashoffset: getCircleOffset(score) }}
                />
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
            <div
              className="scale-marker"
              style={{ left: `${getMarkerPosition(score)}%` }}
            ></div>
            <div className="scale-bar">
              <div className="scale-line" 
              style={{ left: `${getMarkerPosition(score)}%` }}
            ></div>
            </div>
            <div className="scale-labels">
              <span>0%</span>
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

        <div className="results-actions">
          <button className="new-analysis-button" onClick={handleAnalyzeNewText}>
            Analyze New Text
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Results;
