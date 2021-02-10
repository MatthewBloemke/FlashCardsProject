import React, {useState, useEffect} from 'react'
import {useParams, Link, useHistory} from 'react-router-dom'
import {updateDeck, readDeck} from '../utils/api/index.js'

const EditDeck = () => {
    const {deckId} = useParams()
    const abort = new AbortController()
    const history = useHistory()
    const [name, setName] = useState('')
    const [description, setDesc] = useState('')
    const [id, setId] = useState('')
    const handleNameChange = (event) => setName(event.target.value)
    const handleDescChange = (event) => setDesc(event.target.value)
    const cancelHandler = () => {
        history.push(`/decks/${deckId}`)
    }
    async function submitHandler(event)  {
        event.preventDefault()
        const deckInfo = {name, description,id}
        console.log(deckInfo)
        await updateDeck(deckInfo, abort.signal);
        history.push(`/decks/${deckId}`)
    }
    useEffect(() => {
        const abort = new AbortController()
        async function displayCurrentDeckInfo() {
            let temp;
            await readDeck(deckId, abort.signal).then((deck) =>{
                temp=deck;
            })
            setId(temp.id);
            setName(temp.name);
            setDesc(temp.description);
        }
        displayCurrentDeckInfo()
    }, [deckId])
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{name}</Link></li>
                    <li className="breadcrumb-item active">Edit</li>
                </ol>
            </nav>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">
                    Name: <br/>
                    <input type="text" id="name" name="name" value={name}  onChange={handleNameChange}/><br/>
                </label><br/>
                <label htmlFor="desc">
                    Description<br/>
                    <textarea id="desc" name="desc" value={description} onChange={handleDescChange}/><br/>
                </label><br/>
                <button className='btn btn-secondary' onClick={cancelHandler}>Cancel</button>
                <button className='btn btn-primary' type="submit">Submit</button>
            </form>
        </div>
    )

}

export default EditDeck;