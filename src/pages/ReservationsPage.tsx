import React from "react"
import Layout from "../layouts"
import BtnSearchMeetings from "../components/BtnMeetings"
import Reservations from "../container/Reservations"
import Slider from "../components/Slide"

const Landing = () => {
  return (
    <Slider direction="bottom">
      <Layout>
        <BtnSearchMeetings />
        <Reservations />
      </Layout>
    </Slider>
  )
}

export default Landing
