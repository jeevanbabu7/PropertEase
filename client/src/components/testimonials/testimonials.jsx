import React, { useEffect } from 'react'
import './testimonials.css'
import {Swiper ,SwiperSlide ,useSwiper} from 'swiper/react'
import 'swiper/css' // In-built
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { Pagination ,FreeMode} from 'swiper';

const sliderSettings = {
    slidesPerView: 1 ,
    spaceBetween: 80 ,
    breakpoints: {
        480: {
            slidesPerView: 1
        },
        600: {
            slidesPerView: 2
        },
        750: {
            slidesPerView: 3
        },
        1100: {
            slidesPerView: 3
        }
    }
}

const testimonials = [
    {
        header: "Wonderful experience",
        desc: "Living in the property in Wayanad has been an absolute pleasure. From the day we moved in, the house felt like home. The landlord's prompt responses to any maintenance issues made our stay worry-free. The neighborhood is peaceful, and the amenities provided exceeded our expectations. Thank you for providing such a wonderful living experience.",
        name: "Lily Rose" ,
        place: "Goa"

    },
    {
        header: "Wonderful experience",
        desc: "Living in the property in Wayanad has been an absolute pleasure. From the day we moved in, the house felt like home. The landlord's prompt responses to any maintenance issues made our stay worry-free. The neighborhood is peaceful, and the amenities provided exceeded our expectations. Thank you for providing such a wonderful living experience.",
        name: "Lily Rose" ,
        place: "Goa"

    },
    {
        header: "Wonderful experience",
        desc: "Living in the property in Wayanad has been an absolute pleasure. From the day we moved in, the house felt like home. The landlord's prompt responses to any maintenance issues made our stay worry-free. The neighborhood is peaceful, and the amenities provided exceeded our expectations. Thank you for providing such a wonderful living experience.",
        name: "Lily Rose" ,
        place: "Goa"

    },
    {
        header: "Wonderful experience",
        desc: "Living in the property in Wayanad has been an absolute pleasure. From the day we moved in, the house felt like home. The landlord's prompt responses to any maintenance issues made our stay worry-free. The neighborhood is peaceful, and the amenities provided exceeded our expectations. Thank you for providing such a wonderful living experience.",
        name: "Lily Rose" ,
        place: "Goa"

    },
    {
        header: "Wonderful experience",
        desc: "Living in the property in Wayanad has been an absolute pleasure. From the day we moved in, the house felt like home. The landlord's prompt responses to any maintenance issues made our stay worry-free. The neighborhood is peaceful, and the amenities provided exceeded our expectations. Thank you for providing such a wonderful living experience.",
        name: "Lily Rose" ,
        place: "Goa"

    },
    {
        header: "Wonderful experience",
        desc: "Living in the property in Wayanad has been an absolute pleasure. From the day we moved in, the house felt like home. The landlord's prompt responses to any maintenance issues made our stay worry-free. The neighborhood is peaceful, and the amenities provided exceeded our expectations. Thank you for providing such a wonderful living experience.",
        name: "Lily Rose" ,
        place: "Goa"

    },
    
]

function SliderButton() {
    const swiper = useSwiper();
    return (
        <div className="r-button">
            <button onClick={() => swiper.slidePrev()}>&lt;</button>
            <button onClick={() => swiper.slideNext()}>&gt;</button>
        </div>
    );
}

const Testimonials = () => {


    return (
        <section className='test-wrapper'>
            <div className="testimonials-section innerWidth paddings">
                <header className="section-header primaryText">
                    <h1>What Clients Say</h1>
                </header>
                <div className="">
                    <Swiper 
                        {...sliderSettings}
                        spaceBetween={100}
                        pagination={{
                        clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                          
                    >
                        <SliderButton />
                        {
                            testimonials.map((people , index) => {
                            
                            return (<SwiperSlide key={index}>
                                    <div className="test-card">
                                        <div key={index} className="item testimonial-card">
                                            <main className="test-card-body">
                                                <div className="quote">
                                                    <i className="fa fa-quote-left"></i>
                                                    <h2>{people.header}</h2>
                                                </div>
                                                <p>{people.desc}</p>
                                                <div className="ratings">
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                </div>
                                            </main>
                                            <div className="profile">
                                                <div className="profile-image">
                                                    <img src={`./testimonial-img/image${index + 1}.png`} alt={`Testimonial ${index + 1}`} />
                                                </div>
                                                <div className="profile-desc secondaryText">
                                                    <span>{people.name}</span>
                                                    <span>{people.place}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>)
                            })
                        }
                    </Swiper>
                </div>
            </div>
            
        </section>
    );
};

export default Testimonials;
