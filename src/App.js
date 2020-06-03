import React from 'react';
import './App.css';
import MarkdownPanels from './components/Editor.js';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <hr />
      <div id="markdown-linkcontainer">
        <MarkdownPanels />
      </div>
    </div>
  );
}

export default App;
