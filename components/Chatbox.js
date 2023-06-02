import { UserContext } from '@/contexts/UserContext';
import { db } from '@/firebase';
import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment-timezone';


const Chatbox = ({ currentUser, otherUser,onUpdateState }) => {
  
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("")
  
  console.log('helo')

  const handleClose = () => {
    onUpdateState();
  };
  // Load previous messages if available

  const loadPreviousMessages = async () => {
    console.log(otherUser)
    try {  
      // Query the Firebase Firestore collection for previous messages between the two users
      const querySnapshot = await db
        .collection('chats')
        .where('sender', 'in', [currentUser.name, otherUser.name])
        .where('recipient', 'in', [currentUser.name, otherUser.name])
        .orderBy('timestamp', 'asc')
        .get();
  
      // Retrieve the messages from the query snapshot
      const messages = querySnapshot.docs.map((doc) => doc.data());
  
      // Update the messages state with the retrieved messages
      setMessages(messages);
    } catch (error) {
      console.log('Error loading previous messages:', error);
    }

  };

  useEffect(() => {
    
    loadPreviousMessages();
    
    // Code to load previous messages here
  }, [currentUser,otherUser]);

  // Function to handle sending a message
  const sendMessage = async () => {
    setMessageText("");
    try {
      // Create a new message object with the sender, recipient, and message text
      const message = {
        sender: currentUser.name,
        recipient: otherUser.name,
        text: messageText,
        timestamp: new Date(),
      };
      const notification = {
        to: otherUser.email,
        from: currentUser.email,
        message:`New message from ${currentUser.name}`,
        type:"chat"
      }
  
      // Add the new message to the Firebase Firestore collection
      await db.collection('chats').add(message);
      console.log("message sent")


      await db.collection('notifications').add(notification);
      console.log("notification sent")
  
      // Update the messages state to include the new message
      setMessages([...messages, message]);
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };
  const handleChange = (event) => {
    setMessageText(event.target.value);
  };
  return (
    <div className="fixed bottom-5 right-0 mr-5 mb-5 bg-dark-secondary shadow-lg shadow-black rounded-xl">

    <div className="flex flex-col h-80 w-80 rounded-xl">
      <div className='bg-dark-accent py-2 text-center rounded-t-xl flex justify-center px-10'>
      <button className="absolute right-0 mr-2 text-xs font-semibold text-black bg-white rounded-3xl px-1"  onClick={handleClose}>X</button>
        <img src={otherUser.image} alt="hello" className='w-8 h-8 mr-5 rounded-full'/>
        <span className='mt-1'>{otherUser.name}</span>
        </div>
      {/* Display messages */}

      <div className="overflow-y-auto  mx-5 my-2 w-full">
        {messages.map((message, index) => (
          message.sender===currentUser.name?
          (<div key={index} className="flex flex-col mb-2 justify-end items-end bg-dark-accent rounded-2xl pr-5 w-6/12 ml-auto mr-10">
            <span className="font-bold ">You<br/></span>
            <p className='mb-0 ml-2'>{message.text} <span className='ml-5 text-s'>{moment.unix(message.timestamp.seconds).format('HH:mm').toString()==='Invalid date'?'Now':moment.unix(message.timestamp.seconds).format('HH:mm')}</span></p>   
            {/* //YYYY-MM-DD  */}
          </div>
          ):
          <div key={index} className="flex flex-col mb-2 bg-white rounded-2xl pl-5 w-6/12 mr-auto ml-0 text-black">
            <span className="font-bold  ">{message.sender}</span>
            <p>{message.text} <span className='ml-5 text-s'>{moment.unix(message.timestamp.seconds).format('HH:mm')}</span></p>
          </div>
        ))}
      </div>
      {/* Input field */}
      <div className=" flex bg-transparent mt-2">
        <input
          type="text"
          className="flex-1 p-2 border text-black rounded mx-2"
          placeholder="Type a message..."
          value={messageText}
          onChange={handleChange}
        />
        <button
          className="px-4 py-2 ml-2 font-semibold text-white bg-dark-accent rounded mr-2"
          onClick={sendMessage}
        >
          Send
        </button>
        
        
      </div>
    </div>
  </div>
  )
}

export default Chatbox