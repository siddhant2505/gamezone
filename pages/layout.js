import FriendList from '@/components/FriendList'
import PartyList from '@/components/PartyList'

import { GameList } from '@/components/GameList'

import Leaderboard from '@/components/Leaderboard'
import React from 'react'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-dark-secondary">
    {/* Navbar */}
    <nav className="bg-dark-primary p-4 py-8">
      {/* <ul className="flex justify-between">
        <li>
          <a href="#" className="text-white font-bold">
            Logo
          </a>
        </li>
        <li>
          <a href="#" className="text-white">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="text-white">
            Profile
          </a>
        </li>
        <li>
          <a href="#" className="text-white">
            Settings
          </a>
        </li>
      </ul> */}
    </nav>

    {/* Main content */}
    <div className="flex-grow p-4 flex justify-center">
      {/* Leaderboard column */}
      <div className="w-1/4 mr-4 bg-dark-primary rounded-xl p-4">
        <h2 className="text-2xl text-white font-bold mb-4 text-center">Leaderboard</h2>
        <Leaderboard/>
        {/* Place your leaderboard content here */}
      </div>

      {/* Game list column */}
      <div className="w-1/2 mr-4 bg-dark-secondary rounded-xl p-4">
        {/* <h2 className="text-2xl font-bold mb-4">Game List</h2> */}
        <GameList/>
        {/* Place your game list content here */}
      </div>

      {/* Friends column */}
      <div className="w-1/4 bg-dark-primary rounded-xl p-4">
        <h2 className="text-2xl text-white font-bold mb-4 text-center">Friends</h2>
        <FriendList/>
        <h2 className="text-2xl text-white font-bold mb-4 text-center">Parties</h2>
        <PartyList/> 
        {/* Place your friends list content here */}
      </div>
    </div>
  </div>
  )
}

export default Layout