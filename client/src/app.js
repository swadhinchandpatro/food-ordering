import ReactDom from 'react-dom';
import React from 'react';

const App = () => {
  return <h1>Hello</h1>
}

const rootNode = document.getElementById('root');
ReactDom.render(<App />, rootNode);