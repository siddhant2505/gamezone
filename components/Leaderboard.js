
import React, { useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import { UserContext } from '@/contexts/UserContext';
import {CrownIcon}  from '@heroicons/react/outline';

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const{user, setUser}=useContext(UserContext)
  const darkMode=true
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await db.collection('users').orderBy('coins', 'desc').get();
      const usersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-2 ">
      <ul className="space-y-2 items-center">
        {users.map((usr, index) => (
          <li
            key={user.id}
            className={`flex items-center justify-between p-4 px-7 rounded-full ${
              index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-300' : index === 2 ? 'bg-orange-400' : 'bg-white'
            }`}
          >
            {/* {index === 0 && (
              <CrownIcon className="h-6 w-6 text-yellow-800 mr-2" />
            )} */}
          
            <span className="mr-4 font-bold">{index + 1}</span>
            <span className="mr-4">{user.email===usr.email?"You" :usr.name}</span>
            <span>Coins: {usr.coins}</span>
          </li>
        ))}
      </ul>
    </div>
       
              
  );
}

export default Leaderboard;



 {/* <td className={`py-2 ${usr.email===user.email? 'font-extrabold':''}`}>{usr.email===user.email?'You':usr.name}</td> */}