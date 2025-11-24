import React from 'react'
import { Link } from 'react-router-dom'
import './style/welcome.css'

export default function Welcome() {
  return (
    <main className='welcome' >
      <div className='welcome__logo' >Logo</div >
      <h1>Welcome to Smart Blog</h1>
      <p>
        Smart Blog is a tiny platform to read and share articles. Create an account or
        sign in to start publishing and following authors.
      </p>

      <div className='welcome__cta'>
        <Link to="/login"><button type="button" className='button'>Login</button></Link>
        <Link to="/register"><button type="button" className='button'>Register</button></Link>
        <Link to="/home"><button type="button" className='button'>Home</button></Link>
      </div>
    </main>
  )
}