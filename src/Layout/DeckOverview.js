import React, {useState, useEffect} from "react"
import {useParams, Link, useHistory} from 'react-router-dom'
import {readDeck} from '../utils/api/index'
import { deleteDeck} from '../utils/api/index.js'
import CardDisplay from './CardDisplay'

const DeckOverview = () => {
    let history = useHistory()
    let {deckId} = useParams()
    
    let [deck, setDeck] = useState([]);
    let [deckCards, setDeckCards] = useState([])
    useEffect(() => {
        let abort = new AbortController()
        async function loadDeck(){
            let temp;
            await readDeck(deckId, abort.signal).then((value) => {
                temp = value;
            })
            setDeck(temp)
            setDeckCards(temp.cards)
        }
        loadDeck()
    },[deckId])
    let abort = new AbortController()
    async function deleteDeckHandler() {
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
            await deleteDeck(deckId, abort.signal)
            await history.push('/')
        }
    }

    return (
        <div>
            <nav aria-label="breadcrumb"> 
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">{deck.name}</li>
                </ol>
            </nav>
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>            
            <button className="btn btn-secondary"><Link style={{color: 'white', textDecoration: 'none'}} to={`/decks/${deckId}/edit`}>Edit</Link></button>
            <button className="btn btn-primary"><Link style={{color: 'white', textDecoration: 'none'}} to={`/decks/${deckId}/study`}>Study</Link></button>
            <button className='btn btn-primary'><Link style={{color: 'white', textDecoration: 'none'}} to ={`/decks/${deckId}/cards/new`}>Add Cards</Link></button>
            <button className='btn btn-danger' style={{float:'right'}} onClick={deleteDeckHandler}>Delete</button>
            <h2>Cards</h2>
            <CardDisplay deckCards={deckCards} deckId={deckId}/>

        </div>
    )
}

export default DeckOverview;