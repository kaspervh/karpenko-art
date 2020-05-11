import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Gallery from './components/Gallery';
import Media from './components/Media';
import Contact from './components/Contact'
import AboutMe from './components/AboutMe'
import Header from './components/shared/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <div className="container">
          <Switch>
            <Route path='/' exact component={Gallery}/>
            <Route path='/media' component={Media}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/about-me' component={AboutMe}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
