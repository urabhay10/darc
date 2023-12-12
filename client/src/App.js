import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./components/Login"
import Register from './components/Register'
import Profile from './components/profile';
import Game from './components/Game';
import Join from './components/Join';
import Learn from './components/Learn';
import Tut1 from './components/tutorials/Tut1';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/play' element={<Game />} />
            <Route exact path='/join' element={<Join />} />
            <Route exact path='/learn' element={<Learn />} />
            <Route exact path='/tut' element={<Tut1 />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
