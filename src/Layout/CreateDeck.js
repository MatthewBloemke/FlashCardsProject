import {Link, useHistory} from 'react-router-dom'
import React, {useState} from 'react'
import {createDeck, listDecks} from '../utils/api/index.js'

const CreateDeck = () => {
    const abort = new AbortController()
    const history = useHistory()
    const [name, setName] = useState('')
    const [description, setDesc] = useState('')
    const handleNameChange = (event) => setName(event.target.value)
    const handleDescChange = (event) => setDesc(event.target.value)
    const cancelHandler = () => {
        history.push("/")
    }
    async function sumbitHandler(event)  {
        event.preventDefault()
        const deckInfo = {name, description}
        await createDeck(deckInfo, abort.signal);
        await listDecks(abort.signal).then((decks)=>{
            history.push(`/decks/${decks[decks.length-1].id}`)
        })
    }
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">Create Deck</li>
                </ol>
            </nav>
            <form onSubmit={sumbitHandler}>
                <label htmlFor="name">
                    Name: <br/>
                    <input className="form-control" type="text" id="name" name="name" placeholder="Deck Name" onChange={handleNameChange}/><br/>
                </label><br/>
                <label htmlFor="desc">
                    Description<br/>
                    <textarea className="form-control" id="desc" name="desc" placeholder="Brief description of the deck" onChange={handleDescChange}/><br/>
                </label><br/>
                <button className="btn btn-secondary" onClick={cancelHandler}>Cancel</button>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}
export default CreateDeck; 