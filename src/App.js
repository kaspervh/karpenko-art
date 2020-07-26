import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Gallery from './components/Gallery';
import Media from './components/Media';
import Contact from './components/Contact'
import AboutMe from './components/AboutMe'
import Header from './components/shared/Header';
import Login from './components/Login';
import {useDispatch, useSelector} from 'react-redux';
import {HideModalAction} from './actions/ModalAction'

function App() {
  const dispatch = useDispatch()
  const showModal = useSelector(state => state.ModalReducer);

  const closeModal = () => {
    dispatch(HideModalAction())
  }

  const pageModal = () =>{
    if(showModal === true){
      console.log('showing modal')
      return(
        <div className="modal-background" onClick={e => closeModal()}>
          <div className="modal-box">
            <div className="modal-image"></div>
            <div className="modal-description"></div>
          </div>
        </div>
      )
    }
  }
  
  return (
    
    <Router>
      {pageModal()}
      {/* <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"/>  */}
      <div className="App">
        
        <Header/>
        <div className="container">
          <Switch>
            <Route path='/' exact component={Gallery}/>
            <Route path='/media' component={Media}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/about-me' component={AboutMe}/>
            <Route path='/login' component={Login}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
