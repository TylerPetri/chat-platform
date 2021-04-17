import React from 'react';

import Chat from './components/Chat/Chat';
import Private from './components/Join/JoinPub';
import Public from './components/Join/JoinPrivate';
import Header from './components/NavBar/Header';
import Section from './components/NavBar/Section';
import ChatSelection from './components/ChatSelection/ChatSelection'

import { useStoreContext } from './utils/GlobalStore'

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {

  const [{ rightMarg }, dispatch] = useStoreContext();

  function toggleMenu() {
    rightMarg === false
      ? dispatch({ type: "NAV_OPEN" })
      : dispatch({ type: "NAV_CLOSE" });
  }
  function closeNav() {
    dispatch({ type: "NAV_CLOSE" });
  }

  return (
    <Router>
      <Header toggleMenu={toggleMenu} closeNav={closeNav}>
        <Section />
      </Header>
      <div
        className="app"
        style={{
          opacity: rightMarg ? "0.4" : "1",
        }}
        onMouseDown={() => dispatch({ type: "NAV_CLOSE" })}
      >
        <div className="appBg">
          <div
            className="appbody"
            style={{ marginRight: rightMarg ? "250px" : "0" }}
          >
      <Route path="/" exact component={Public} />
      <Route path="/chat" component={Chat} />
      <Route path="/private" component={Chat} />
      <Route path="/public" component={Public} />

          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
