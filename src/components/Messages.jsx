import React, { useEffect, useState } from 'react'
import { Combinations } from './Combinations'

export const Messages = ({userChoice, iaChoice, onResetMessages}) => {
    const [userMessage, setUserMessage] = useState(null)
    const [iaMessage, setIAMessage] = useState(null)

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
        setUserMessage(null)
        setIAMessage(null)
    },[onResetMessages])

  return {userMessage, iaMessage };
}
