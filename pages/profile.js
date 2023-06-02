import FriendList from '@/components/FriendList'
import Leaderboard from '@/components/Leaderboard'
import PartyList from '@/components/PartyList'
import { UserContext } from '@/contexts/UserContext'
import { db } from '@/firebase'
import React, { useContext,useState,useEffect } from 'react'


const Profile = () => {
    const {user,setUser}=useContext(UserContext) 
    const [gameList,setGameList]=useState([]) 
    useEffect(() => { 
        const histGames = async () => {
            const li=[]   
          try {
           
            const userGamesCollection= await db.collection("userGames");
            
            const querySnapshot = await userGamesCollection//.orderByChild('datePlayed')
              .where("userId", "==", user.email)
              .orderBy('datePlayed', 'desc')
              .get();
              
            querySnapshot.forEach((doc) => {
                li.push(doc.data())
                
              });
            } catch (error) {
              console.error(error);
            }
            setGameList(li)
        };
        
        histGames();
      }, [user]);



  return (
    <>
    <div className="flex flex-col min-h-screen bg-dark-secondary">
    {/* Navbar */}
    <nav className="bg-dark-primary p-4 py-8">
      
    </nav>
    <div className="flex-grow p-4 flex justify-center">

      <div className="w-1/4 mr-4 bg-dark-primary rounded-xl p-4">
        <h2 className="text-2xl text-white font-bold mb-4 text-center">Leaderboard</h2>
        <Leaderboard/>
    
      </div>
      <div className="w-1/2 mr-4 bg-dark-secondary rounded-xl p-4">
      
    <div className="bg-white mx-auto my-auto rounded-lg shadow-lg p-6 max-w-md w-full">
      <div className="flex items-center">
        <img
          src={user.image} // Replace with your profile picture URL
          alt="Profile Picture"
          className="w-16 h-16 rounded-full mr-4"
        />
        <h1 className="text-2xl font-bold">{user.name}</h1> {/* Replace with the user's name */}
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-bold">Current Coins</h2>
        <div className="flex items-center mt-2">
          <span className="bg-yellow-500 text-white rounded-full p-2 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-dollar-sign"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M19 5H5M19 11H5M19 17H5" />
            </svg>
          </span>
          <span className="text-gray-700">{user.coins} Coins</span> {/* Replace with the user's current coins */}
        </div>
      </div>
      <div className="mt-6">

        <h2 className="text-lg font-bold">Recent History</h2>
        <ul className="mt-2">
            {gameList.slice(0, 5).map((game)=>{
                return(
                <li className="flex items-center my-2">
            
                <span className={`${game.gameId!='Redeemed'?'bg-green-500':'bg-blue-500'} text-white rounded-full p-2 mr-2`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-check"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-gray-700">{game.gameId==='Redeemed'? "Voucher " : "Played "} {game.gameId}</span>
              </li>
                )
            })}
        </ul>
      </div>
      <div className='underline'><a href='/history'>Load Complete History....</a></div>
      
    </div>
  
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
  </>)
}

export default Profile

