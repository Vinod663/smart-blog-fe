import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/authContext';

export default function Home() {

  const {user} = useAuth();
  console.log('User in Home page:', user);

  // Normalize roles which may live under user.data.roles or user.roles
  const roles: string[] = user?.data?.roles ?? user?.roles ?? []
  const isAdmin = Array.isArray(roles) && roles.includes('ADMIN')

  const title = user?.data?.email ?? 'Not signed in'

  return (
    <main style={{ padding: 24 }}>
      <h2>{isAdmin ? 'Admin Home' : 'Home'}</h2>
      <h1>{title}</h1>

      {isAdmin && (
        <div style={{ margin: '12px 0' }}>
          <Link to="/admin/register"><button type="button">Register Admin</button></Link>
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <Link to="/"><button type="button">Back to Welcome</button></Link>
      </div>
    </main>
  )
}
