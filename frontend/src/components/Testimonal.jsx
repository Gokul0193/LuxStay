import React from 'react'
import Title from './Title'
import { testimonials } from '../assets/assets'
import StarRating from './StarRating'
const Testimonal = () => {
  return (
    <div className='flex flex-col items-center px-6 bg-slate-50 md:px-16 lg:px-24 pt-20 pb-30'>
      <Title title='What Our Guests Say   ' subTitle='Experience why sophisticated travelers around the globe trust LuxStay for unmatched elegance, personalized service, and world-class accommodations'/>

      <div className="flex flex-wrap items-center justify-center gap-7 mt-20 mb-10">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow ">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            <StarRating rating={testimonial.rating}/>
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Testimonal
