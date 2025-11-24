import axios from 'axios'
import React, { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../Services/auth'

export default function Register() {
  // state - component data
  //usestate is a react hook that allows us to add state to functional components(manage state in function components)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('USER')

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault() //ignore page refresh
    // Perform registration logic here

    if(!firstName || !lastName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.')
      return
    }

    if(password !== confirmPassword) {
      alert('Passwords do not match.')
      return
    }

    try{
      // Build payload using the lowercase keys from the sample JSON you provided

      const obj = {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        role,
      }

      const response:any = await register(obj);
      console.log('Registration success', response)
      console.log(response.data);
      console.log(response.message);
      alert(`Registration successful! Email: ${response?.data?.email}`)




      // const payload = {
      //   firstname: firstName,
      //   lastname: lastName,
      //   email,
      //   password,
      //   role,
      // }

      // console.log('Register payload ->', payload)

      // // Use a relative URL so a Vite dev proxy can be used (recommended)
      // // If you prefer absolute URL, replace with 'http://localhost:3000/api/v1/auth/register'
      // const response = await axios.post('/api/v1/auth/register', payload, {
      //   headers: { 'Content-Type': 'application/json' },
      // })

      // console.log('Registration success', response.data)
      // alert('Registration successful (demo).')
    }
    catch(error: any){
      // Improved error handling to show server validation messages when present
      if (axios.isAxiosError(error)) {
        console.error('Registration error (axios):', error)
        if (error.response) {
          // Server responded with a status code outside 2xx
          console.error('server response data:', error.response.data)
          const serverMsg = (error.response.data && (error.response.data.message || error.response.data.error || JSON.stringify(error.response.data))) || error.message
          alert('Registration failed: ' + serverMsg)
          return
        }
        // No response (network error / CORS / timeout)
        alert('Registration failed: ' + (error.message || 'Network or CORS error'))
        return
      }

      console.error('Registration error:', error)
      alert('An error occurred during registration. Please try again.')
    }
    
  }

  return (
    <div>
      <h1>Register  as User or Author</h1>
      <input type="text" placeholder="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} /><br />
      <input type="text" placeholder="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} /><br />
      <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <input type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br /><br />
      
      <label htmlFor="role">Role</label><br />
      <select id="role" aria-label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="USER">User</option>
        <option value="AUTHOR">Author</option>
      </select><br /><br />

      <button type="submit" onClick={handleRegister}>Register</button>

      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  )
}
