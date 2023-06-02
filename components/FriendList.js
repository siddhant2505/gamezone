import { db } from '@/firebase';
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment-timezone';

import { ChatAlt2Icon } from "@heroicons/react/solid";
import Chatbox from './Chatbox';
import { UserContext } from '@/contexts/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const FriendList = () => {

    const {user,setUser}=useContext(UserContext)
    const [friends, setFriends] = useState([]);
    const [chat,setChat]=useState()
    const updateStateValue = () => {
      setChat();
    };

  const darkMode=true





  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await db.collection('users').orderBy('lastPlayedDate', 'desc').get();
      const usersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFriends(usersData);
    };
    
    fetchUsers();
    //unsubscribe();
  }, []);

  useEffect(() => {
    console.log("hey")
    const unsubscribe = db
      .collection('chats')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change)
          if (change.type === 'added') {
            const newMessage = change.doc.data();
            showNotification(newMessage);
          }
        });
      });

    return () => {
      unsubscribe(); // Unsubscribe when the component is unmounted
    };
  }, []);

  const showNotification = (message) => {
    if (message.recipient===user.name)
    toast.info(`New message from ${message.sender} : ${message.text}`, {
      // Additional configuration options for the toast notification
      // - Positioning, duration, styling, etc.
    });
  };
  

  const updateChat =(friend) =>{
    console.log(friend)
    setChat(friend);
  }
  return (
    <div className="space-y-2 text-white ">
      {friends.map((friend) => (
        user.email!=friend.email?
        (<div key={friend.email} className="flex items-center justify-between mr-0">
            <div className='flex'>
          <div className={`w-3 h-3 rounded-full my-5 mr-4 mt-2 ${isOnline(friend.lastPlayedDate)?'bg-green-500':'bg-gray-500'}`} />
          <span>{friend.name}</span>
          </div>
          <ChatAlt2Icon className="w-5 h-5 ml-auto mb-2 cursor-pointer" onClick={() => updateChat(friend)}/>
          {chat && <Chatbox currentUser={user} otherUser={chat} onUpdateState={updateStateValue} />}
          {/* <ToastContainer onClick={() => updateChat(friend)}/> */}
        </div>
        ):
        <>
        {/* <ToastContainer onClick={() => updateChat(friend)}/> */}
        </>
      ))}
      
      
      
    </div>
  )
}

export default FriendList

function isOnline(lastPlayedAt) {
    //console.log(lastPlayedAt)
    
    const formattedDateTime = moment.unix(lastPlayedAt.seconds).format('YYYY-MM-DD HH:mm:ss');
    const lastPlayedTime = new Date(formattedDateTime);
    console.log(lastPlayedTime)
    const currentTime = new Date();
    const timeDifference = (currentTime - lastPlayedTime) / (1000 * 60 * 60); // Difference in hours
  
    return timeDifference <= 12;
  }



  const currentUser = {
    name: 'Your Name',
    id: 1,
  };
  const otherUser = {
    name: 'Other User',
    id: 2,
  };
