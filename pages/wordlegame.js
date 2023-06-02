import { CoinSystem } from "@/components/CoinSystem";
import { UserContext } from "@/contexts/UserContext";
import { db } from "@/firebase";
import Link from "next/link";
import { useContext, useState ,useEffect} from "react";
import moment from "moment-timezone";

// Define a list of words
const wordList = ['apple', 'hello', 'daisy'];

// Define the game UI
const WordleGame = () => {
    const {user,setUser,updateUser}=useContext(UserContext)
    const [hasPlayedToday, setHasPlayedToday] = useState(false);
    const [word,setWord] = useState("");

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
          .where("gameId", "==", 'wordle')
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

  useEffect(() => {
    const getWord = async () =>{
        const today = moment().startOf("day").format('YYYY-MM-DD');
        try {
            const response = await fetch(`https://www.nytimes.com/svc/wordle/v2/${today}.json`);
            const data = await response.json();
            const fetchedSolution = data.solution;
            setWord(fetchedSolution);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    getWord()
  }, );

const updatingUser = async ()=>{
    await updateUser(100);
    await alert('credited 100 coins')

}
const updateGame = async (coins)=>{
        const newUserGame = {
        userId: user.email,
        gameId: 'wordle',
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



//const [word,setWord] = useState(wordList[Math.floor(Math.random() * wordList.length)]);
const [modalOpen, setModalOpen] = useState(false);
// Define state for the current guess and the number of attempts remaining
const [guess, setGuess] = useState('');
const [remainingAttempts, setRemainingAttempts] = useState(6);
const [feedback,setFeedback]=useState([]);
// Define a function to handle submitting a guess
const handleSubmit = () => {
    if (guess===word) {
        setModalOpen(true)
        updatingUser();
        updateGame(50);
    }
    if (remainingAttempts==0) {
        updateGame(0);
    }
    console.log(word)
  // Decrease the number of remaining attempts
  setRemainingAttempts(remainingAttempts - 1);

  // Determine which letters in the guess are correct and in the correct position
  const correctLetters = guess
    .split('')
    .filter((letter, index) => letter === word[index]);
    console.log(correctLetters)
  // Determine which letters in the guess are correct but in the wrong position
  const correctButWrongPositionLetters = guess
    .split('')
    .filter((letter, index) => word.includes(letter) && letter !== word[index]);
    console.log(correctButWrongPositionLetters)
  // Display the feedback to the user
  const ffeedback = guess
    .split('')
    .map((letter, index) => {
        console.log(`${index}letter is ${letter}`)
      if (word[index]==letter) {
        console.log('sahi pakde')
        return <span key={index} className="text-white w-10 h-10 font-bold rounded-full mx-5 pt-2 text-center bg-green-500">{letter.toUpperCase()}</span>;
      } else if (!correctLetters.includes(letter)&&correctButWrongPositionLetters.includes(letter)) {
        return <span key={index} className="text-white w-10 h-10 font-bold rounded-full  mx-5 pt-2 text-center bg-yellow-500">{letter.toUpperCase()}</span>;
      } else {
        return <span key={index} className="text-white w-10 h-10 font-bold rounded-full mx-5 pt-2 text-center bg-gray-500">{letter.toUpperCase()}</span>;
      }
    });
    setFeedback([...feedback,ffeedback]);

  console.log(feedback);
};
const resetGame = () => {
    setGuess('');
    setRemainingAttempts(6);
    setFeedback([]);
    setModalOpen(false);
    // Choose a new random word from the list
    setWord(wordList[Math.floor(Math.random() * wordList.length)]);
  };

  if (hasPlayedToday){
    return (<img src='https://i.ytimg.com/vi/p2KlbcmhYuM/maxresdefault.jpg' className='w-screen'/>)
  }
  return (
    <>
    <div className="bg-dark-primary h-screen">
    {!word.empty&&(<>
    <CoinSystem/>
    <div className="flex flex-col items-center mt-16  bg-white w-7/12 mx-auto pt-5 rounded-xl">
      <h1 className="text-3xl font-bold mb-4">Welcome to Wordle!</h1>
      {/* <div>{word}</div> */}
      <p className="text-lg mb-4">Guess the five-letter word in six attempts.</p>
      <div className="flex items-center justify-center mb-4">
        <input
          className="border border-gray-400 px-2 py-1 rounded-md mr-2"
          type="text"
          value={guess}
          onChange={(event) => setGuess(event.target.value)}
          maxLength={5}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <p className="text-lg mb-4">{remainingAttempts} attempts remaining.</p>
      <div className=" items-center justify-center mb-4">
      {Array.from({ length: feedback.length }, (_, i) => (
          <div key={i} className="flex flex-row items-center justify-center mb-4">
        {feedback[i]}
        
        </div>
      ))}
      </div>
    {!remainingAttempts ?  (<div>You lost</div>):""}
    {modalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-md p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="text-lg mb-4">You guessed the word {word} in {6 - remainingAttempts} attempts.</p>
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4" onClick={resetGame}>
            Play again
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setModalOpen(false)}>
            <Link href="/">Back to homepage</Link>
          </button>
        </div>
      </div>
    </div>
  ) }
    {/* {guess===word && (<>hello
      <WordleModal isOpen={modalOpen} closeModal={() => setModalOpen(false)} remainingAttempts={remainingAttempts} />
      </>
    )} */}
    </div>
    </>)
}
</div>
    </>
  );
};

// Render the game UI
export default WordleGame;
