import React, { useContext, useEffect, useState } from 'react'
import { db } from '@/firebase'
import { UserContext } from '@/contexts/UserContext';
import moment from 'moment-timezone';
const history = () => {
    const [gameList,setGameList]=useState([])
    const {user,setUser}=useContext(UserContext)
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(10);

    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;

  // Select Games for current page
    const currentGames = gameList.slice(indexOfFirstGame, indexOfLastGame);

  // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
     };


    useEffect(() => {
        const histGames = async () => {
            const li=[]
          try {
            //const user = firebase.auth().currentUser;
            const userGamesCollection= await db.collection("userGames");
            //const today = new Date().setHours(0, 0, 0, 0);
            //console.log(user.email);
            //const userTimezone = moment.tz.guess(); // Get user's timezone
            //const today = moment().tz(userTimezone).startOf("day"); // Get today's date in user's timezone
            const querySnapshot = await userGamesCollection//.orderByChild('datePlayed')
              .where("userId", "==", user.email)
              .orderBy('datePlayed', 'desc')
              //.where("gameId", "==", 'wordle')
             //.where("datePlayed", ">=", today)
              .get();
              
              //setGameList(querySnapshot)
            
            querySnapshot.forEach((doc) => {
                li.push(doc.data())
                
                // const createdAt = moment(doc.data().datePlayed.toDate()).tz(userTimezone);
                // if (createdAt.isSameOrAfter(today, "day")) {
                //   setHasPlayedToday(true);
                // }
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
      <h1 className='text-center mt-5 text-4xl font-bold'>History</h1>
    <div className=" mt-10 ">
    {!currentGames.empty && currentGames
    .map((game)=>{
              const formattedDateTime = moment.unix(game.datePlayed.seconds).format('YYYY-MM-DD HH:mm:ss');
              const date = moment(formattedDateTime).format('YYYY-MM-DD');
              const time = moment(formattedDateTime).format('HH:mm');
              const today = moment().startOf("day").format('YYYY-MM-DD');
       // const formattedDate = moment(game.datePlayed).format('YYYY-MM-DD');
      //  const formattedTime = moment(game.datePlayed).format('HH:mm:ss');
        return (
        <div className="bg-white w-5/12 mx-auto justify-between px-10 rounded-lg p-4 shadow-md mb-4 flex">
        {/* <p>Date and Time: {game.datePlayed}</p> */}
        {game.gameId==='Redeemed'?(<p className='mr-5 font-extrabold'>Voucher {game.gameId}</p>)
        :(<p className='mr-5 '>Game <span className=' font-extrabold' >{game.gameId.toUpperCase()}</span></p>)
    }
        <p className='mr-5'>Coins: <span className={game.score > 0 ? 'text-green-500' : 'text-red-500'}>{game.score}</span></p>
        <p className=''>{today===date? 'Today': date} {time}</p>
          {/* <p>Time: {time}</p> */}
        
      </div>
        // <div> {li.gameId}</div>
        )
        }
    )}
    <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(gameList.length / gamesPerPage) }, (_, i) => {

            return(
          <button
            key={i}
            className={`mx-1 rounded-full py-1 px-3 ${
              currentPage === i + 1 ? "bg-blue-500 text-white font-bold" : "bg-gray-300 text-gray-600"
            }`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
)})}
      </div>
    </div>
    </div>
    </>
    
  )
}

export default history