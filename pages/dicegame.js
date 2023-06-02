import { useContext, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { UserContext } from '@/contexts/UserContext';
import { CoinSystem } from '@/components/CoinSystem';
import { db } from "@/firebase";
// import { rollDice } from '../utils/dice';
// import { getRandomNumber } from '../utils/number';


export const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  }
  
  // This function returns a random number between 1 and 6
  export const getRandomNumber = () => {
    return Math.floor(Math.random() * 6) + 1;
  }


const DiceGame = () => {
    const {user,setUser,updateUser}=useContext(UserContext)
  const [bet, setBet] = useState(10);
  const [number, setNumber] = useState(1);
  const [result, setResult] = useState(null);
  const [acNumber,setacNumber]=useState(null)
  const [rolling,setRolling]=useState(false)
  
  const updateGame = async (coins)=>{
    const newUserGame = {
    userId: user.email,
    gameId: 'betnwin',
    datePlayed: new Date(),
    score: coins
    };
const userGamesCollection= await db.collection("userGames");
userGamesCollection.add(newUserGame).then(docRef => {
      console.log('New user game added with ID:', docRef.id);
    }).catch(error => {
      console.error('Error adding user game:', error);
    });

}

  const roll =  async () => {
    if (rolling) return;
    setRolling(true)
    const newCoins = user.coins - 10;
    
    const rolledNumber = rollDice();
    setacNumber(rolledNumber)
    //setNumber(rolledNumber);

    if (rolledNumber === number) {
        ///await setUser({ ...user, coins: newCoins+100 });
        await updateUser(90);
        await updateGame(90);
      setResult('win');
      //setBet(bet + 100);
    } else {
        //await setUser({ ...user, coins: newCoins });
        await updateUser(-10);
        await updateGame(-10);
      setResult('lose');

      //setBet(0);
    }
    setRolling(false)
  };
  if(user.coins<10) return (<div>can't play this game</div>)
  return (
    <>
    <div className='bg-dark-primary'>
    <CoinSystem/>
      <Head>
        <title>Dice Game</title>
      </Head>
      <div className="flex justify-center items-center h-screen -mt-48">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Dice Game</h1>
          <p className="mb-4">Place a bet of 10 coins and guess the number on the dice.</p>
          <div className="flex justify-between items-center mb-4">
            <label htmlFor="number" className="mr-4">Number:</label>
            <input
              type="number"
              id="number"
              min="1" max="6" 
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value))}
              className="bg-gray-100 rounded-lg p-2 w-1/2"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <label htmlFor="bet" className="mr-4">Bet:</label>
            <input
              type="number"
              id="bet"
              value={bet}
              min="10"
              max="10"
              onChange={(e) => setBet(parseInt(e.target.value))}
              className="bg-gray-100 rounded-lg p-2 w-1/2"
            />
          </div>
          
          <button
            onClick={roll}
            //whileHover={{ scale: 1.1 }}
            //whileTap={{ scale: 0.9 }}
            className={`${rolling?"bg-blue-200":"bg-blue-500  hover:bg-blue-950 hover:scale-110"} text-white rounded-lg py-2 px-4 mt-4`}
          >
            {rolling?'Rolling':'Roll'}
          </button>
          {result && (
            <p className="text-xl font-bold mt-4">
              {!rolling && (
                <span>{result === 'win' ? `Came ${acNumber}, You win 100 coins!` : `Came ${acNumber}, You lose!`}
                </span>)}
            </p>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default DiceGame;
