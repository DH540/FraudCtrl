import React from 'react';
import Header from './home/header';
import Hero from './home/hero';
import InputSection from './home/inputSection';
import Description from './home/desc';
import Note from './home/note';
import Footer from './home/footer';
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
      <Note />
      <Footer />
    </div>
  );
}

export default App;
