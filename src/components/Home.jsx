import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import ButtonMain from './ButtonMain'
import Carousel from './Carousel'
const Home = () => {

 

  return (
    <div className=' flex justify-center items-center flex-col w-full h-full ' >
      <Header/>
      <main className='flex flex-col    gap-10   '>
        <section className='text-center  flex flex-col items-center justify-center gap-10  mt-45 '>
          <h1 className='capitalize relative  text-[6vw]  flex flex-col items-center justify-center  text-clip   tracking-tighter font-bold leading-20 ' >find your dream job
            <span className=' flex'>
              <h1 className='inline'>with</h1>
              <img className='h-[7vw] ' src="/images/logo.png" alt="" />
            </span>
            </h1>
            <h2 className='font-medium text-xl text-slate-300 ' >
              Explore thousands of job openings or find a perfect candidate
            </h2>
            <div className='flex mt-7 gap-10' >
              
              <Link to='/jobs' >
              <ButtonMain  textContent="Find a Job" bgColor="#2b7fff" />
              </Link>

              <Link to='/post-job' >
              <ButtonMain textContent="Post a Job" bgColor="#fb2c36" />
              </Link>

              
            </div>
        </section>



        <section className=' mt-30 overflow-x-hidden'>
          <Carousel />
        </section>

      </main>
    </div>
  )
}

export default Home