import Link from 'next/link'
import { Inter } from 'next/font/google'
import { GameList } from '@/components/GameList'
import Redeem from '@/components/Redeem'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='root relative'>
      <div className="relative">
        <img
          src="https://images.pexels.com/photos/209679/pexels-photo-209679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="w-screen h-screen "
          alt="Opening Image"
        />

<Navbar/>
        <div className="absolute top-2/4 right-0 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-6xl font-bold text-white">Play today and earn</h1>
          <div className="mt-10">
            <Link href="/layout">
              <span className="mr-4 px-6 py-3 text-white bg-blue-500 hover:bg-blue-700 rounded">Play Now</span>
            </Link>
            <Link href="/voucher">
              <span className="px-6 py-3 text-white bg-green-500 hover:bg-green-700 rounded">Earn Now</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <GameList/> */}
      <div className='relative h-96 mt-10 items-center justify-between'>
      <img src='https://helios-i.mashable.com/imagery/articles/06fAUXoW80v8ioXpy7C8PMu/hero-image.fill.size_1248x702.v1623389301.png'className='absolute inset-0 h-full w-full object-cover '/>
      </div>
      <Redeem/>
      <footer className="bg-gray-200 py-4 text-center ">
        <p className="text-gray-600">© 2023 My Website. All rights reserved.</p>
      </footer>
    </div>
  )
}
