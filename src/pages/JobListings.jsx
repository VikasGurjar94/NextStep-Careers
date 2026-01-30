import React, { useEffect , useState } from 'react'
import { getJobs } from '../components/api/apiJobs'
import useFetch from '../components/hooks/UseFetch'
import { data } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners'
import JobCard from '../components/JobCard'


const JobListings = () => {

  const [location , setLocation] = useState('') ;
  const [company_id , setCompany_id] = useState('') ;
  const [searchQuery , setSearchQuery] = useState('') ;
  
  const {isLoaded} = useUser()

  const {
    error: errorJobs,
    data: jobs,
    loading: loadingJobs,
    fn: fnJobs } = useFetch(getJobs , {location, company_id , searchQuery })


  useEffect(() => {
    if(isLoaded) fnJobs()
  }, [isLoaded , location, company_id , searchQuery])

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
  }

  return (
    <div>
      <div className='w-full ' >
        <h1 className='text-center font-bold font-mono text-8xl text-white ' >
          Latest Jobs
        </h1>
      </div>
      {/* {adding filters here} */}
      {loadingJobs &&
         <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
      }
      {
        loadingJobs === false && (
          <div className=' px-10 py-5 rounded-sm mt-20 ' >
            {jobs?.length ? (
              jobs.map((job)=>{
                return <JobCard
                savedInit={job?.saved?.length>0}
                key={job.id}
                 job={job} />
               
              })
            ) : (
              <div>
                No Jobs Found !
              </div>
            )}
          </div>
        )
      }
    </div>
  )
}

export default JobListings