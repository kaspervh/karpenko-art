import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {LogOutCurrentUserAction} from '../../actions/CurrentUserAction';
import {Link} from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const [menuOpen, setmenuOpen] = useState(false);
  const currentUser = useSelector(state => state.CurrentUserReducer);
  
  const setFirstBar = () => {
    if(menuOpen === true){return({transform: 'rotate(29deg)', top: '4px' })}; 
  }
  
  const setSecondBar = () => {
    if(menuOpen === true){return({transform: 'rotate(90deg)', right: '20px', top: '2px' })}; 
  }

  const setThirdBar = () => {
    if(menuOpen === true){return({transform: 'rotate(-29deg)' })}; 
  }

  const navigationVisibility = ()=> {
    if(menuOpen === true){return({opacity: 1, pointerEvents: 'auto'})}
  }

  const logOutUser = () => dispatch(LogOutCurrentUserAction());

  return(
    <div className="header">
      {console.log(currentUser)}
      <div className="header-left"><h1>karpenko art</h1></div>
      <div className="header-right">
        <div className="navbar" >
          <div className="toggle-button" onClick={e => menuOpen === false ? setmenuOpen(true) : setmenuOpen(false)}>
            <div className="sandwitch" style={setFirstBar()}></div>
            <div className="sandwitch" style={setSecondBar()}></div>
            <div className="sandwitch" style={setThirdBar()}></div>
          </div>
          <Link to='/' className='navlink' style={navigationVisibility()}>Home</Link>
          {console.log(currentUser)}
          {currentUser.message === 'user is logged in' ? 
            <div className='navlink' style={navigationVisibility()} onClick={e =>logOutUser()}>Log Out</div>: ''
          }
          <Link to='/media' className='navlink' style={navigationVisibility()}>Media</Link>
          <Link to='/about-me' className='navlink' style={navigationVisibility()}>About me</Link>
          <Link to='/contact' className='navlink' style={navigationVisibility()}>Contact</Link>
        </div>
        
      </div>
    </div>
  )
}

export default Header;