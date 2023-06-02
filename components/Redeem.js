import React from 'react'
import {im} from './gc.jpg'

const Redeem = () => {
  return (
    // <div className='relative'>
   <div className='w-screen relative h-72 mt-12 flex items-center justify-center'>
    <div className='z-10 absolute flex items-center justify-center p-3 rounded-xl bg-green-500 text-white font-bold text-3xl cursor-pointer'><a href="/voucher">Redeem Coins</a></div>

    <img src='https://c8.alamy.com/comp/2BE12M1/montreal-canada-april-9-2020-different-gift-cards-of-many-brands-such-as-amazon-netflix-xbox-google-play-best-buy-spotify-starbucks-a-gift-2BE12M1.jpg' className='absolute object-cover h-72 w-screen'/>
{/* </div> */}


    
    </div>
  )
}

export default Redeem