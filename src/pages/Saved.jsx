import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners'
import { getSavedJobs } from '../components/api/apiJobs'
import useFetch from '../components/hooks/UseFetch'
import JobCard from '../components/JobCard'

const Saved = () => {
  const { user, isLoaded } = useUser()

  const {
    data: savedJobsData,
    loading: loadingSaved,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs, {
    user_id: user?.id,
  })

  useEffect(() => {
    if (isLoaded && user?.id) {
      fnSavedJobs()
    }
  }, [isLoaded, user?.id])

  if (!isLoaded || loadingSaved) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
  }

  const savedJobs = savedJobsData?.map(item => item.job) || []

  return (
    <div className='mx-20 py-10'>
      <h1 className='text-4xl font-bold mb-8 text-center'>Saved Jobs</h1>
      
      {savedJobs.length > 0 ? (
        <div className='py-5 rounded-sm mt-10'>
          {savedJobs.map((job) => {
            if (!job) return null
            return (
              <JobCard
                savedInit={true}
                key={job.id}
                job={job}
              />
            )
          })}
        </div>
      ) : (
        <div className='text-center mt-20'>
          <p className='text-xl text-gray-400'>No saved jobs yet.</p>
          <p className='text-gray-500 mt-2'>Start saving jobs you're interested in!</p>
        </div>
      )}
    </div>
  )
}

export default Saved
