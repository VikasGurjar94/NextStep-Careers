import React, { useState } from 'react'
import faqData from './data/faq';


const accordion = () => {

  let [count, setCount] = useState([]);

  return (
    <div className='w-full rounded-xl  text-base mt-20 bg-[#000620] ' >
      <ul className='  rounded-2xl ' >

        {faqData.map((item) => {
          return <li
            onClick={
              () => {

                if (count.includes(item.id)) {
                  setCount((prev) => {
                    let curr = prev.filter((ele) => {
                      if (ele === item.id) return false
                      else return true
                    })
                    return curr
                  })
                }
                else {
                  setCount([...count, item.id])
                }

                // let ind = count.indexOf(item.id) ;
                // if(!(ind===-1)){
                //     setCount((prev)=>{
                //         let curr = prev.filter((ele)=>{
                //             if(ele === item.id) return false 
                //             else return true 
                //         })
                //         return curr
                //     })
                // }
                // else{
                //     setCount((p)=> ([...p,item.id])) ;
                // }
              }
            } className='w-full py-5  flex flex-col  justify-around   px-5 rounded-2xl border-b ' key={item.id}>
            <p className=' flex w-full justify-between cursor-pointer  ' >
             <p className='font-semibold w-full hover:underline '>
               {item.question}
             </p>
              
              <span className='text-right' >
                  {(count.find((c) => (c === item.id))) ? ("-") : ("+")}
              </span>
            </p> 
            <p className='' >
              {(count.find((c) => (c === item.id))) && (item.answer)}
            </p>
          </li>

        }
        )}
      </ul>
    </div>
  )
}

export default accordion
