import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import AuthRouter from './components/AuthRouter';
class App extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div>
        <AuthRouter/>
      </div>
    );
  }
}

export default App;
