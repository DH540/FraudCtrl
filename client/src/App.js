import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Header from './home/header';
import Hero from './home/hero';
import InputSection from './home/inputSection';
import Description from './home/desc';
import Note from './home/note';
import Footer from './home/footer';
import Results from  './results/results';
import { TranslationProvider } from './context/TranslationContext';
import './App.css';

function App() {
  const [textToReview, setTextToReview] = React.useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/' && location.state?.resetInput) {
      setTextToReview('');
    }
  }, [location]);

  const handleAnalyze = () => {
    navigate('/results', { 
      state: { 
        text: textToReview
      } 
    });
  }

  return (
    <TranslationProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Hero />
              <InputSection 
                textToReview={textToReview}
                onChange={setTextToReview}
                onAnalyze={handleAnalyze} 
              />
              <Description />
              <Note />
              <Footer />
            </>
          } />

          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </TranslationProvider>
  );
}

export default App;
