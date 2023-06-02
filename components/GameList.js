import React, { useEffect, useState } from 'react'
import GameCard from './GameCard'
import { db } from '@/firebase'


export const GameList = ({coins}) => {
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    const fetchGames = async () => {
      const gameRef = db.collection('games');
      const snapshot = await gameRef.get();

      const gameList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGames(gameList);
    };

    fetchGames();
  }, []);
  return (
    <div className="items-center justify-between">
      <h1 className="text-3xl font-bold text-center my-10">TOP GAMES</h1>
      {/* <div className="text-center"> Current Coins: {coins}</div> */}
      <div className="flex flex-wrap items-center justify-center">
        {games.length==0? (<span className='my-5'>Please Wait....</span>):
        games.map((game) => (
            <div className='w-1/2 flex items-center justify-center'>
          <GameCard key={game.id} game={game} coins={coins}/>
          </div>
        ))}
      </div>
    </div>
  )
}