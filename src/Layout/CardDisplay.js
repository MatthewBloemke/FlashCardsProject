import React, { useEffect, useState } from 'react'
import {listCards, deleteCard} from '../utils/api/index'
import {Link} from 'react-router-dom'

const CardDisplay = (props) => {
    let {deckId} = props
    let [cards, setCards] = useState([])
    let [deleteUpdate, setDeleteUpdate] =  useState(true)


    useEffect(() => {   
        const abort = new AbortController() 
        async function deleteHandler(event) {
            if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")) {
                await deleteCard(event.target.value, abort.signal)
                await setDeleteUpdate((deleteUpdate) => !deleteUpdate);
            }
        }
        async function listDisplay ()  {
            let temp = [];
            console.log(deckId)
            await listCards(deckId, abort.signal).then((value)=>{
                console.log(value)
                value.forEach((card) => {
                    temp.push(
                        <div key={card.id} className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6">
                                        <p className="card-text">{card.front}</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="card-text">{card.back}</p>

                                    
                                    </div>                                        

                                </div>                                        
                                <button style={{float:'right'}} className='btn btn-danger' onClick={deleteHandler} value={card.id}>Delete</button>
                                <button style={{float:'right'}} className='btn btn-secondary'><Link style={{color: 'white', textDecoration: 'none'}} to={`/decks/${deckId}/cards/${card.id}/edit`}>Edit</Link></button>
                            </div>
                        </div>
                    )
                })
            })
            setCards(temp)
        }
        listDisplay()
    }, [deleteUpdate, deckId])

    return (
        <>{cards}</>
    )
}

export default CardDisplay