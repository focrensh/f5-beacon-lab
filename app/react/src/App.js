import React, { useState } from 'react'
import logo from './images/beacon.png'
// import './App.css';
import { Alert } from 'reactstrap'
import Navi from './components/Navi'
import About from './components/About'
import Configure from './components/Configure'
import Home from './components/Home'
import { Progress, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {


  const [delay, setDelay] = useState({delay: 0});


  return (
    <div className="App">
      <header className="App-header">
        <Navi />
      </header>
      <Router>
        <body>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/configure" component={Configure} />
          </Switch>
        </body>
      </Router>
        {/* <div className="text-center">
          <img src={logo} style={{width: 60}}  alt="logo" />
        </div> */}
    </div>
  );
}


export default App;
