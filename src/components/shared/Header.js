import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return(
    <div className="header">
      <div className="header-left"></div>
      <div className="header-center"><h1>karpenko art</h1></div>
      <div className="header-right">
        <Link to='/' className='navigation-element'>Home</Link>
        <Link to='/media' className='navigation-element'>Media</Link>
        <Link to='/about-me' className='navigation-element'>About me</Link>
        <Link to='/contact' className='navigation-element'>Contact</Link>
      </div>
    </div>
  )
}

export default Header;