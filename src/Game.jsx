import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react'
import { Combinations, GetResult } from './components';


export default function Game() {
  const [userChoice, setUserChoice] = useState(null)
  const [userMessage, setUserMessage] = useState(null)
  const [iaChoice, setIAChoice] = useState(null)
  const [iaMessage, setIAMessage] = useState(null)
  const [result, setResult] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [userTimesWin, setUserTimesWin] = useState(() => {
    const storedWin = localStorage.getItem('userTimesWin');
    return storedWin ? parseInt(storedWin, 10) : 0; 
  })
  const [iaTimesWin, setIATimesWin] = useState(() => {
    const storedLose = localStorage.getItem('iaTimesWin');
    return storedLose ? parseInt(storedLose, 10) : 0;
  })

  useEffect (() => {
    if (userChoice !== null) {
      setUserMessage(`Your choise is ${Combinations[userChoice]?.emoji} - ${Combinations[userChoice]?.name}`);
    } 

  },[userChoice])

  useEffect (() => {
    if (iaChoice !== null) {
      setIAMessage(`Computer choise is ${Combinations[iaChoice]?.emoji} - ${Combinations[iaChoice]?.name}`);
    } 

  },[iaChoice])

  useEffect (() => {
    localStorage.setItem('userTimesWin', userTimesWin.toString())
  }, [userTimesWin])

  useEffect (() => {
    localStorage.setItem('iaTimesWin', iaTimesWin.toString())
  }, [iaTimesWin])

  const handlePlay = (choice) => {
    setUserChoice(choice)
    setDisabled(true)
    const randomChoice = Math.floor(Math.random() *3)

    setTimeout( () => {
      setIAChoice(randomChoice)
    }, 1000)
  
    setTimeout(() => {
      setResult(GetResult(choice, randomChoice))
      setIsVisible(true)
      if (GetResult(choice, randomChoice) === 1) {
        confetti()
        setUserTimesWin((userWin) => userWin +1)
      }
      if (GetResult(choice, randomChoice) === 2) {
        setIATimesWin((iaWin) => iaWin +1)
      }
    }, 2000)

    clearTimeout()
  }

  const resetResults = () => {
    setUserTimesWin(0)
    setIATimesWin(0)
  }

  const handlePlayAgain = () => {
    setUserChoice(null)
    setUserMessage(null)
    setIAChoice(null)
    setIAMessage(null)
    setResult(null)
    setDisabled(false)
    setButtonDisabled(true)
    setIsVisible(false)
  }


  return (
    <div className='mainContainer'>
      <div className='cardContainer'>
        <div className="tittle">
          <h1>Play Now!</h1>
          <div className="marker">
              <div className="user">
                <h2>
                  User Wins: 
                </h2>
                <p>
                  <b>{userTimesWin}</b>
                </p>
              </div>
              <div className="pc">
                <h2>
                  PC Wins:
                </h2>
                <p>
                  <b>{iaTimesWin}</b>
                </p>
              </div>
          </div>
            <button onClick={() => resetResults()}><b>Reset Results</b></button>
        </div>
        <div className="items">
          {Combinations.map((jugada) => (
            <button
            key = {jugada.id}
            title= {jugada.name}
            disabled = {disabled}
            onClick={() => handlePlay(jugada.id)}
            >
              {jugada.emoji}
            </button>
          ))}
          </div>
        <div className="texts">
          {userChoice !== null && 
          <p>{userMessage}</p>
        }
          {iaChoice !== null && 
          <p>{iaMessage}</p>
        }
          {result !== null && 
            <div className='result'>
                {result === 0 && <p>🤺 Draw</p>}
                {result === 1 && <p>🏆 Victory!</p>}
                {result === 2 && <p>😖 Defeat!</p>}
            </div>
          }
        </div>
        {isVisible &&
          <button className='playAgain'
          onClick={() => handlePlayAgain()}
          >
            <b> Play Again 🤝 </b>
        </button>
        }
    </div>
  </div>
  )
}
