import React from 'react'

const ButtonMain = (props) => {
  return (
    
        <button style={{backgroundColor: props.bgColor , color : (props.textColor) ? (props.textColor) : ('white') }} className=' text-3xl hover:scale-101 cursor-pointer hover:ring-2 ring-white  bg-red-500  font-semibold tracking-tighter w-50 h-22  rounded-2xl '>{props.textContent}</button>
    
  )
}

export default ButtonMain