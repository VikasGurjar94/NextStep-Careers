import React, { useEffect } from 'react'
import { Link , useParams, useSearchParams } from 'react-router-dom'
import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { SignIn } from '@clerk/clerk-react';
import { BriefcaseBusiness, Heart} from "lucide-react";

const Header = () => {

    const [search , setSearch] = useSearchParams();

    useEffect(()=>{
      if(search.get('sign-in')){
        setShowSignIn(true)
      }
    } , [search])

  const handleClickOverlay = (e) => {
    if(e.target === e.currentTarget){
      setShowSignIn(false)

      setSearch({});
    }
  }

  const [showSignIn , setShowSignIn] = useState(false)

  return (
    <div className='w-full' >
      <nav className='  relative h-20 w-full flex justify-between items-center px-10  '>
        <Link to={'/'} >
          <img className='h-20 ' src="/images/logo.png" alt="logo" />
        </Link>


        
       <div className='flex gap-8' >
         <SignedOut>
          {/* <SignInButton />
           */}
        <button onClick={()=> {
          setShowSignIn(true)
        }} className='bg-[#4d5d85] h-10 w-25 rounded-xl cursor-pointer hover:outline-2 outline-blue-400 hover:scale-99 text-2xl tracking-tight '>
          Login 
        </button>
        
        </SignedOut>
        <SignedIn>
          {/* add a condition for only to show this to recruter */}
          <Link to={'/post-job'}>
          <button className='  hover:scale-101 cursor-pointer hover:ring-2 ring-white  bg-red-500  font-semibold tracking-tighter h-8 w-20 text-base rounded-2xl '>Post Job</button>
          </Link>
          
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
        </SignedIn>
       </div>


      </nav>

        {showSignIn && <div
        onClick={(e)=> handleClickOverlay(e)}
        className='fixed z-10 inset-0 flex justify-center items-center bg-black/50   '>
          <SignIn
          signUpForceRedirectUrl = '/onboarding' 
          fallbackRedirectUrl = '/onboarding' 
          />
        </div> }

    </div>
  )
}

export default Header