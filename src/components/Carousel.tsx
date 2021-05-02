import React from "react"
import Carousel from "nuka-carousel"

const CarouselImg = ({ slides }: any) => {
  return (
    <Carousel>
      {slides
        ? slides.map((item: any) => <img src={item.image} alt="img" />)
        : ""}
    </Carousel>
  )
}

export default CarouselImg
