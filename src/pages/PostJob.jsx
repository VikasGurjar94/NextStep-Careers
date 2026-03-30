import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners'
import { createJob } from '../components/api/apiJobs'
import { getCompanies } from '../components/api/apiCompanies'
import useFetch from '../components/hooks/UseFetch'
import { State } from 'country-state-city'
import MDEditor from '@uiw/react-md-editor'

const PostJob = () => {
  const { user, isLoaded } = useUser()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    company_id: '',
    requirements: '',
  })

  const {
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies)

  const {
    loading: loadingCreate,
    error: createError,
    fn: fnCreateJob,
  } = useFetch(createJob)

  useEffect(() => {
    if (isLoaded) {
      if (user?.unsafeMetadata?.role !== 'recruiter') {
        navigate('/jobs')
      }
      fnCompanies()
    }
  }, [isLoaded, user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRequirementsChange = (value) => {
    setFormData(prev => ({
      ...prev,
      requirements: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.location || !formData.company_id || !formData.requirements) {
      alert('Please fill in all fields')
      return
    }

    const jobData = {
      ...formData,
      recruiter_id: user.id,
      isOpen: true,
    }

    try {
      const result = await fnCreateJob(jobData)
      
      if (result && result.length > 0) {
        alert('Job posted successfully!')
        navigate('/my-jobs')
      } else if (result === null) {
        // createJob returned null — check console for Supabase error
        alert('Failed to post job. Check the browser console (F12) for the Supabase error details.')
      } else {
        alert('Job posted!')
        navigate('/my-jobs')
      }
    } catch (error) {
      console.error('Error posting job:', error)
      const errorMsg = error?.message || error?.toString() || 'Unknown error occurred'
      alert(`Failed to post job: ${errorMsg}`)
    }
  }

  if (!isLoaded || loadingCreate) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
  }

  return (
    <div className='mx-20 py-10'>
      <h1 className='text-4xl font-bold mb-8 text-center'>Post a New Job</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 max-w-3xl mx-auto'>
        <div>
          <label className='block text-lg mb-2'>Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Senior Software Engineer"
            className='w-full px-4 py-2 rounded-md bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>

        <div>
          <label className='block text-lg mb-2'>Company</label>
          <select
            name="company_id"
            value={formData.company_id}
            onChange={handleChange}
            className='w-full px-4 py-2 rounded-md bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          >
            <option value="">Select a company</option>
            {companies?.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-lg mb-2'>Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className='w-full px-4 py-2 rounded-md bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          >
            <option value="">Select a state</option>
            {State.getStatesOfCountry("IN").map(({ name }) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-lg mb-2'>Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the job role, responsibilities, and what makes it exciting..."
            rows="6"
            className='w-full px-4 py-2 rounded-md bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
            required
          />
        </div>

        <div>
          <label className='block text-lg mb-2'>Requirements</label>
          <div className='border border-white/20 rounded-md'>
            <MDEditor
              value={formData.requirements}
              onChange={handleRequirementsChange}
              preview="edit"
              data-color-mode="dark"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loadingCreate}
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loadingCreate ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  )
}

export default PostJob
