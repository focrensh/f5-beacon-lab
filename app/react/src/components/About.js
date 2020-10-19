import React, { useState } from 'react';
import bacon_egg from '../images/bacon_egg.gif';
// import './App.css';
import { Alert } from 'reactstrap';
import { Progress, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';


function About() {

  return (
    <div >
        <div className="p-3 my-2 rounded">
        <Toast>
          <ToastHeader>
            About
          </ToastHeader>
          <ToastBody>
            Simple react app for use with testing and ingesting data into F5 Beacon.
          </ToastBody>
        </Toast>
      </div>
    </div>
  );
}

export default About;
