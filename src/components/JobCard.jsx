import React, { use, useEffect, useState } from 'react'
import { Heart, MapPinIcon, SpaceIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { saveJob } from './api/apiJobs'
import useFetch from './hooks/UseFetch'
import { useUser } from '@clerk/clerk-react'


const JobCard = ({ job,
  savedInit = false,
  onJobAction = () => { },
  isMyJob = false,

}) => {

  const [saved , setSaved] = useState(savedInit)
  const {
    error: errorSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
    fn: fnSavedJob } = useFetch(saveJob,{
      alreadySaved : saved,
    })

    const {user} = useUser()

    useEffect(()=>{
      if(savedJob!== undefined) setSaved(savedJob?.length > 0) ;
    },[savedJob])
 
     async function handleSaveJob(){
      await fnSavedJob ( {
        user_id : user.id , 
        job_id : job.id
      })
      onSavedJob() ;
    }

  return (
    <div className='border-3 border-white/20 rounded-lg py-5 border-b-0  px-4 ' >
      <div className='flex  justify-between items-center w-full ' >
        <h1 className='text-3xl cursor-pointer font-sans font-semibold  ' >
          {job.title}
        </h1>
        {!isMyJob && (
          <div>
            <Trash2Icon stroke='white' className=' text-white cursor-pointer' />
          </div>
        )}
      </div>
      <div className='flex justify-between my-2 ' >
        {
          (job.company) && <img src={job.company.logo_url} className='h-6' alt="" />
        }
        <div className='flex gap-2 items-center  ' >
          <MapPinIcon size={19} /> <span className='capitalize'>{job.location}</span>
        </div>
      </div>
      <hr className='opacity-50 my-2 ' />
      <div>
        {job.description.substring(0, job.description.indexOf("."))}
      </div>
      <div className='flex justify-between gap-5 items-center ' >
        <Link className='border rounded-xl border-amber-50 flex-1 flex bg-black/20 mt-3  ' to={"/google.com"} >
          <button className='w-full my-2 cursor-pointer text-2xl text-center ' >
            More Details
          </button>
        </Link>
        {!isMyJob &&
        <button
        onClick={handleSaveJob}
        disabled={loadingSavedJob}
        className='cursor-pointer ' >
          {saved ? 
          <Heart stroke='red' fill='red' /> : 
          <Heart />
        }
        </button>
        }
      </div>
    </div>
  )
}

export default JobCard