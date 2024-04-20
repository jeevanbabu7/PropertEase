import React from 'react'
import {Swiper ,SwiperSlide ,useSwiper} from 'swiper/react'
import 'swiper/css' // In-built
import './residencies.css'
import data from '../../utils/data.js'
import { sliderSettings } from '../../utils/common.js'

const Residencies = () => {
  return (
    <section className="r-wrapper" id="properties">

        <div className="paddings innerWidth r-container">
            <div className="r-head flexColStart">
                <span className='orangeText'>Best Choice</span>
                <span className='primaryText'>Popular residencies</span>
            </div>

            <Swiper {...sliderSettings}>
                <SliderButton />
                {
                    data.map((card , index) => {
                       
                    return (<SwiperSlide key={index}>
                            <div className="flexColStart r-card">
                                <img src={card.image} alt="" />
                                <span className="secondaryText">
                                    <span>$</span><span>{card.price}</span>
                                </span>

                                <span className='primaryText'>{card.name}</span>
                                <span className='secondaryText'>
                                    {card.details}
                                </span>
                            </div>
                        </SwiperSlide>)
                    })
                }
            </Swiper>
        </div>
    </section>
  )
}

export default Residencies

function SliderButton() {

    const swiper = useSwiper();
    return (
        <div className="r-button">
            <button onClick={() => swiper.slidePrev()}>&lt;</button>
            <button onClick={() => swiper.slideNext()}>&gt;</button>

        </div>
    )
}