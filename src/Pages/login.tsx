import React, { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import register from './register'
import { getMyDetails, login } from '../Services/auth'
import axios from 'axios'
import { useAuth } from '../Context/authContext'





export default function Login() {

 

const {user, setUser} = useAuth();

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const navigate = useNavigate()

const handleLogin = async (e:FormEvent) => {
  e.preventDefault()

  if(!email || !password) {
    alert('Please fill in all fields.')
    return
  }

  try{
    

    const response:any = await login(email, password);
    console.log('Login success', response.data.accessToken)
    console.log(response.data);
    console.log(response.message);
    alert(`Login successful! Email: ${response?.data?.email}`)

    if (!response?.data?.accessToken) {
      alert('Login failed: No access token received from server.')
      return
    }

    await localStorage.setItem('accessToken', response.data.accessToken);
    await localStorage.setItem('refreshToken', response.data.refreshToken); 
    //Redirect to home page after login
    // window.location.href = '/home';


    // Fetch user details after login
    const details = await getMyDetails();
    console.log('User details:', details);
    //save user details in redux or context as per your app requirement
    setUser(details);//set user details in context

    navigate('/home');
    
  }

  catch(error : any){
    // Improved error handling to show server validation messages when present
      if (axios.isAxiosError(error)) {
        console.error('Login error (axios):', error)
        if (error.response) {
          // Server responded with a status code outside 2xx
          console.error('server response data:', error.response.data)
          const serverMsg = (error.response.data && (error.response.data.message || error.response.data.error || JSON.stringify(error.response.data))) || error.message
          alert('Login failed: ' + serverMsg)
          return
        }
        // No response (network error / CORS / timeout)
        alert('Login failed: ' + (error.message || 'Network or CORS error'))
        return
      }

      console.error('Login error:', error)
      alert('An error occurred during login. Please try again.')
  }
}

  return (
    <div>
      <h1>Login Page</h1>
    <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
     <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
    <button type="submit" onClick={handleLogin}>Login</button>

    <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  )
}
