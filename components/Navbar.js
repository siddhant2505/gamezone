import { UserContext } from '@/contexts/UserContext';
import { auth, db } from '@/firebase';
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import DropdownModal from './DropdownModal';
import NotificationBox from './NotificationBox';
//import { NotificationAlt2Icon } from "@heroicons/react/solid";


const Navbar = () => {
    const{user, setUser}=useContext(UserContext)
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
  
    useEffect(() => {
      const fetchNotifications = async () => {
        const notificationRef = db.collection('notifications');
        const snapshot = await notificationRef.get();
  
        const querySnapshot = await notificationRef//.orderByChild('datePlayed')
        .where("to", "==", user.email)
        //.orderBy('datePlayed', 'desc')
        //.where("gameId", "==", 'wordle')
       //.where("datePlayed", ">=", today)
        .get();
        
        //setGameList(querySnapshot)
      
      


        const notificationList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setNotifications(notificationList);
      };
  
      fetchNotifications();
    }, [user]);

  // ...

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
    useEffect( () => {
      
        // Set up a listener for changes to the user's authentication state
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            const dbUser = await db.collection('users').doc(user.email).get();
            console.log(dbUser.data())
            setUser(dbUser.data());
          } else {
            setUser(null);
          }
        });
    
        // Clean up the listener on unmount
        return unsubscribe;
      }, []);
  return (
    
<nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-transparent">
    <div className='mx-20 w-screen relative flex items-center justify-between'>
          
            <div className="w-2/3 flex justify-between ">
              <span className="text-white hover:text-gray-300 text-3xl font-extrabold cursor-pointer "><a href='/'>GAMEZONE</a></span>
              </div>
            {/* </div> */}
            {/* <div className="flex"> */}
              <Link href="/layout">
                <span className="mr-4 text-white hover:text-gray-300">Home</span>
              </Link>
              <Link href="/history">
                <span className="mr-4 text-white hover:text-gray-300">History</span>
              </Link>
              <Link href="/voucher">
                <span className="mr-4 text-white hover:text-gray-300">Redeem</span>
              </Link>
              <Link href="/profile">
                <span className="text-white hover:text-gray-300 underline">{user.name} </span>
              </Link>
              <span className="w-10 h-10 rounded-full overflow-hidden ml-3">
        <img src={user.image} className="object-cover h-full w-full" alt="User" />

      </span>
      <span onClick={toggleNotifications} className='cursor-pointer'>
             { !notifications.empty && <span className="absolute top-2 right-1 -mt-2 -mr-2 bg-red-500 text-white rounded-full flex items-center justify-center h-4 w-4 text-xs">
        {notifications.length>10?'9+':notifications.length} 
             
      </span>}      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-5 w-8 h-8 text-white cursor-pointer">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
</svg>
</span>
{showNotifications && (
        <NotificationBox notifications={notifications}/>
      )}
      {/* <DropdownModal/> */}

      
          </div>
        </nav>
  )
}

export default Navbar