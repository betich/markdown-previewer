import React from 'react';
import './App.css';
import MarkdownPanels from './components/Editor.js';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
      <div id="codesection">
        <MarkdownPanels />
      </div>
    </div>
  );
}

export default App;
