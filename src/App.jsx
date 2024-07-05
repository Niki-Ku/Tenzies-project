import { useEffect, useState } from 'react'

import { nanoid } from 'nanoid'
import Square from "./components/Square";
import Confetti from 'react-confetti'
import './App.css'

function App() {

/**
 * Challenge: Tie off loose ends!
 * 1. If tenzies is true, Change the button text to "New Game"
 * 2. If tenzies is true, use the "react-confetti" package to
 *    render the <Confetti /> component 🎉
 * 
 *    Hint: don't worry about the `height` and `width` props
 *    it mentions in the documentation.
 */
  const [numbersArr, setNumbersArr] = useState(allNewDice)
  const [tenzies, setTenzies] = useState(false)

  const squareElArr = numbersArr.map(e => <Square key={e.id} isHeld={e.isHeld} value={e.number} id={e.id} holdDice={holdDice} />) 

  function allNewDice(){
    const diceArr = []
    for (let i = 0; i < 10; i++){
        diceArr.push(
          {
            number: Math.floor(Math.random() * 6) + 1,
            isHeld: false,
            id: nanoid()
          }
        )
      }
    return diceArr
  }

  function roll(){
    const newDice = allNewDice()
    if(!tenzies){
      if (numbersArr){
        setNumbersArr(numbersArr.map((prevArr, index) => prevArr.isHeld ? prevArr : newDice[index]))
      }else{
        setNumbersArr(newDice)
      }
    }else{
      setNumbersArr(newDice)
      setTenzies(false)
    }
  }

  function holdDice(id){
    setNumbersArr(oldArr =>  oldArr.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  }

  useEffect(() => {

    const allHeldSame = numbersArr.every(e => e.isHeld === numbersArr[0].isHeld)
    const allNumberSame = numbersArr.every(e => e.number === numbersArr[0].number)

    if (allHeldSame && allNumberSame){
      setTenzies(true)
      console.log('Win')
    }
  }, [numbersArr])


  return (
    <main>
        <div className='rules'>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className="square-container">
            {squareElArr}
        </div>
        <button onClick={() => roll()}>{tenzies? 'New Game': 'Roll'}</button>
        {tenzies && <Confetti />}
    </main>
  )
}

export default App
