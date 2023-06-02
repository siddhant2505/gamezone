import { CoinSystem } from '@/components/CoinSystem';
import { UserContext } from '@/contexts/UserContext';
import { db } from '@/firebase';
import React, { useContext, useEffect, useState } from 'react'

const quizgame = () => {
    const {user,setUser,updateUser}=useContext(UserContext)
    const [ques,setQues]=useState("");
    const [options,setOptions]=useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [hasPlayedToday, setHasPlayedToday] = useState(false);


  useEffect(() => {
    const checkUserPlayedGameToday = async () => {
      try {
        //const user = firebase.auth().currentUser;
        const userGamesCollection= await db.collection("userGames");
        //const today = new Date().setHours(0, 0, 0, 0);
        console.log(user.email);
        const userTimezone = moment.tz.guess(); // Get user's timezone
        const today = moment().tz(userTimezone).startOf("day"); // Get today's date in user's timezone
        const querySnapshot = await userGamesCollection
          .where("userId", "==", user.email)
          .where("gameId", "==", 'quiz')
         //.where("datePlayed", ">=", today)
          .get();
        querySnapshot.forEach((doc) => {
            const createdAt = moment(doc.data().datePlayed.toDate()).tz(userTimezone);
            if (createdAt.isSameOrAfter(today, "day")) {
              setHasPlayedToday(true);
            }
          });
        } catch (error) {
          console.error(error);
        }
    };
    checkUserPlayedGameToday();
  }, [user]);


  const updateGame = async (coins)=>{
    const newUserGame = {
    userId: user.email,
    gameId: 'quiz',
    datePlayed: new Date(),
    score: coins
    };
const userGamesCollection= await db.collection("userGames");
userGamesCollection.add(newUserGame).then(docRef => {
      console.log('New user game added with ID:', docRef.id);
    }).catch(error => {
      console.error('Error adding user game:', error);
    });

}
    const handleOptionClick = async (optionIndex) => {
      if (isAnswered) return;
  
      const selectedOption = options[optionIndex];
      setSelectedOption(selectedOption);
    
      if (selectedOption.correct) {
        setIsAnswered(true);
        await updateUser(50);
        await updateGame(50);
        // Show the alert here or perform any other action
        setTimeout(()=>{
            alert('Congratulations! You won 50 coins!');
        },300)
        
      } else {

        setIsAnswered(true);
        await updateGame(0);
        alert('You Lost!');
      }
    };
    useEffect(() => {
        const getQues = async () =>{
            try {
                const response = await fetch(`http://quizoftheday.co.uk/api/quiz`);
                const data = await response.json();
                //console.log(data)
                const ques= data.quiz.questions[0].text;
                const options=data.quiz.questions[0].answers;
                setQues(ques);
                setOptions(options)
              } catch (error) {
                console.error('Error fetching data:', error);
              }
        }
        getQues()
      }, );
    
      if (hasPlayedToday){
        return (<img src="https://i.ytimg.com/vi/p2KlbcmhYuM/maxresdefault.jpg" className="w-screen"/>)
      }


  return (
        <div className='h-screen bg-dark-primary pt-12'>
            <CoinSystem/>
        <div className="container mx-auto p-8 bg-dark-secondary rounded-xl my-10 ">
          <h1 className="text-2xl font-bold mb-4">Question:</h1>
          <p className="text-lg mb-4">{ques}</p>
    
          <div className="grid gap-4 grid-cols-2 ">
            {options.map((option, index) => (
              <button
                key={index}
                className={`bg-gray-200 p-4 rounded-lg ${
                  isAnswered && option.correct ? 'bg-green-500' : ''
                } ${selectedOption === option ? 'bg-red-500' : ''}`}
                onClick={() => handleOptionClick(index)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
        </div>
      
  )
}

export default quizgame