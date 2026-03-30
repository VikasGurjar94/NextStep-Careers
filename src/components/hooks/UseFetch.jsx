import React from 'react'
import { useSession } from '@clerk/clerk-react'
import { useState } from 'react'

const useFetch =  (callBackFunction , options = {}) => {

    const [data , setData] = useState(undefined)
    const [loading , setLoading] = useState(null)
    const [error , setError] = useState(null) ;

    const {session} = useSession() ;

    const fn = async (...args)=>{
        setLoading(true);
        setError(null)

        try {
            const supabaseAccessToken = await session.getToken({ template : "supabase" ,});

            if (!supabaseAccessToken) {
                console.warn(
                    "[useFetch] Clerk returned a null token for template 'supabase'.\n" +
                    "➡ Fix: Go to Clerk Dashboard → JWT Templates → Create a template named exactly 'supabase'.\n" +
                    "   Use the Supabase signing secret from your Supabase project → Settings → API → JWT Secret."
                );
            }

            const response = await callBackFunction(supabaseAccessToken , options ,...args) ;

            setData(response) ;

            return response;


        } catch (error) {
            setError(error) ;
            throw error; // Re-throw so calling code can handle it
        } finally{
            
            setLoading(false)
        }

    }
    return { data, loading, error, fn };
  
}

export default useFetch; 