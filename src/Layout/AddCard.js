import React, { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import CardForm from './CardForm'
import {readDeck, createCard} from '../utils/api/index'

const AddCard = () => {
    const {deckId} = useParams();
    const [deckName,setDeckName] = useState('');
    useEffect(() => {
        const abort = new AbortController();
        async function getDeckName() {
            await readDeck(deckId, abort.signal).then((deck) => {
                setDeckName(deck.name);
            });
        };
        getDeckName();
    }, [deckId]);
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const handleFrontChange = (event) => setFront(event.target.value) ;
    const handleBackChange = (event) => setBack(event.target.value);
    async function submitHandler(event) {
        const abort = new AbortController();
        event.preventDefault();
        const cardContents ={front, back};
        await createCard(deckId, cardContents, abort.signal);
        setFront(()=>"");
        setBack(()=>"");

    };
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
                    <li className="breadcrumb-item active">Add Card</li>
                </ol>
            </nav>
            <h2>{deckName}: Add Card</h2>
            <CardForm firstButton='Done' front={front} back={back} submitHandler={submitHandler} handleFrontChange={handleFrontChange} handleBackChange={handleBackChange}/>
        </div>
    )
}

export default AddCard;