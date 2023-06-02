import { db } from '@/firebase';
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment-timezone';

import { ChatAlt2Icon } from "@heroicons/react/solid";
import Chatbox from './Chatbox';
import { UserContext } from '@/contexts/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const parties=[{name:'Wordle Wois',image: 'https://assets-prd.ignimgs.com/2022/04/15/wordle-1650045194490.jpg'},
{name:'Merijoana',image: 'https://media.istockphoto.com/id/501387734/photo/dancing-friends.jpg?s=612x612&w=0&k=20&c=SoTKXXMiJYnc4luzJz3gIdfup3MI8ZlROFNXRBruc10='},
{name: 'GK bois',image: 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/google-quiz.jpg?width=595&height=400&name=google-quiz.jpg'},
 {name:'Memory gaming community',image: 'https://images.pexels.com/photos/596750/pexels-photo-596750.jpeg?cs=srgb&dl=pexels-suludan-diliyaer-596750.jpg&fm=jpg'}]

const PartyList = () => {

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
    if (parties.includes(message.recipient))
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
      {parties.map((friend) => (
        <div key={friend.name} className="flex items-center justify-between mr-0">
            <div className='flex'>
                <img src={friend.image} className='w-10 h-10 mr-3 my-2 rounded-full'/>
          <span className='pt-4'>{friend.name}</span>
          </div>
          <ChatAlt2Icon className="w-5 h-5 ml-auto   cursor-pointer" onClick={() => updateChat(friend)}/>
          {chat && <Chatbox currentUser={user} otherUser={chat} onUpdateState={updateStateValue} />}
          {/* <ToastContainer onClick={() => updateChat(friend)}/> */}
        </div>

      ))}
      
      
      
    </div>
  )
}

export default PartyList

