import React from 'react'
import { Link } from 'react-router-dom'

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Header = () => {
  return (
    <div>
        <nav className=' border-2 h-20 w-full flex justify-between items-center px-10  '>
            <Link>
                <img className='h-50 mt-5 border-2 ' src="/images/logo.png" alt="logo" />
            </Link>

            
                 <button className='bg-[#182543] h-10 w-25 rounded-2xl cursor-pointer hover:outline-2 outline-blue-400 hover:scale-105 text-2xl tracking-wider '> 
                   Login
                </button>
            
        </nav>
    </div>
  )
}

export default Header