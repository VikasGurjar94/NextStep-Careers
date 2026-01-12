import React from 'react'
import { Link } from 'react-router-dom'

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Header = () => {
  return (
    <div className='w-full' >
      <nav className='  relative h-20 w-full flex justify-between items-center px-10  '>
        <Link to={'/'} >
          <img className='h-20 ' src="/images/logo.png" alt="logo" />
        </Link>


        <button className='bg-[#4d5d85] h-10 w-25 rounded-xl cursor-pointer hover:outline-2 outline-blue-400 hover:scale-99 text-2xl tracking-tight '>
          Login
        </button>


      </nav>

    </div>
  )
}

export default Header