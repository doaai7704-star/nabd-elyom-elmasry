import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper'
import latest from '../data/latestNews'

export default function HeroCarousel(){
  const slides = latest.slice(0,3)
  return (
    <div className="container mx-auto px-4">
      <Swiper modules={[Navigation]} navigation spaceBetween={10} slidesPerView={1} className="rounded overflow-hidden">
        {slides.map(s=>(
          <SwiperSlide key={s._id}>
            <div className="relative">
              <img src={s.imageUrl} alt={s.title} className="w-full h-64 object-cover"/>
              <div className="absolute bottom-0 left-0 right-0 p-4 hero-caption text-white">
                <h2 className="text-lg font-bold">{s.title}</h2>
                <p className="text-sm mt-1 text-white/90">{s.summary}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
