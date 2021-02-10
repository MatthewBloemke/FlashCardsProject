import React, {} from 'react'
import {Link, useParams} from 'react-router-dom'

const CardForm = (props) => {
    const {firstButton, submitHandler, handleFrontChange,handleBackChange, front, back} = props;
    const {deckId} = useParams();
    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="Front">
                Front <br/>
                <textarea value={front} id="front" name="front" placeholder="Front side of card" onChange={handleFrontChange}/><br/>
            </label><br/>
            <label htmlFor="back">
                Back<br/>
                <textarea value={back} id="back" name="back" placeholder="Back side of card" onChange={handleBackChange}/><br/>
            </label><br/>
            <button className='btn btn-secondary' ><Link style={{color: 'white', textDecoration: 'none'}} to={`/decks/${deckId}`}>{firstButton}</Link></button>
            <button className='btn btn-primary' type="submit">Save</button>
        </form>
    )

}

export default CardForm;