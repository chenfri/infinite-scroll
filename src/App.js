import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ImageDetails from './components/ImageDetails/ImageDetails'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-sticky-header/styles.css';
import Home from './components/Home'
import React from 'react';
import './App.css';


const App = () =>{
  
// check branch
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/imageDetails/:id" component={ImageDetails} />
          {/* <Route  path="/" component={Home}/> */}
        </Switch>
      </div>
    </Router>

  );
  
}

export default App;
