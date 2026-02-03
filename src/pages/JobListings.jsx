import React, { useEffect, useState } from 'react'
import { getJobs } from '../components/api/apiJobs'
import useFetch from '../components/hooks/UseFetch'
import { useUser } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners'
import JobCard from '../components/JobCard'
import { getCompanies } from '../components/api/apiCompanies'
import { State } from 'country-state-city'


const JobListings = () => {

  const [location, setLocation] = useState('');
  const [company_id, setCompany_id] = useState('');
  const [search_query, setSearchQuery] = useState('');

  const { isLoaded } = useUser()

  const {
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies)

  useEffect(() => {
    if (isLoaded) fnCompanies()
  }, [isLoaded])

  const {
    error: errorJobs,
    data: jobs,
    loading: loadingJobs,
    fn: fnJobs } = useFetch(getJobs, { location, company_id, search_query })


  useEffect(() => {
    if (isLoaded) fnJobs()
  }, [isLoaded, location, company_id, search_query])

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
  }

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    let query = formData.get("search-query")
    if (query) setSearchQuery(query)
    console.log(query)
  }

  return (
    <div className='mx-20' >
      <div className='w-full ' >
        <h1 className='text-center font-bold font-mono text-8xl text-white ' >
          Latest Jobs
        </h1>
      </div>

      <form className='w-full mb-5 flex items-center gap-3  mt-15  ' onSubmit={(e) => handleSearch(e)} >
        <input type="text" name='search-query'
          placeholder='search companies here ...'
          className='border-3 py-2 h-full rounded-sm px-4 text-md flex flex-1 border-white/20  ' />
        <button type='submit' className='border border-white/20 active:ring-1 bg-blue-500 text-white cursor-pointer px-5 rounded-sm py-2 ' >
          Search
        </button>
      </form>

      <div>
        <select
          name="filter"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className="border-3 bg-black py-2 h-full rounded-sm px-4 text-md border-white/20"
        >
          {/* Placeholder */}
          <option className='text-md/90' value="" disabled>
            Search by state
          </option>
          {
            State.getStatesOfCountry("IN").map(({ name }) => {
              return <option key={name} value={name}>{name}</option>
            })
          }
        </select>
      </div>

      {loadingJobs &&
        <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
      }
      {
        loadingJobs === false && (
          <div className='  py-5 rounded-sm mt-10 ' >
            {jobs?.length ? (
              jobs.map((job) => {
                return <JobCard
                  savedInit={job?.saved?.length > 0}
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