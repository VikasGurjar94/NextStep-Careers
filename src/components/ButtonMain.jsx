import React from 'react'

const ButtonMain = (props) => {
  return (
    
        <button style={{backgroundColor: props.bgColor , color : (props.textColor) ? (props.textColor) : ('white') }} className='border  hover:scale-101 cursor-pointer hover:ring-2 ring-white  bg-red-500 border-slate-200 font-semibold tracking-tighter w-50 h-22 text-3xl rounded-2xl '>{props.textContent}</button>
    
  )
}

export default ButtonMain