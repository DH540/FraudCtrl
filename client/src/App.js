import React from 'react';
import Header from './components/header';
import Hero from './components/hero';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      {/* Other components can be added here */}
    </div>
  );
}

export default App;
