import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

const StudyCards = (props) => {
    let {deckCards}= props
    const history = useHistory()
    let [frontSide, setSide] = useState(true);
    let [cardNumber, setCardNumber] = useState(0);
    //If there are enough cards

    //if frontSide is true, display front side
    
    
    const flipSide = () => {
        setSide(!frontSide)
 
    }
    const nextCard = () => {
        setCardNumber((cardNumber)=>cardNumber +1)
        setSide(!frontSide)
    }
    useEffect(() =>{
        const finished = () => {
            if(cardNumber === deckCards.length-1 && frontSide===false){
                if (window.confirm("Restart Cards?\n\nClick Cancel to return to the home page")){
                    setSide(true);
                    setCardNumber(0);
                } else {
                    history.push('/')
                }
            
            }
        }
        finished()
    }, [cardNumber,frontSide,history,deckCards.length])
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Card {cardNumber+1} of {deckCards.length}</h5>
                <p className="card-text">{(frontSide) ? deckCards[cardNumber].front : deckCards[cardNumber].back }</p>
                <button className="btn btn-secondary" onClick={flipSide}>Flip</button>
                {(frontSide) ? null : <button onClick={nextCard} className="btn btn-primary">Next</button>}
            </div>

        </div>
    )
}
export default StudyCards