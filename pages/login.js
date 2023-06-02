import { db } from '@/firebase';
import { useRouter } from 'next/router';
import React,{useEffect} from 'react'
import { auth, GoogleAuthProvider, signInWithPopup,provider } from '@/firebase';

const Login = () => {
    const router = useRouter();
    useEffect(() => {
        const checkAuthentication = async () => {
          // Check if the user is authenticated using Firebase
    
          
          const user = await auth.currentUser;
    
          if (user) {
            
            router.push('/');
              
          }
        };
    
        checkAuthentication();
      }, []);

    const handleGoogleSignIn = async () => {
        try {
            const result = await auth.signInWithPopup(provider);
            const { user } = result;            
            //console.log(user);
            if (result.user) {
                router.push('/');
              }
            //const usersCollection = db.collection('users');
              // Check if user exists in database
            const userRef = db.collection('users').doc(user.email);
            const doc = await userRef.get();
            if (doc.exists) {
              // User exists, update their coin value
              const data = doc.data();
              const newCoins = (data.coins || 0) + 5;
              await userRef.update({ coins: newCoins });
          } else {
          // User doesn't exist, create new user with default values
              const { displayName, email, photoURL } = user;
              await userRef.set({ name: displayName, email, image: photoURL, coins: 0 });
          }
          
         
      
          console.log('User data updated successfully!');
      
          } catch (error) {
            console.log(error);
            throw new Error(error.message);
          }
          };
  
    
  return (
    <div className='root'>
      <div className="relative">
        <img
          src="https://images.pexels.com/photos/209679/pexels-photo-209679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="w-screen h-screen"
          alt="Opening Image"
        />


        <div className="absolute top-80 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-6xl font-bold text-white">Signup today & <br/>starting winning</h1>
          <div className="w-screen mt-10 mx-auto">
            
              <span className=" mr-4 px-6 py-3 text-white bg-blue-500 hover:bg-blue-700 rounded-xl cursor-pointer text-xl mt-10" onClick={handleGoogleSignIn}>Google Signup</span>
            
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <GameList/>
      <Redeem/> */}
      <footer className="bg-gray-200 py-4 text-center ">
        <p className="text-gray-600">© 2023 My Website. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Login