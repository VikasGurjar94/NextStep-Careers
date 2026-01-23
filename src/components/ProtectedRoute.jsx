import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { BarLoader } from 'react-spinners'
const ProtectedRoute = ({children}) => {

    const {isSignedIn , user , isLoaded} = useUser() ;

    const {pathname} = useLocation() ;

    if(!isLoaded){
        return <BarLoader/>
    }

    if(!isSignedIn && isSignedIn !== undefined){
        return <Navigate to={"/?sign-in=true"} />
    }

    if( pathname !== '/onboarding' && user !== undefined && !user?.unsafeMetadata?.role){
           return <Navigate to={'/onboarding'}/>
    }

  return children
}

export default ProtectedRoute