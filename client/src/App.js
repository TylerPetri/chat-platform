import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Galaxy from './components/Galaxy/Galaxy'
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join'
import Snake from './components/Start/Start'
import Crypto from './components/Crypto/crypto'

import './App.css'

const App = () => {

  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
      <Route path="/galaxy" component={Galaxy} />
      <Route path="/snake-game" component={Snake} />
      <Route path="/crypto" component={Crypto} />
    </Router>
  );
}

export default App;
