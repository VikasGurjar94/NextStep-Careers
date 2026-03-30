import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { getMyJobs } from '../components/api/apiJobs'
import useFetch from '../components/hooks/UseFetch'
import JobCard from '../components/JobCard'
import { Link } from 'react-router-dom'
import { Briefcase } from 'lucide-react'

const MyJobs = () => {
  const { user, isLoaded } = useUser()
  const navigate = useNavigate()

  const {
    data: jobs,
    loading: loadingJobs,
    fn: fnMyJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user?.id,
  })

  useEffect(() => {
    if (isLoaded) {
      if (user?.unsafeMetadata?.role !== 'recruiter') {
        navigate('/jobs')
      }
      if (user?.id) {
        fnMyJobs()
      }
    }
  }, [isLoaded, user?.id])

  if (!isLoaded || loadingJobs) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
  }

  return (
    <div className='mx-20 py-10'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl font-bold'>My Posted Jobs</h1>
        <Link to='/post-job'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition-colors flex items-center gap-2'>
            <Briefcase size={20} />
            Post New Job
          </button>
        </Link>
      </div>
      
      {jobs && jobs.length > 0 ? (
        <div className='py-5 rounded-sm mt-10'>
          {jobs.map((job) => (
            <div key={job.id} className='mb-6'>
              <JobCard
                job={job}
                isMyJob={true}
              />
              <div className='border-3 border-white/20 rounded-lg py-4 px-4 border-t-0 bg-black/20'>
                <div className='flex justify-between items-center mb-3'>
                  <h3 className='text-xl font-semibold'>
                    Applications ({job.applications?.length || 0})
                  </h3>
                  <Link to={`/job/${job.id}`}>
                    <button className='text-blue-400 hover:text-blue-300 underline'>
                      View Details
                    </button>
                  </Link>
                </div>
                {job.applications && job.applications.length > 0 ? (
                  <div className='space-y-2'>
                    {job.applications.slice(0, 3).map((application) => (
                      <div key={application.id} className='flex justify-between items-center p-2 bg-black/30 rounded'>
                        <div>
                          <p className='font-medium'>{application.candidate_name || 'Anonymous'}</p>
                          <p className='text-sm text-gray-400'>
                            Status: <span className={`capitalize ${
                              application.status === 'accepted' ? 'text-green-400' :
                              application.status === 'rejected' ? 'text-red-400' :
                              'text-yellow-400'
                            }`}>
                              {application.status || 'pending'}
                            </span>
                          </p>
                        </div>
                        {application.resume && (
                          <a
                            href={application.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-blue-400 hover:text-blue-300 underline text-sm'
                          >
                            View Resume
                          </a>
                        )}
                      </div>
                    ))}
                    {job.applications.length > 3 && (
                      <p className='text-sm text-gray-400 text-center mt-2'>
                        +{job.applications.length - 3} more applications
                      </p>
                    )}
                  </div>
                ) : (
                  <p className='text-gray-400'>No applications yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center mt-20'>
          <p className='text-xl text-gray-400'>You haven't posted any jobs yet.</p>
          <Link to='/post-job'>
            <button className='mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition-colors'>
              Post Your First Job
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyJobs
