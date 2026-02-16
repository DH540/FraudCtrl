import { useLocation } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import './results.css';

import Header from '../home/header';
import Footer from '../home/footer';

function Results() {
  const { t } = useTranslation();
  const location = useLocation();
  const { text, model } = location.state || { text: "No text provided...", model: "Unknown" };

  // Hardcoded values for now
  const score = 80;
  const verdict = "Most Likely Fake";
  const explanation = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et dolor posuere, semper magna faucibus, molestie metus. Curabitur et mi.";

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
                According to the results of the <strong>({model || 'used model'})'s</strong> analysis,<br/>
                the model has detected signs of a usual fake review.
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