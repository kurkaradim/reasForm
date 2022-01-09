import React from 'react';
import SignupForm from './components/SignupForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
    <div className='App'>
      <SignupForm />
    </div>
    )
    
    
  }
}

export default App;
