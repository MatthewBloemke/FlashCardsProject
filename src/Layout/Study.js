import React, { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import {readDeck} from '../utils/api/index'
import StudyCards from './StudyCards'

const Study = () => {
    let {deckId} = useParams()
    let [deck, setDeck] = useState([]);
    useEffect(() => {
        let abort = new AbortController()
        async function loadDeck(){
            let temp;
            await readDeck(deckId, abort.signal).then((value) => {
                temp = value;
            })
            setDeck(temp)
        }
        loadDeck()
    },[deckId])
    let deckCards = [];
    if (deck.cards){
        deckCards = deck.cards;
    }
    return (
        <div>
            <nav aria-label="breadcrumb"> 
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active">Study</li>
                </ol>
            </nav>
            <h1>Study: {deck.name}</h1>
            {(deckCards.length < 3) ? (
            <div>
                <h2>Not Enough Cards.</h2>
                <p>You need at least 3 cards to study. There are {deckCards.length} cards in this deck.</p>
                <button className="btn btn-primary"><Link style={{color: 'white', textDecoration: 'none'}} to="/">Add Cards</Link></button>
            </div>
        ): <StudyCards deckCards={deckCards} />}
        </div>
    )
}
export default Study