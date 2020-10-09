import React, { useState } from 'react';
import logo from './beacon.png';
// import './App.css';
import { Alert } from 'reactstrap';
import Navi from './components/Navi'
import Remotedata from './components/Remotedata'
import { Progress, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


function App() {


  const [delay, setDelay] = useState({delay: 0});


  return (
    <div className="App">
      <header className="App-header">
        <Navi />
      </header>

      <body>

        <Button color="primary">Delay</Button>

        <Form>
          <FormGroup>
          <Label for="exampleNumber">Number</Label>
          <Input onChange={(evt) => { console.log(evt.target.value); }}
            type="number"
            name="number"
            id="exampleNumber"
            placeholder="0"
          />
          </FormGroup>
        </Form>

        <div className="text-center">
          <img src={logo}  alt="logo" />
        </div>
        <div className="text-center">75%</div>
        <Progress value={75} />


        <Remotedata />
      </body>
    </div>
  );
}

export default App;
