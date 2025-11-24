
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../Context/authContext';

export default function Header() {

    const navigate = useNavigate();
    const {user} = useAuth();

    const handleLogin = () => {
        // Implement logout functionality here
        console.log('Logout clicked');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    }


  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-3 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm font-medium">
                <Link to="/home" className="hover:underline hover:text-teal-300 transition-colors">Home</Link>
                <Link to="/post" className="hover:underline hover:text-teal-300 transition-colors">Post</Link>
                {console.log(user)}
                {(user.roles?.includes("ADMIN") || user.roles?.includes("AUTHOR"))  && 
               (<Link to="/myposts" className="hover:underline hover:text-teal-300 transition-colors">
                My Posts</Link>)}
            </div>
            <div className="flex items-center">
                <button onClick={handleLogin} className="bg-transparent border border-white/10 text-sm text-red-300 hover:bg-red-600 hover:text-white px-3 py-1 rounded-md transition">Logout</button>
            </div>
        </div>
    </header>
  )
}
