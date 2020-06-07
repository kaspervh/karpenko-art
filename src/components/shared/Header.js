import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  const [menuOpen, setmenuOpen] = useState(false)
  
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

  return(
    <div className="header">
      <div className="header-left"><h1>karpenko art</h1></div>
      <div className="header-right">
        <div className="navbar" >
          <div className="toggle-button" onClick={e => menuOpen === false ? setmenuOpen(true) : setmenuOpen(false)}>
            <div className="sandwitch" style={setFirstBar()}></div>
            <div className="sandwitch" style={setSecondBar()}></div>
            <div className="sandwitch" style={setThirdBar()}></div>
          </div>
          <Link to='/' className='navlink' style={navigationVisibility()}>Home</Link>
          <Link to='/media' className='navlink' style={navigationVisibility()}>Media</Link>
          <Link to='/about-me' className='navlink' style={navigationVisibility()}>About me</Link>
          <Link to='/contact' className='navlink' style={navigationVisibility()}>Contact</Link>
        </div>
        
      </div>
    </div>
  )
}

export default Header;