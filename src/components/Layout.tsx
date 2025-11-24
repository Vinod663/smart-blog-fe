
import Header from './Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Header/>
            <main className="flex-1 max-w-6xl mx-auto px-4 py-8">
                <Outlet />
            </main>
    </div>
  )
}

export default Layout
