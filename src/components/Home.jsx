import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import ButtonMain from './ButtonMain'
import Carousel from './Carousel'
import Accordion from './accordion'
const Home = () => {



  return (
    <div className=' flex justify-center items-center flex-col w-full h-full ' >
      <Header />
      <main className='flex flex-col px-20 py-5 gap-10   '>
        {/* <section className='text-center  flex flex-col items-center justify-center gap-10  mt-45 '>
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
              <ButtonMain textContent="Find a Job" bgColor="#2b7fff" />
            </Link>

            <Link to='/post-job' >
              <ButtonMain textContent="Post a Job" bgColor="#fb2c36" />
            </Link>


          </div>
        </section>
        <section className=' mt-30 overflow-x-hidden'>
          <Carousel />
        </section>

        <section className='flex flex-col justify-center items-center' >
          <img className='h-screen' src="/images/banner.png" alt='banner_image' />
          <div className=' w-full mt-20 gap-20 flex justify-between items-center ' >
            <div className='border-2 bg-[#020617] w-1/2 rounded-xl px-8 py-5 border-slate-500 '>
              <h1 className='text-3xl capitalize font-semibold font-mono tracking-tight  ' >for job seekers</h1> <br />
              <h3 className='text-xl  ' >Search and apply for jobs, track applications, and more.</h3>
            </div>
            <div className='border-2 bg-[#020617] w-1/2 rounded-xl px-8 py-5 border-slate-500 ' >
              <h1 className='text-3xl capitalize font-semibold font-mono tracking-tight  '>for employers</h1> <br />
              <h3 className='text-xl  '>Post jobs, manage applications, and find the best candidates.</h3>
            </div>
          </div>
        </section> */}
         
         {/* accordion */}
        <section>
          <Accordion/>
        </section>

      </main>
    </div>
  )
}

export default Home