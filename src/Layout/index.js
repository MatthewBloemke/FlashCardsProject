import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {Switch, Route,} from "react-router-dom"
import Home from "./Home"
import CreateDeck from './CreateDeck'
import Study from "./Study"
import DeckOverview from './DeckOverview'
import EditDeck from "./EditDeck";
import AddCard from "./AddCard"
import EditCard from './EditCard'

function Layout() {
  return ( 
    <div>
      <Header /> 
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            <Home/>
          </Route>
          <Route exact ={true} path="/decks/new">
            <CreateDeck/>
          </Route>
          <Route path="/decks/:deckId/study">
            <Study/>
          </Route>
          <Route exact={true} path="/decks/:deckId">
            <DeckOverview/>
          </Route>
          <Route  path="/decks/:deckId/edit">
            <EditDeck/>
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard/>
          </Route>
          <Route path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        
      </div>
    </div>
  );
}

export default Layout;
