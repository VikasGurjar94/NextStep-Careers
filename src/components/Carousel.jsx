import React from 'react'
import companyCarouselData from './data/companyCarouselData'

const Carousel = () => {
  return (
    <div className="w-full  bg-[#000b3a] py-5">
      <div className="flex carouselTrack gap-20 items-center justify-start  px-4">
        {companyCarouselData.map((item) => (
          <span key={item.id} className="shrink-0">
            <img className="w-40 " src={item.path} alt={item.name} />
          </span>
        ))}
        {companyCarouselData.map((item) => (
          <span key={item.id} className="shrink-0">
            <img className="w-40 " src={item.path} alt={item.name} />
          </span>
        ))}
      </div>
    </div>
  )
}

export default Carousel