import React, { useState } from 'react'


const accordion = () => {

    const data =  [
    {
      "id": 1,
      "title": "What is HTML?",
      "content": "HTML stands for HyperText Markup Language. It is used to structure web pages."
    },
    {
      "id": 2,
      "title": "What is CSS?",
      "content": "CSS stands for Cascading Style Sheets. It is used to style and layout web pages."
    },
    {
      "id": 3,
      "title": "What is JavaScript?",
      "content": "JavaScript is a programming language used to create dynamic and interactive web content."
    },
    {
      "id": 4,
      "title": "What is React?",
      "content": "React is a JavaScript library for building user interfaces using components."
    },
    {
      "id": 5,
      "title": "What is an Accordion?",
      "content": "An accordion is a UI component that allows users to expand and collapse sections of content."
    }
  ]

  let [count , setCount] = useState([]) ;

  return (
    <div>
        <ul>
        
        {data.map((item)=>{
             return <li onClick={
                ()=>{       

                    if(count.includes(item.id)){
                        setCount((prev)=>{
                            let curr = prev.filter((ele)=>{
                                if(ele === item.id) return false 
                                else return true 
                            })
                            return curr
                        })
                    }
                    else{
                        setCount([...count , item.id])
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
            } className='w-full border-2 border-white text-center py-10 ' key={item.id}>
                {item.title} <br />
                {(count.find((c)=> (c===item.id))) && (item.content)}
            </li>
        
            }
            )}
    </ul>
    </div>
  )
}

export default accordion