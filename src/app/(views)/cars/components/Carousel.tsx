import { Carousel, Image, List } from 'antd'
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { CarouselRef } from 'antd/lib/carousel';
export default function CarouselImages({ images }: { images: any }) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const carouselRef = useRef<CarouselRef>(null)
    const handleClick = (index: any) => {

        if (carouselRef.current != null) {
            carouselRef.current.goTo(index, false); // Animate: false for instant change
        }
    };
    return (
        <>
            <Carousel
                afterChange={(current: any) => {
                    setCurrentSlide(current)
                }}
                autoplay
                dotPosition='bottom'
                style={{ textAlign: 'center', color: "red" }}
                ref={carouselRef}
            >
                {images.map((image: any, index: any) =>
                    <div key={index} className='flex items-center'>
                        <Image
                            src={image}
                            width={'100%'}
                            height={300}
                            style={{ objectFit: "contain" }}
                            alt='Ảnh xe'
                        />
                    </div>
                )}
            </Carousel>
            <Swiper
                slidesPerView={3.5}
                spaceBetween={10}

            >
                {
                    images.map((image: any, index: any) => <SwiperSlide key={index}>
                        <Image
                            width={'100%'}
                            height={100}
                            src={image}
                            style={
                                {
                                    objectFit: 'contain',
                                    padding: 10,
                                    background: index === currentSlide ? '#cccccc70' : ""
                                }
                            }
                            onClick={() => handleClick(index)}
                            preview={{
                                visible: false,
                                mask: false
                            }}
                        />
                    </SwiperSlide>
                    )
                }

            </Swiper>
        </>
    )
}
