
import { AuthProvider } from './Context/authContext'
import Router from './routes'

// const Home = lazy(() => import('./Pages/home'))
// const Login = lazy(() => import('./Pages/login'))
// const Register = lazy(() => import('./Pages/register'))
// const Welcome = lazy(() => import('./Pages/welcome'))

export default function App() {
  return (
    <AuthProvider>
          <Router />
    </AuthProvider>
    
  )
}