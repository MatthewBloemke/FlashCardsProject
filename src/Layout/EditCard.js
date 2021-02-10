import React, {useEffect,useState} from 'react'
import {useParams, Link,useHistory} from 'react-router-dom'
import {readCard, readDeck, updateCard} from '../utils/api/index'
import CardForm from './CardForm'

const EditCard = () => {
    const history = useHistory();
    const {deckId,cardId} = useParams();
    const [deckName,setDeckName] = useState('')  ;  
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    useEffect(() => {
        const abort = new AbortController();
        async function getDeckName() {
            await readDeck(deckId, abort.signal).then((deck) => {
                setDeckName(deck.name);
            });
        };
        async function getCardInfo() {
            await readCard(cardId, abort.signal).then((card) => {
                setFront(card.front);
                setBack(card.back);
            });
        };
        getCardInfo();
        getDeckName();
    }, [deckId, cardId]);

    const handleFrontChange = (event) => setFront(event.target.value);
    const handleBackChange = (event) => setBack(event.target.value);
    async function submitHandler(event) {
        const abort = new AbortController();
        event.preventDefault();
        const id= cardId;
        const cardContents ={front, back, id};
        await updateCard(cardContents, abort.signal);
        history.push(`/decks/${deckId}`);

    }
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
                    <li className="breadcrumb-item active">Edit Card {cardId}</li>
                </ol>
            </nav>
            <h1>Edit Card</h1>
            <CardForm firstButton='Cancel' front={front} back={back} submitHandler={submitHandler} handleFrontChange={handleFrontChange} handleBackChange={handleBackChange}/>
        </div>
    )
}

export default EditCard;