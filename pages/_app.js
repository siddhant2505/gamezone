import Navbar from '@/components/Navbar'
import { LoginContext, LoginProvider } from '@/contexts/LoginContext';
import { UserProvider } from '@/contexts/UserContext'
import { auth, db, provider } from '@/firebase';
import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useState ,useEffect} from 'react';

export default function App({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      // Check if the user is authenticated using Firebase

      
      const user = await auth.currentUser;

      if (user) {
        setAuthenticated(true);
      }
    };

    checkAuthentication();
  }, [router]);

  useEffect(() => {
    if (!authenticated && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [authenticated, router.pathname]);


  const handleGoogleSignIn = async () => {
    try {
      const result = await auth.signInWithPopup(provider);
      const { user } = result;
      setLoggedIn(true);
      //setAuthenticated(true);
      setUser(user);
      if (result.user) {
        setAuthenticated(true);
      }
      console.log(user);
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

  //     if (!loggedIn){
  //   return (
  //     <div className="container flex flex-wrap py-6 bg-black">
  //       <div className=" md:w-1/2 flex flex-col items-center justify-center px-3 bg-black h-10000px">
  //         <img src="https://m.media-amazon.com/images/I/71Bdnf9kD0L._SL1500_.jpg" alt="product-image" className="w-full" />
  //       </div>
  //       <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-3">
       
  //         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleGoogleSignIn}>Sign up with Google</button>
  //         <p className="mt-4">Start your Gaming Journey now...</p>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <>

    <UserProvider>
    <Navbar />
  <Component {...pageProps} />
  </UserProvider>


  </>
  )
}
