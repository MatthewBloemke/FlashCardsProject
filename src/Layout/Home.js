import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {listDecks, deleteDeck} from '../utils/api/index.js'

const Home = () => {
    let [deckCards, setDeckCards] = useState([])
    let [deleteUpdate, setDeleteUpdate] = useState(true);


    useEffect(()=>{   
        let abort = new AbortController()  
        async function deleteHandler(event){
            if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
                await deleteDeck(event.target.value, abort.signal)
                await setDeleteUpdate((deleteUpdate) => !deleteUpdate);
            }
        }
       async function loadDecks  ()  {
            
            let tempList= [];
            await listDecks(abort.signal).then((decks) =>{
                decks.forEach((deck)=>{
                    tempList.push(
                        <div key={deck.id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{deck.name}</h5>
                                <h6 className="card-subtitle">{deck.cards.length} cards</h6>
                                <p className="card-text">{deck.description}</p>
                                <button className="btn btn-secondary"><Link style={{color: 'white', textDecoration: 'none'}} to={`/decks/${deck.id}`}>View</Link></button>
                                <button className="btn btn-primary"><Link style={{color: 'white', textDecoration: 'none'}} to={`/decks/${deck.id}/study`}>Study</Link></button>
                                <button className="btn btn-danger" style={{float:'right'}} value={deck.id} onClick={deleteHandler}>Delete</button>

                            </div>
                        </div>
                    )
                })
            })
            setDeckCards(tempList)
        }
        loadDecks()

    }, [deleteUpdate])
    return (
        <div>
            <button className="btn btn-secondary"><Link style={{color: 'white', textDecoration: 'none'}} to="/decks/new">Create Deck</Link></button>
            <h1>{deckCards}</h1>
              
        </div>

    )
}

export default Home;