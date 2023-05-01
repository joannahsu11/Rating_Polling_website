import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './homePage'
import Login from './components/login.component'
import SignUp from './components/signup.component'
import Rating from './components/rating'
import Polling from './components/polling'
import CreateRating from './components/createRating'

import sharkHeader from './shark-header.png'

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="logo-title">
            <Link to={'/sign-in'}>
              <img src={sharkHeader} alt="Shark Header" height="100px" width="300px"/>
            </Link>
            <h className='beach-raters-logo'>Beach Raters</h>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link className="nav-link" to={'/home'}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/rating'}>
                    Rate
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/polling'}>
                    Poll
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/createRating'}>
                    createRating
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
            <Route path = "/home" element={<Home/>}/>
        </Routes>
        <div class="background-image"></div>
        <div className="auth-wrapper">
          
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path = "/rating" element={<Rating />}/>
<<<<<<< Updated upstream
              <Route path = "/polling" element={<Polling />}/>
=======
              <Route path="/polling" element={<Polling />}/>
              <Route path="/createRating" element={<CreateRating />}/>
>>>>>>> Stashed changes
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App