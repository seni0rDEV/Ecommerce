import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import img from '../../assets/img.png'



const Navbar = () => {
  return (
    <div className='navbar'>
       <img src={navlogo} alt="" className="nav-logo" /> 
       <img src={img} className='nav-profile' alt='' /> 
       
    </div>
  )
}

export default Navbar