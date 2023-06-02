import { UserContext } from '@/contexts/UserContext';
import { db } from '@/firebase';
import { ChatAlt2Icon } from '@heroicons/react/solid';
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import Chatbox from './Chatbox';

const NotificationBox = ({notifications}) => { 
    const [notifs, setNotifs] = useState(notifications);

  const handleClick = (index) => {
    // Create a copy of the notifs
    const newNotifs = [...notifs];
    
    // Remove the element at the specified index
    newNotifs.splice(index, 1);
    
    // Update the state with the modified notifs
    setNotifs(newNotifs);
  };


    const [chat,setChat]=useState()
    const {user}=useContext(UserContext)

    useEffect(()  =>{
        const fetchNotifications = async () => {
            const notificationRef = db.collection('notifications');
            const snapshot = await notificationRef.get();
  
            const querySnapshot = await notificationRef//.orderByChild('datePlayed')
            .where("to", "==", user.email)
        }
        
    },[])
    async function getUserByEmail(email) {
        try {
          const usersRef = db.collection('users');
          const querySnapshot = await usersRef.where('email', '==', email).get();
      
          if (!querySnapshot.empty) {
            const user = querySnapshot.docs[0].data();
            return user;
          } else {
            return null; // User not found
          }
        } catch (error) {
          console.log('Error getting user:', error);
          return null;
        }
      }

    const updateChat =async (friend) =>{
        //const email = 'user@example.com'; // Replace with the user's email you want to retrieve

        try {
            const user = await getUserByEmail(friend);
            setChat(user);
         if (user) {
            console.log('User:', user);
      // Do something with the user data
        } else {
            console.log('User not found');
        }
         } catch (error) {
            console.log('Error:', error);
        }

    }
      const updateStateValue = () => {
        setChat();
      }; 
      
  return (
    <div className="fixed top-12 right-5 w-108 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="py-1">
            {notifs.map((notif,index)=>{

                return(
                    
                <div key={index} className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <span >
                    
                  {notif.message}
                </span>
                <div>
                    {notif.type==='request-received'?
                    <button onClick={()=>handleClick(index)}  className="text-gray-400 border mx-5 rounded-3xl p-1 hover:bg-green-400 hover:text-white">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                  :
                   <button onClick={()=>handleClick(index)}  className="text-gray-400 mx-5 border rounded-3xl p-1 hover:bg-green-400 hover:text-white">
                   <ChatAlt2Icon className="w-5 h-5  cursor-pointer" onClick={() => {
                    //console.log(notif.from)
                    updateChat(notif.from)
                    }}/> 

                 </button>

            }
            <span className='text-white'>
            {chat && <Chatbox currentUser={user} otherUser={chat} onUpdateState={updateStateValue} />}
            </span>
                  <button onClick={()=>handleClick(index)} className="text-gray-400  border rounded-3xl p-1 hover:bg-red-400 hover:text-white">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
                )
            })}
            
        </div>
        </div>
  )
}

export default NotificationBox