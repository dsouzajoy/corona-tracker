import React from 'react';
import './App.css';
import Home from "./components/Home";
import News from "./components/News";
import {Switch, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/news" component={News} />
      </Switch>
    </div>
  );
}

export default App;
