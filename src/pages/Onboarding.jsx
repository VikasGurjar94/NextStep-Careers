import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { BarLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Onboarding = () => {

  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const roleCheck = user?.unsafeMetadata?.role;
    if (roleCheck) {
      navigate(roleCheck === "candidate" ? "/jobs" : "/post-job")
    }
  }, [user])

   const handleRoleSelection = (role) => {
    user.update({
      unsafeMetadata: { role },
    })
      .then(() => navigate(role === "candidate" ? "/jobs" : "/post-job"))
      .catch((err) => console.log(err));
  }

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
  }

  return (
    <div className='w-full h-ful flex flex-col  mt-60 justify-center items-center  ' >
      <div className='mb-10' >
        <h1 className='text-7xl tracking-wider font-extrabold ' >I am a... </h1>
      </div>
      <div className='flex gap-5 ' >
        <button
          onClick={() => handleRoleSelection("candidate")}
          className='w-65 h-25 bg-[#2b7fff] capitalize text-2xl hover:scale-101 cursor-pointer hover:ring-2 ring-white  font-semibold rounded-sm ' >candidate</button>
        <button
          onClick={() => handleRoleSelection("recruiter")}
          className='w-65 h-25 bg-[#fb2c36] capitalize text-2xl hover:scale-101 cursor-pointer hover:ring-2 ring-white  font-semibold rounded-sm '>recruiter</button>
      </div>
    </div>
  )
}

export default Onboarding