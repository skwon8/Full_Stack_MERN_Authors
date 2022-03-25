import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AllAuthors from './components/AllAuthors';
import AuthorForm from './components/AuthorForm';
import OneAuthorDetail from './components/OneAuthorDetail';
import EditAuthorForm from './components/EditAuthorForm';

function App() {

  let [formSubmitted, setFormSubmitted] = useState(false);


  return (
    <BrowserRouter>
      <div className="App container">
        <h1>Favorite Authors!</h1>
        <Link to="/" className="btn btn-secondary m-3">Home</Link>
        <Link to="/new" className="btn btn-success m-3">Add an Author</Link>

        <Switch>
          <Route exact path="/">
            <AllAuthors formSubmitted={formSubmitted}></AllAuthors>
          </Route>
          <Route exact path="/new">
            <AuthorForm formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}></AuthorForm>
          </Route>
          <Route exact path="/:_id">
            <OneAuthorDetail></OneAuthorDetail>
          </Route>
          <Route exact path="/edit/:_id">
            <EditAuthorForm></EditAuthorForm>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
