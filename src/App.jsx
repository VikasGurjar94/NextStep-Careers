import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/home'
import Onboarding from './pages/Onboarding'
import JobListings from './pages/JobListings'
import PostJob from './pages/PostJob'
import Saved from './pages/Saved'
import MyJobs from './pages/MyJobs'
// import JobPage from './pages/JobPage'
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';



const App = () => {
  return (
    <div>
      <div className='gradient '>
        <main className='min-h-screen  text-white container '>
          {/* <Header/> */}
          <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path='/jobs' element={<JobListings />} />
            <Route path='/onboarding' element={<Onboarding />} />
            {/* <Route path='/job/:id' element={<JobPage />} /> */}
            <Route path='/saved-job' element={<Saved />} />
            <Route path='/post-job' element={<PostJob />} />
            <Route path='/my-jobs' element={<MyJobs />} />
          </Routes>
        </main>

        <footer className="footer h-[10vh] flex justify-center items-center mt-15 text-white bg-gray-800">
        Made with <span className='text-[#ec4899] text-[15px] align-baseline '> ❤ </span> by Vikas Gurjar  
      </footer>
      </div>

      
     
    </div>
  )
}

export default App
