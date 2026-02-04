import React from 'react';
import Header from './components/header';
import Hero from './components/hero';
import InputSection from './components/inputSection';
import Description from './components/desc';
import './App.css';

function App() {
  const [textToReview, setTextToReview] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState("");
  
  const handleAnalyze = () => {
    console.log("Text: ", textToReview);
    console.log("Model: ", selectedModel);
  }

  return (
    <div className="App">
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
      {/* Other components can be added here */}
    </div>
  );
}

export default App;
