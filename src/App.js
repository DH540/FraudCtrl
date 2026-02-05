import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from './home/header';
import Hero from './home/hero';
import InputSection from './home/inputSection';
import Description from './home/desc';
import Note from './home/note';
import Footer from './home/footer';
import Results from  './results/results';
import './App.css';

function App() {
  const [textToReview, setTextToReview] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState("");
  
  const navigate = useNavigate();

  const handleAnalyze = () => {
    console.log("Navigating to results...");
    
    navigate('/results', { 
      state: { 
        text: textToReview, 
        model: selectedModel 
      } 
    });

    console.log("Text: ", textToReview);
    console.log("Model: ", selectedModel);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Hero />
            <InputSection 
              textToReview={textToReview}
              onChange={setTextToReview}
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
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
  );
}

export default App;
