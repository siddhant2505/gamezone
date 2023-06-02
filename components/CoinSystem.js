import React from 'react'
//import { ThemeContext } from '@/contexts/ThemeContext';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';

export const CoinSystem = () => {
  const {user,setUser}=useContext(UserContext)
  //console.log(user)
  //const {darkMode,toggleDarkMode}=useContext(ThemeContext);
  const darkMode=true;
  return (
    <div className='pt-24 px-24'>
    <div className={`flex items-center justify-center p-5 ${darkMode === true ? 'bg-dark-secondary' : 'bg-light-primary' } rounded-lg shadow-md transition duration-300`}>
      <p className={`text-2xl font-bold ${ darkMode === true ?'text-black': 'text-light-text'} transition duration-300`}>{user?user.coins:0} coins</p>
      <button className="px-4 py-2 ml-5 bg-green-600 text-white rounded-md focus:outline-none focus:bg-green-700 transition duration-300 ease-in-out"><a href="/voucher">Redeem Coins</a></button>
    </div>
    </div>
  )
}