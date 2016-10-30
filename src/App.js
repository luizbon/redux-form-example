import React, { Component } from 'react';
import Form from './Form';
import { submitValidation } from './validate';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const submit = (values) => {
  return sleep(1000)
    .then(() => {
      submitValidation(values);
    })
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>
          Redux Form
        </h1>
        <Form onSubmit={submit} />
      </div>
    );
  }
}

export default App;
