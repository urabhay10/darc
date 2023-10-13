import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./components/Login"
import Register from './components/Register'

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route exact path='/login' element={<Login token={{}} />} />
            <Route exact path='/register' element={<Register token={{}} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
