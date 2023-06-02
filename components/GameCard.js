import Link from 'next/link';
import React from 'react';
// import { ThemeContext } from '@/contexts/ThemeContext';
import { useContext } from 'react';


function GameCard({ game,coins }) {
//   const {darkMode,toggleDarkMode}=useContext(ThemeContext);
  const gameData={coins:coins}
  return (
    <>
    <div className='w-screen'>
    <Link
    href={{ pathname: game.link, query: gameData }}
    className={`
     w-10/12 h-52 mx-10 my-5 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer transition duration-300 relative`}
  >  
  <div >
    <img src={game.imageURL} className='absolute inset-0 h-full w-full object-cover rounded-lg hover-zoom'/>
    </div>
    {/* <h2 className={`text-3xl font-bold my-4 transition duration-300`}>{game.name}</h2>
    <p className={`text-xl  transition duration-300`}>{game.pointValue} coins</p> */}
  </Link>
  <div className='flex w-10/12 mx-10 items-center justify-between'>
  <span className=' text-xl'>{game.name}</span>
  <span className=' text-dark-accent font-extralight text-sm rounded-lg shadow-md p-2 bg-dark-primary'>{game.description}</span>
  </div>
  </div>
  </>
  );
}

export default GameCard;

