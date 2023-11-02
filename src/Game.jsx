import { useState } from 'react'
import './index.css'

const jugadas = [
  {id: 0, name: "rock", emoji: "☘️", beat:[2]},
  {id: 1, name: "paper", emoji: "📄", beat:[0]},
  {id: 2, name: "scissor", emoji: "✂️", beat:[1]},
]

function Game() {

  const [userChoise, setUserChoise] = useState(null);
  const [pcChoise, setPCChoise] = useState(null);
  const [result, setResult] = useState(null);
  const [disabled, setDisabled] = useState(null);


  


  return (
    <div className='mainContainer'>
      <h1>Rock - Paper - Scissors</h1>
      <div className='cardContainer'>
        <h2>Play Now!</h2>
        <div className='jugadas'>
          {jugadas.map((jugada) => (
            <button
            key={jugada.id}
            disabled = {disabled}
            onClick={() => handleClick(jugada.id)}
            title={jugada.name}
            >
              {jugada.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Game






// {jugadas.map((jugada) => (
//   <button 
//   key={jugada.id}
//   disabled = {disabled}
//   onClick={() => handleClick(jugada.id)}
//   title={jugada.name}>
//     {jugada.emoji}
// </button>
// ))}